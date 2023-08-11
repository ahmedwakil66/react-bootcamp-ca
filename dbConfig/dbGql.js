import env from '../dotenv.config.js';
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@craftawesome.bgwffom.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let graphqlTestDB;
let userCollection;
let todoCollection;

async function connectToDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        if (!graphqlTestDB) {
            await client.connect();
            graphqlTestDB = client.db('graphqlTestDB');
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        if(!userCollection){
            userCollection = graphqlTestDB.collection('users');
        }
        if(!todoCollection) {
            todoCollection = graphqlTestDB.collection('todos')
        }

        return {userCollection, todoCollection}
    }

    catch(error){
        console.error(error);
        throw error;
    }

    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}


export default connectToDB;