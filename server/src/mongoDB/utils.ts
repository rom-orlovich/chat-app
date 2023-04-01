import { MongoClient } from "mongodb";

export const client = new MongoClient(
  process.env.MONGO_DB_URI || "mongodb://mongo:27017"
);
/**
 *  Get collection from mongoDB.
 */
export const getCollection = (collName: string, dbName = "chat-app") =>
  client.db(dbName).collection(collName);
