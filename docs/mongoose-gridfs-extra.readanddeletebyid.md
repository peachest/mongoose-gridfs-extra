<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mongoose-gridfs-extra](./mongoose-gridfs-extra.md) &gt; [readAndDeleteById](./mongoose-gridfs-extra.readanddeletebyid.md)

## readAndDeleteById() function

readAndDeleteById deletes the specified file stored in the mongodb bucket by id, and returns the file contents. If id is string or number, `new ObjectId(id)` will be called to convert it to an ObjectId

**Signature:**

```typescript
declare function readAndDeleteById(bucket: mongo.GridFSBucket, id: mongo.ObjectId | string | number): Promise<Buffer>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  bucket | mongo.GridFSBucket | a mongodb gridFS bucket |
|  id | mongo.ObjectId \| string \| number | id of file to delete |

**Returns:**

Promise&lt;Buffer&gt;

a promise that resolves to a Buffer

