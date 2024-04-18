import config from '@/config/config';
import { Client, Account, ID } from 'appwrite';

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();
appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  // create new record of user inside appwrite
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn() {
    try {
      const user = await this.getCurrentUser();
      return Boolean(user);
    } catch (error: any) {
      return false;
    }
  }

  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error: any) {
      console.log('Failed to get current user', error);
      return null;
    }
  }

  async logout() {
    try {
      return await account.deleteSession('current');
    } catch (error: any) {
      console.log('Failed to log out', error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
