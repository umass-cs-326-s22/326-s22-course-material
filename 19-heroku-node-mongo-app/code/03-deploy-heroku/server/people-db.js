import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class PeopleDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.client = await MongoClient.connect(this.dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    // Get the database.
    this.db = this.client.db('people');

    // Init the database.
    await this.init();
  }

  async init() {
    this.collection = this.db.collection('people');

    const count = await this.collection.countDocuments();

    if (count === 0) {
      await this.collection.insertMany([
        { _id: '1', name: 'Artemis', age: 19 },
        { _id: '2', name: 'Parzival', age: 17 },
        { _id: '3', name: 'John', age: 30 },
        { _id: '4', name: 'Mia', age: 22 },
      ]);
    }
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  // CREATE a user in the database.
  async createPerson(id, name, age) {
    const res = await this.collection.insertOne({ _id: id, name, age });
    // Note: the result received back from MongoDB does not contain the
    // entire document that was inserted into the database. Instead, it
    // only contains the _id of the document (and an acknowledged field).
    return res;
  }

  // READ a user from the database.
  async readPerson(id) {
    const res = await this.collection.findOne({ _id: id });
    return res;
  }

  // UPDATE a user in the database.
  async updatePerson(id, name, age) {
    const res = await this.collection.updateOne(
      { _id: id },
      { $set: { name, age } }
    );
    return res;
  }

  // DELETE a user from the database.
  async deletePerson(id) {
    // Note: the result received back from MongoDB does not contain the
    // entire document that was deleted from the database. Instead, it
    // only contains the 'deletedCount' (and an acknowledged field).
    const res = await this.collection.deleteOne({ _id: id });
    return res;
  }

  // READ all people from the database.
  async readAllPeople() {
    const res = await this.collection.find({}).toArray();
    return res;
  }
}
