<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mongoose-gridfs-extra](./mongoose-gridfs-extra.md) &gt; [getGridFSBucketOptions](./mongoose-gridfs-extra.getgridfsbucketoptions.md)

## getGridFSBucketOptions() function

getGridFSBucketDb returns mongodb gridFS bucket options which is used to create this bucket.

this not a wrapper of mongodb public native api, so use this method carefully

**Signature:**

```typescript
declare function getGridFSBucketOptions(bucket: mongo.GridFSBucket): mongo.GridFSBucketOptions;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  bucket | mongo.GridFSBucket | a mongodb gridFS bucket |

**Returns:**

mongo.GridFSBucketOptions

a bucket options
