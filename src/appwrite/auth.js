import config from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //call another method
                return this.login({ email, password })
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwirte service: : getCurrentUser :: error', error)
        }
        return null;
    }
    async logOut() {
        try {
            // await this.account.deleteSession('current')  // logout from current 
            await this.account.deleteSessions();            //logout from all
        } catch (error) {
            console.log(error)
        }
    }
}


const authService = new AuthService();


export default authService