import {Collection, MongoClient} from "mongodb"

const client = new MongoClient("mongodb://localhost:27018", {useNewUrlParser: true,  useUnifiedTopology: true });

export const query = async (collectionName: string, fun: (coll: Collection<any>) => void) => {
    return client.connect()
        .then((client) => {
            return fun(client.db("web-app").collection(collectionName));
        })
        .catch(err => console.error(err))
}
