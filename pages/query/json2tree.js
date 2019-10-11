function json2Tree(xml) {
  var xx = {
    nodes: []
  }
  isObject(xml) ? getNodes(xml, '', 0, xx) : getNodesArr(xml, '', 0, xx)
  var getData = uniqu(xx.nodes)
  let sourceList = bulid(getData)
  console.log(sourceList)
  return formaterTreeData(sourceList)
}

function bulid(nodes) {
  var topNodes = []
  let i = 0
  if (Array.isArray(nodes) && nodes.length > 0) {
    nodes.forEach(node => {
      var parentName = node.parentName
      if (parentName === '') {
        topNodes.push(node)
        return true
      }
      nodes.forEach(function(parNode) {
        var name = parNode.name
        if (
          parentName !== '' &&
          (parentName == name || parentName == parNode.nodeName)
        ) {
          parNode.children.push(node)
          return true
        }
      })
    })
  }
  var root = {name: '', label: '', children: []}

  if (topNodes.length == 1) {
    root = topNodes[0]
  } else {
    root.children.push(topNodes)
  }
  return root
}

function uniqu(nodes) {
  let obj = {}
  let arr = []
  nodes.forEach((node, index) => {
    obj[node.name] = node
  })
  for (let i in obj) {
    arr.push(obj[i])
  }
  return arr
}

function getProType(val) {
  return Object.prototype.toString.call(val)
}

function getNodes(curObj, parentKey = '', idx = 0, obj) {
  let formObj = {
    name: '',
    label: '',
    parentName: '',
    nodeName: ''
  }
  for (let key in curObj) {
    let nodeName = ''
    formObj = {
      name: '',
      label: '',
      parentName: '',
      nodeName: '',
      value: ''
    }
    if (getPropertype(curObj[key]) === 'Object' || Array.isArray(curObj[key])) {
      formObj.children = []
    }
    nodeName = parentKey + (parentKey === '' ? '' : '>') + key
    formObj.label = `key:` + getPropertype(curObj[key])
    formObj.name = nodeName
    formObj.parentName = parentKey
    formObj.nodeName = ''
    formObj.nodeName = key
    formObj.value = curObj[key]
    if (getPropertype(curObj[key]) === 'Object' || Array.isArray(curObj[key])) {
      formObj.value = null
    }
    obj.nodes.push(formObj)
    if (isObject(curObj[key])) {
      getNodes(curObj[key], nodeName, idx + 1, obj)
    } else if (Array.isArray(curObj[key])) {
      nodeName += '[]'
      ;(formObj.label = `key:` + getPropertype(curObj[key])),
        (formObj.name = nodeName)
      getNodesArr(curObj[key], nodeName, idx + 1, obj)
    }
  }
}
function addArrayMiddle(curName, parentKey = '', idx = 0, obj) {
  let formObj = {
    name: '',
    label: '',
    parentName: '',
    nodeName: '',
    children: []
  }

  let nodeName = ''

  nodeName = parentKey + (parentKey === '' ? '' : '>') + curName
  formObj.label = `key:Array`
  formObj.name = nodeName
  formObj.parentName = parentKey
  formObj.nodeName = curName

  obj.nodes.push(formObj)
}

function getNodesArr(curArr, parentKey = '', idx = 0, obj) {
  if (curArr.length !== 0) {
    curArr.forEach((val, index) => {
      if (isObject(val)) {
        addArrayMiddle(`[${index}]`, parentKey, idx + 1 + 2 * index, obj)
        getNodes(val, parentKey + `>[${index}]`, idx + 2 + 2 * index, obj)
      } else if (Array.isArray(val)) {
        getNodesArr(val, parentKey, idx + 1, obj)
      }
    })
  }
}

function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

function getPropertype(val) {
  let outputName = Object.prototype.toString.call(val)
  let value
  switch (outputName) {
    case '[object Object]':
      value = 'Object'
      break
    case '[object Number]':
      value = 'Number'
      break
    case '[object String]':
      value = 'String'
      break
    default:
      value = 'Array'
      break
  }
  return value
}

function formaterTreeData(params) {
  let treeData = params.name === '' ? params.children[0] : params.children
  let arr = []
  if (treeData.length === 0) {
    arr.push(params)
  } else {
    treeData.forEach((value, index) => {
      arr.push(value)
    })
  }
  if (arr[0].length > 1) {
    return [
      {
        name: '',
        label: '',
        children: [...arr]
      }
    ]
  } else {
    return arr
  }
}

export default json2Tree
