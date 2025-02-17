import { Client, Account, Databases, Storage } from "appwrite";


export const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DB = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const USERS = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
export const RESTAURANTS = import.meta.env.VITE_APPWRITE_RESTAURANT_COLLECTION_ID;
export const DISPATCH = import.meta.env.VITE_APPWRITE_DISPATCH_ORDERS_COLLECTION_ID;
export const NOTIFICATIONS = import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID;
export const STORAGE = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID;
export const ADMIN = import.meta.env.VITE_APPWRITE_ADMIN_COLLECTION_ID;
export const TRANSACTIONS = import.meta.env.VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID;

export default client;
