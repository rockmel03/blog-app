import { flushSync } from "react-dom";
import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImg, status, userId }) {
        try {
            return await this.database.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                title, content, featuredImg, status, userId
            })
        } catch (error) {
            console.log("Error appwrite :: createPost :: ", error)
        }
    }

    async updatePost(slug, { title, content, featuredImg, status }) {
        try {
            return await this.database.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                title, content, featuredImg, status
            })
        } catch (error) {
            console.log("Error appwrite :: updatePost :: ", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true
        }
        catch (error) {
            console.log("Error appwrite :: deletePost :: ", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            await this.database.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Error appwrite :: deletePost :: ", error)
            return false
        }
    }
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.database.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }
    // file upload Services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file,
            )

        } catch (error) {
            console.log(error)
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFile(
            conf.appWriteBucketId,
            fileId
        )

    }
}


const service = new Service

export default service