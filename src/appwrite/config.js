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

    async createPost({ title, slug, content, featuredImage, status, userid }) {
        try {
            return await this.database.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                title, content, featuredImage, status, userid
            })
        } catch (error) {
            console.log("Error appwrite :: createPost :: ", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                title, content, featuredImage, status
            })
        } catch (error) {
            console.log("Error appwrite :: updatePost :: ", error)
        }
    }

    async deletePost(slug) {
        try {
           const s = await this.database.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            console.log(s)
            return true
        }
        catch (error) {
            console.log("Error appwrite :: deletePost :: ", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("Error appwrite :: deletePost :: ", error)
            return false
        }
    }
    async getPosts(query = [Query.equal('status', ["active"]),]) {
        try {
            return await this.database.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                query
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
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
            return await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )


        } catch (error) {
            console.log(error)
            return false
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}


const service = new Service

export default service