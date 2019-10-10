import sanitize from './sanitize'

function json2xml(json, options) {
  if (json instanceof Buffer) {
    json = json.toString()
  }

  var obj = null
  if (typeof json == 'string') {
    try {
      obj = JSON.parse(json)
    } catch (e) {
      throw new Error('The JSON structure is invalid')
    }
  } else {
    obj = json
  }
  var toXml = new ToXml(options)
  toXml.parse(obj)
  return toXml.xml
}

ToXml.prototype.parse = function(obj) {
  if (!obj) return

  var self = this
  var keys = Object.keys(obj)
  var len = keys.length

  // First pass, extract strings only
  for (var i = 0; i < len; i++) {
    var key = keys[i],
      value = obj[key],
      isArray = Array.isArray(value)
    var type = typeof value
    if (type == 'string' || type == 'number' || type == 'boolean' || isArray) {
      var it = isArray ? value : [value]

      it.forEach(function(subVal) {
        if (typeof subVal != 'object') {
          if (key == '$t') {
            self.addTextContent(subVal)
          } else {
            self.addAttr(key, subVal)
          }
        }
      })
    }
  }

  // Second path, now handle sub-objects and arrays
  for (var i = 0; i < len; i++) {
    var key = keys[i]

    if (Array.isArray(obj[key])) {
      var elems = obj[key]
      var l = elems.length
      for (var j = 0; j < l; j++) {
        var elem = elems[j]

        if (typeof elem == 'object') {
          self.openTag(key)
          self.parse(elem)
          self.closeTag(key)
        }
      }
    } else if (
      typeof obj[key] == 'object' &&
      !(self.options.ignoreNull && obj[key] === null)
    ) {
      self.openTag(key)
      self.parse(obj[key])
      self.closeTag(key)
    }
  }
}

ToXml.prototype.openTag = function(key) {
  this.completeTag()
  this.xml += '<' + key
  this.tagIncomplete = true
}
ToXml.prototype.addAttr = function(key, val) {
  if (this.options.sanitize) {
    val = sanitize(val, false, true)
  }
  this.xml += ' ' + key + '="' + val + '"'
}
ToXml.prototype.addTextContent = function(text) {
  this.completeTag()
  var newText = this.options.sanitize ? sanitize(text) : text
  this.xml += newText
}
ToXml.prototype.closeTag = function(key) {
  this.completeTag()
  this.xml += '</' + key + '>'
}
ToXml.prototype.completeTag = function() {
  if (this.tagIncomplete) {
    this.xml += '>'
    this.tagIncomplete = false
  }
}
function ToXml(options) {
  var defaultOpts = {
    sanitize: false,
    ignoreNull: false
  }

  if (options) {
    for (var opt in options) {
      defaultOpts[opt] = options[opt]
    }
  }

  this.options = defaultOpts
  this.xml = ''
  this.tagIncomplete = false
}

function formateXml(xmlStr) {
  var text = xmlStr
  //使用replace去空格
  text =
    '\n' +
    text
      .replace(/(<\w+)(\s.*?>)/g, function($0, name, props) {
        return name + ' ' + props.replace(/\s+(\w+=)/g, ' $1')
      })
      .replace(/>\s*?</g, '>\n<')
  //处理注释
  text = text
    .replace(/\n/g, '\r')
    .replace(/<!--(.+?)-->/g, function($0, text) {
      var ret = '<!--' + escape(text) + '-->'
      return ret
    })
    .replace(/\r/g, '\n')
  //调整格式  以压栈方式递归调整缩进
  var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/gm
  var nodeStack = []
  var output = text.replace(rgx, function(
    $0,
    all,
    name,
    isBegin,
    isCloseFull1,
    isCloseFull2,
    isFull1,
    isFull2
  ) {
    var isClosed =
      isCloseFull1 == '/' ||
      isCloseFull2 == '/' ||
      isFull1 == '/' ||
      isFull2 == '/'
    var prefix = ''
    if (isBegin == '!') {
      //!开头
      prefix = setPrefix(nodeStack.length)
    } else {
      if (isBegin != '/') {
        ///开头
        prefix = setPrefix(nodeStack.length)
        if (!isClosed) {
          //非关闭标签
          nodeStack.push(name)
        }
      } else {
        nodeStack.pop() //弹栈
        prefix = setPrefix(nodeStack.length)
      }
    }
    var ret = '\n' + prefix + all
    return ret
  })
  var prefixSpace = -1
  var outputText = output.substring(1)
  //还原注释内容
  outputText = outputText
    .replace(/\n/g, '\r')
    .replace(/(\s*)<!--(.+?)-->/g, function($0, prefix, text) {
      if (prefix.charAt(0) == '\r') prefix = prefix.substring(1)
      text = unescape(text).replace(/\r/g, '\n')
      var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/gm, prefix) + '-->'
      return ret
    })
  outputText = outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n')
  return outputText
}

//计算头函数 用来缩进
function setPrefix(prefixIndex) {
  var result = ''
  var span = '    ' //缩进长度
  var output = []
  for (var i = 0; i < prefixIndex; ++i) {
    output.push(span)
  }
  result = output.join('')
  return result
}

function json2xmlFormat(json, options) {
  var xml = json2xml(json, options)

  return formateXml(xml)
}

export default json2xmlFormat
