/**
 * A simple wrapper for mongodb gridfs bucket.
 *
 * @packageDocumentation
 */

import { mongo } from 'mongoose';

/**
 * create a gridFS bucket object to store files into mongodb
 *
 * @public
 * @example
 * ```javascript
 * import {mongoose} = require("mongodb");
 * import gridfs = require('mongoose-gridfs-extra')
 *
 * const uri = 'mongodb://localhost:27017/test';
 * const connection = await mongoose.createConnection(uri).asPromise()
 * const db = connection.db
 *
 * // Create a new GridFSBucket
 * const bucket = gridfs.createGridFSBucket(db)
 *
 * // Close the connection
 * connection.close();
 * ```
 * @param db - database
 * @param options - options for creating gridFS bucket
 * @returns a mongodb GridFSBucket object
 */
export declare function createGridFSBucket(db: mongo.Db, options?: mongo.GridFSBucketOptions | undefined): mongo.GridFSBucket;

/**
 * getGridFSBucketDb returns mongodb Db instance which is used to create this bucket.
 *
 * @public
 * @experimental this not a wrapper of mongodb public native api, so use this method carefully
 * @param bucket - a mongodb gridFS bucket
 * @returns mongodb Db instance
 */
export declare function getGridFSBucketDb(bucket: mongo.GridFSBucket): mongo.Db;

/**
 * getGridFSBucketName returns the bucket's name
 *
 * @public
 * @experimental this not a wrapper of mongodb public native api, so use this method carefully
 * @param bucket - a mongodb gridFS bucket
 * @returns bucket name
 */
export declare function getGridFSBucketName(bucket: mongo.GridFSBucket): string;

/**
 * getGridFSBucketDb returns mongodb gridFS bucket options which is used to create this bucket.
 *
 * @public
 * @experimental this not a wrapper of mongodb public native api, so use this method carefully
 * @param bucket - a mongodb gridFS bucket
 * @returns a bucket options
 */
export declare function getGridFSBucketOptions(bucket: mongo.GridFSBucket): mongo.GridFSBucketOptions;

/**
 * readFileById returns Buffer read from specified file stored in mongodb bucket by objectId
 *
 * @public
 * @param bucket - a mongodb gridFS bucket
 * @param id - objectId of file to read
 * @param options - options for opening download stream
 * @returns a promise that resolves to a Buffer
 */
export declare function readFileById(bucket: mongo.GridFSBucket, id: mongo.ObjectId, options?: mongo.GridFSBucketReadStreamOptionsWithRevision | undefined): Promise<Buffer>;

/**
 * readFileByName returns Buffer read from specified file stored in mongodb bucket by fileName
 *
 * @public
 * @param bucket - a mongodb gridFS bucket
 * @param fileName - name of file to read
 * @param options - options for opening download stream
 * @returns a promise that resolves to a Buffer
 */
export declare function readFileByName(bucket: mongo.GridFSBucket, fileName: string, options?: mongo.GridFSBucketReadStreamOptionsWithRevision | undefined): Promise<Buffer>;

/**
 * readFileWithStream reads a file from gridFS bucket using the provided stream
 *
 * @public
 * @example
 * const stream = bucket.openDownloadStreamByName("example.txt") ;
 * const buffer = await readFileWithStream(stream) ;
 * @param downloadStream - The stream to download file from mongodb
 * @returns returns a promise that resolves to a Buffer
 */
export declare function readFileWithStream(downloadStream: mongo.GridFSBucketReadStream): Promise<Buffer>;

/**
 * readFileByName stores file into gridFS bucket by id
 *
 * @public
 * @param bucket - a mongodb gridFS bucket
 * @param id - objectId of file to read
 * @param file - the file to save into mongodb bucket
 * @param fileName - name of file to store
 * @param options - options for opening download stream
 * @returns a promise that resolves to a GridFSFile
 * @throws Error
 */
export declare function writeFileById(bucket: mongo.GridFSBucket, id: mongo.ObjectId, file: Buffer, fileName: string, options?: mongo.GridFSBucketWriteStreamOptions | undefined): Promise<mongo.GridFSFile>;

/**
 * readFileByName stores file into gridFS bucket by fileName
 *
 * @public
 * @param bucket - a mongodb gridFS bucket
 * @param file - the file to save into mongodb bucket
 * @param fileName - name of file to store
 * @param options - options for opening download stream
 * @returns a promise that resolves to a GridFSFile
 * @throws Error
 */
export declare function writeFileByName(bucket: mongo.GridFSBucket, file: Buffer, fileName: string, options?: mongo.GridFSBucketWriteStreamOptions | undefined): Promise<mongo.GridFSFile>;

/**
 * writeFileWithStream store a file into gridFS bucket using the provided stream. This function will overwrite the
 *
 * @public
 * @example
 * const uploadStream = bucket.openUploadStream("example.txt") ;
 * const gridFsFile = await writeFileWithStream(uploadStream, file) ;
 * @param uploadStream - The stream to upload file to mongodb
 * @param file - the file to save into mongodb bucket
 * @returns a promise that resolves to a GridFSFile
 * @throws Error
 */
export declare function writeFileWithStream(uploadStream: mongo.GridFSBucketWriteStream, file: Buffer): Promise<mongo.GridFSFile>;

export { }
