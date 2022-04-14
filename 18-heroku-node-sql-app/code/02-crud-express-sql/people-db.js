import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class PeopleDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    // Create a new Pool. The Pool manages a set of connections to the database.
    // It will keep track of unused connections, and reuse them when new queries
    // are needed. The constructor requires a database URL to make the
    // connection. You can find the URL of your database by looking in Heroku
    // or you can run the following command in your terminal:
    //
    //  heroku pg:credentials:url -a APP_NAME
    //
    // Replace APP_NAME with the name of your app in Heroku.
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });

    // Create the pool.
    this.client = await this.pool.connect();
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }

  // CREATE a user in the database.
  async createPerson(id, name, age) {
    const queryText =
      'INSERT INTO people (id, name, age) VALUES ($1, $2, $3) RETURNING *';
    const res = await this.client.query(queryText, [id, name, age]);
    return res.rows;
  }

  // READ a user from the database.
  async readPerson(id) {
    const queryText = 'SELECT * FROM people WHERE id = $1';
    const res = await this.client.query(queryText, [id]);
    return res.rows;
  }

  // UPDATE a user in the database.
  async updatePerson(id, name, age) {
    const queryText =
      'UPDATE people SET name = $2, age = $3 WHERE id = $1 RETURNING *';
    const res = await this.client.query(queryText, [id, name, age]);
    return res.rows;
  }

  // DELETE a user from the database.
  async deletePerson(id) {
    const queryText = 'DELETE FROM people WHERE id = $1 RETURNING *';
    const res = await this.client.query(queryText, [id]);
    return res.rows;
  }

  // READ all people from the database.
  async readAllPeople() {
    const queryText = 'SELECT * FROM people';
    const res = await this.client.query(queryText);
    return res.rows;
  }
}
