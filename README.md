# mongoose-gridfs-extra

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/peachest/mongoose-gridfs-extra)![npm type definitions](https://img.shields.io/npm/types/mongoose-gridfs-extra)

![Top Language](https://img.shields.io/github/languages/top/peachest/mongoose-gridfs-extra)![Code Size](https://img.shields.io/github/languages/code-size/peachest/mongoose-gridfs-extra)![NPM Bundle Size](https://img.shields.io/bundlephobia/min/mongoose-gridfs-extra?label=npm%20bundle%20size)![License](https://img.shields.io/github/license/peachest/mongoose-gridfs-extra)

![npm dev dependency version](https://img.shields.io/npm/dependency-version/mongoose-gridfs-extra/dev/eslint)![npm dev dependency version](https://img.shields.io/npm/dependency-version/mongoose-gridfs-extra/dev/rollup)![npm dev dependency version](https://img.shields.io/npm/dependency-version/mongoose-gridfs-extra/dev/typescript)![Dependencies](https://img.shields.io/librariesio/github/peachest/mongoose-gridfs-extra)

![Goto Counter](https://img.shields.io/github/search/peachest/mongoose-gridfs-extra/goto)![Github Downloads](https://img.shields.io/github/downloads/peachest/mongoose-gridfs-extra/total?label=github%20downloads)![GitHub issues](https://img.shields.io/github/issues/peachest/mongoose-gridfs-extra)![Github pull requests](https://img.shields.io/github/issues-pr/peachest/mongoose-gridfs-extra)![GitHub last commit](https://img.shields.io/github/last-commit/peachest/mongoose-gridfs-extra)

![NPM Downloads](https://img.shields.io/npm/dt/mongoose-gridfs-extra?label=npm%20downloads)![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/peachest/mongoose-gridfs-extra?label=package%20version)


<p align="center">
    <a href="https://peachest.github.io/mongoose-gridfs-extra/">API Documents</a>
</p>

<p align="center">
    <a href="README.md">English</a>
    ·
    <a href="README_zh-Hans.md">简体中文</a>
</p>



A simple wrapper for the Mongoose GridFSBucket-API. If you need a similar wrapper for Mongodb GridFSBucket-API, see [gridfs-extra](https://github.com/peachest/gridfs-extra)

This package is designed to avoid operations on the stream objects provided by the native API, thereby saving time.

## Install

**install npm package**

```shell
npm install mongoose-gridfs-extra
```



or **clone from Github**

```shell
# ssh
git clone git@github.com:peachest/mongoose-gridfs-extra.git

# http
git clone https://github.com/peachest/mongoose-gridfs-extra.git
```



## Usage

Complete **runnable** example is provided. See `example/example.{cjs,mjs}`.

After cloning the repository to local, run:

```shell
cd mongoose-gridfs-extra
node example/example.cjs
node example/example.mjs
```



****

**Import**

```javascript
// ESModule
import * as gridfs from "mongoose-gridfs-extra"
import mongoose from "mongoose"

// or CommandJS
const {mongoose} = require('mongoose')
const gridfs = require("mongoose-gridfs-extra")
```



**Connect to Mongodb Server**

```javascript
const uri = 'mongodb://localhost:27017/test';
const connect = await mongoose.createConnection(uri).asPromise()
```



**Create GridFS bucket**

```javascript
const db = connect.db
const bucketName = "testBucket";
const options = {
    bucketName
}

// mongoose-gridfs-extra
const bucket = gridfs.createGridFSBucket(db, options)
// or mongodb native API
const bucket = new mongoosemongodb.GridFSBucket(db, options) ;
```



**Write file into bucket**

```javascript
// Read Buffer type file content
const fileName = ""
let file = await fs.readFile("")

// Write file into bucket
const gridFSFile = await gridfs.writeFileByName(bucket, file, fileName)
const id = gridFSFile._id
```



**Read file from bucket**

```javascript
// Read file from bucket
file = await gridfs.readFileById(bucket, id)
// or use fileName
file = await gridfs.readFileByName(bucket, fileName, {
    revision: -1 // default value
})
```

:warning: A bucket can store files with the same name. If you wonder how the bucket will retrun when read file by name, see the following native doc from mongodb gridfs bucket:

> If there are multiple files with the same name, this will stream **the most recent file** with the given name (as determined by the uploadDate field). You can set the **revision option** to change this behavior.

As for the revision:

> The revision number relative to the oldest file with the given filename.
>
> * 0 gets you the oldest file,
> * 1 gets you the 2nd oldest,
> * -1 gets you the newest.



## License

Apache 2.0

