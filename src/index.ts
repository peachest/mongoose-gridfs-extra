/**
 * A simple wrapper for mongodb gridfs bucket.
 *
 * @packageDocumentation
 */
import {mongo as mongodb} from "mongoose"
import {conv2ObjectId} from "@/src/utils/conv";

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
export function createGridFSBucket(db: mongodb.Db, options?: mongodb.GridFSBucketOptions | undefined): mongodb.GridFSBucket {
    return new mongodb.GridFSBucket(
        db,
        options
    ) ;
}

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
export async function writeFileWithStream(uploadStream: mongodb.GridFSBucketWriteStream, file: Buffer): Promise<mongodb.GridFSFile> {
    uploadStream.write(file) ;
    return new Promise((resolve, reject) => {
        uploadStream.once("error", (err) => {
            reject(err) ;
        }) ;
        uploadStream.end((err, gridFsFile) => {
            if (err !== undefined || gridFsFile === undefined) {
                reject(err) ;
            } else {
                resolve(gridFsFile) ;
            }
        }) ;
    }) ;
}

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
export async function writeFileByName(bucket: mongodb.GridFSBucket, file: Buffer, fileName: string, options?: mongodb.GridFSBucketWriteStreamOptions | undefined): Promise<mongodb.GridFSFile> {
    const uploadStream = bucket.openUploadStream(fileName, options) ;
    return writeFileWithStream(uploadStream, file) ;
}

/**
 * readFileByName stores file into gridFS bucket by id
 *
 * @public
 * @param bucket - a mongodb gridFS bucket
 * @param id - id of file to read
 * @param file - the file to save into mongodb bucket
 * @param fileName - name of file to store
 * @param options - options for opening download stream
 * @returns a promise that resolves to a GridFSFile
 * @throws Error
 */
export async function writeFileById(bucket: mongodb.GridFSBucket, id: mongodb.ObjectId | string | number, file: Buffer, fileName: string, options?: mongodb.GridFSBucketWriteStreamOptions | undefined): Promise<mongodb.GridFSFile> {
    const uploadStream = bucket.openUploadStreamWithId(conv2ObjectId(id), fileName, options) ;
    return writeFileWithStream(uploadStream, file) ;
}

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
export async function readFileWithStream(downloadStream: mongodb.GridFSBucketReadStream): Promise<Buffer> {
    const chunks: Buffer[] = [] ;
    let size = 0 ;

    downloadStream.on("readable", () => {
        let chunk: Buffer | null = downloadStream.read() as Buffer | null ;
        while (chunk !== null) {
            chunks.push(chunk) ;
            size += chunk.length ;
            chunk = downloadStream.read() as Buffer | null ;
        }
    }) ;

    return new Promise((resolve) => {
        downloadStream.on("end", () => {
            resolve(Buffer.concat(chunks, size)) ;
        }) ;
    }) ;
}

/**
 * readFileByName returns Buffer read from specified file stored in mongodb bucket by fileName
 *
 * @public
 * @param bucket - a mongodb gridFS bucket
 * @param fileName - name of file to read
 * @param options - options for opening download stream
 * @returns a promise that resolves to a Buffer
 */
export async function readFileByName(bucket: mongodb.GridFSBucket, fileName: string, options?: mongodb.GridFSBucketReadStreamOptionsWithRevision | undefined): Promise<Buffer> {
    const stream = bucket.openDownloadStreamByName(fileName, options) ;
    return readFileWithStream(stream) ;
}

/**
 * readFileById returns Buffer read from specified file stored in mongodb bucket by objectId
 *
 * @public
 * @param bucket - a mongodb gridFS bucket
 * @param id - id of file to read
 * @param options - options for opening download stream
 * @returns a promise that resolves to a Buffer
 */
export async function readFileById(bucket: mongodb.GridFSBucket, id: mongodb.ObjectId | string | number, options?: mongodb.GridFSBucketReadStreamOptionsWithRevision | undefined): Promise<Buffer> {
    const stream = bucket.openDownloadStream(conv2ObjectId(id), options) ;
    return readFileWithStream(stream) ;
}

/**
 * deleteById deletes the specified file stored in the mongodb bucket by id.
 * If id is string or number, `new ObjectId(id)` will be called to convert it to an ObjectId
 *
 * @public
 * @param bucket - a mongodb gridFS bucket
 * @param id - id of file to delete
 */
export async function deleteById(bucket: mongodb.GridFSBucket, id: mongodb.ObjectId | string | number): Promise<void>{
    return bucket.delete(conv2ObjectId(id))
}

/**
 * readAndDeleteById deletes the specified file stored in the mongodb bucket by id, and returns the file contents.
 * If id is string or number, `new ObjectId(id)` will be called to convert it to an ObjectId
 *
 * @public
 * @param bucket - a mongodb gridFS bucket
 * @param id - id of file to delete
 * @returns a promise that resolves to a Buffer
 */
export async function readAndDeleteById(bucket: mongodb.GridFSBucket, id: mongodb.ObjectId | string | number): Promise<Buffer>{
    id = conv2ObjectId(id)
    const buffer = await readFileById(bucket, id)
    await bucket.delete(id)
    return buffer
}

/**
 * getGridFSBucketDb returns mongodb Db instance which is used to create this bucket.
 *
 * @public
 * @experimental this not a wrapper of mongodb public native api, so use this method carefully
 * @param bucket - a mongodb gridFS bucket
 * @returns mongodb Db instance
 */
export function getGridFSBucketDb(bucket: mongodb.GridFSBucket): mongodb.Db {
    //@ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return bucket.s.db as mongodb.Db ;
}

/**
 * getGridFSBucketName returns the bucket's name
 *
 * @public
 * @experimental this not a wrapper of mongodb public native api, so use this method carefully
 * @param bucket - a mongodb gridFS bucket
 * @returns bucket name
 */
export function getGridFSBucketName(bucket: mongodb.GridFSBucket): string {
    //@ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return bucket.s.options.bucketName as string ;
}

/**
 * getGridFSBucketDb returns mongodb gridFS bucket options which is used to create this bucket.
 *
 * @public
 * @experimental this not a wrapper of mongodb public native api, so use this method carefully
 * @param bucket - a mongodb gridFS bucket
 * @returns a bucket options
 */
export function getGridFSBucketOptions(bucket: mongodb.GridFSBucket): mongodb.GridFSBucketOptions {
    //@ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return bucket.s.options as mongodb.GridFSBucketOptions ;
}
