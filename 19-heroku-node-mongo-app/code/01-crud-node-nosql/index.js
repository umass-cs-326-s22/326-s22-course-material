import { PeopleDatabase } from './people-db.js';

// Main entry point for the application.
async function main() {
  try {
    const peopleDb = new PeopleDatabase(process.env.DATABASE_URL);
    await peopleDb.connect();

    let rows = null;

    rows = await peopleDb.readAllPeople();
    console.log('READ ALL: ', rows);

    rows = await peopleDb.createPerson(99, 'John', 20);
    console.log('CREATED: ', rows);

    rows = await peopleDb.readAllPeople();
    console.log('READ ALL: ', rows);

    rows = await peopleDb.readPerson(99);
    console.log('READ: ', rows);

    rows = await peopleDb.updatePerson(99, 'John', 21);
    console.log('UPDATED: ', rows);

    rows = await peopleDb.deletePerson(99);
    console.log('DELETED: ', rows);

    rows = await peopleDb.readAllPeople();
    console.log('READ ALL: ', rows);

    // Closes the pool and ends all client connections.
    await peopleDb.close();
  } catch (err) {
    console.error(err);
  }
}

// Run main.
await main();
