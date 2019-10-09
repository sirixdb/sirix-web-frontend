[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

<p align="center"><img src="https://raw.githubusercontent.com/sirixdb/sirix/master/logo.png"/></p>

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=SirixDB+-+a+storage+system%2C+which+creates+%28very+small-sized%29+snapshots+of+your+data+on+every+transaction-commit+through+the+implementation+of+a+novel+sliding+snapshot+algorithm.&url=http://sirix.io&via=sirix&hashtags=versioning,diffing,xml,kotlin,coroutines,vertx)

[![Follow](https://img.shields.io/twitter/follow/sirixdb.svg?style=social)](https://twitter.com/sirixdb)

[Join us on Slack](https://join.slack.com/t/sirixdb/shared_invite/enQtNjI1Mzg4NTY4ODUzLTE3NmRhMWRiNWEzMjQ0NjAxNTZlODBhMTQzMWM2Nzc5MThkMjlmMzI0ODRlNGE0ZDgxNDcyODhlZDRhYjM2N2U) | [Community Forum](https://sirix.discourse.group/)

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

<h1 align="center">SirixDB Web frontend - An Evolutionary, Versioned, Temporal NoSQL Document Store</h1>
<h2 align="center">Store and query revisions of your data efficiently</h2>

>"Remember that you're lucky, even if you don't think you are, because there's always something that you can be thankful for." - Esther Grace Earl (http://tswgo.org)

## Introduction

**Discuss it in the [Community Forum](https://sirix.discourse.group)**

This is the repository for a web frontend based on [Vue.js](https://vuejs.org), [D3.js](https://d3js.org) and [TypeScript](https://www.typescriptlang.org).

It'll provide several interaction possibilities to store, update and query databases in SirixDB. Furthermore the front-end will provide interactive visualizations for exploring and comparing revisions of resources stored in SirixDB based on different views.
## Test and edit in Gitpod
[![Edit and test in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/sirixdb/sirix-web-frontend)

test and edit this project in a web based VS code environment.
## Project setup
**We currently face the following [issue](https://github.com/sirixdb/sirix-web-frontend/issues/18), whereas the [Workaround](https://github.com/nuxt/typescript/issues/49#issuecomment-531086770) works until Nuxt.js or Element-Hi fix the issue**

For setting up the HTTP-Server together with a Keycloak-Server, have a look into the documentation for the [REST-API](https://sirix.io/rest-api.html).

For setting up the web frontend:

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

### Customize configuration
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
