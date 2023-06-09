<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mongoose-gridfs-extra](./mongoose-gridfs-extra.md) &gt; [deleteById](./mongoose-gridfs-extra.deletebyid.md)

## deleteById() function

deleteById deletes the specified file stored in the mongodb bucket by id. If id is string or number, `new ObjectId(id)` will be called to convert it to an ObjectId

**Signature:**

```typescript
declare function deleteById(bucket: mongo.GridFSBucket, id: mongo.ObjectId | string | number): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  bucket | mongo.GridFSBucket | a mongodb gridFS bucket |
|  id | mongo.ObjectId \| string \| number | id of file to delete |

**Returns:**

Promise&lt;void&gt;

