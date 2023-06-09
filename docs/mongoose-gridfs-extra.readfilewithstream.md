<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mongoose-gridfs-extra](./mongoose-gridfs-extra.md) &gt; [readFileWithStream](./mongoose-gridfs-extra.readfilewithstream.md)

## readFileWithStream() function

readFileWithStream reads a file from gridFS bucket using the provided stream

**Signature:**

```typescript
declare function readFileWithStream(downloadStream: mongo.GridFSBucketReadStream): Promise<Buffer>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  downloadStream | mongo.GridFSBucketReadStream | The stream to download file from mongodb |

**Returns:**

Promise&lt;Buffer&gt;

returns a promise that resolves to a Buffer

## Example

const stream = bucket.openDownloadStreamByName("example.txt") ; const buffer = await readFileWithStream(stream) ;

