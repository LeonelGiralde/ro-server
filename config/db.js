import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const connectToDatabase = async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    return client;
};

export { connectToDatabase };
