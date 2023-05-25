<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mongoose-gridfs-extra](./mongoose-gridfs-extra.md) &gt; [writeFileByName](./mongoose-gridfs-extra.writefilebyname.md)

## writeFileByName() function

readFileByName stores file into gridFS bucket by fileName

**Signature:**

```typescript
declare function writeFileByName(bucket: mongo.GridFSBucket, file: Buffer, fileName: string, options?: mongo.GridFSBucketWriteStreamOptions | undefined): Promise<mongo.GridFSFile>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  bucket | mongo.GridFSBucket | a mongodb gridFS bucket |
|  file | Buffer | the file to save into mongodb bucket |
|  fileName | string | name of file to store |
|  options | mongo.GridFSBucketWriteStreamOptions \| undefined | _(Optional)_ options for opening download stream |

**Returns:**

Promise&lt;mongo.GridFSFile&gt;

a promise that resolves to a GridFSFile

## Exceptions

Error
