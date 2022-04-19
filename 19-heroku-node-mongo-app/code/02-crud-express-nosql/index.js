import express from 'express';
import { PeopleDatabase } from './people-db.js';

class PeopleServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.get('/person/create', async (req, res) => {
      try {
        const { id, name, age } = req.query;
        const person = await self.db.createPerson(id, name, age);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/person/read', async (req, res) => {
      try {
        const { id } = req.query;
        const person = await self.db.readPerson(id);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/person/update', async (req, res) => {
      try {
        const { id, name, age } = req.query;
        const person = await self.db.updatePerson(id, name, age);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/person/delete', async (req, res) => {
      try {
        const { id } = req.query;
        const person = await self.db.deletePerson(id);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/person/all', async (req, res) => {
      try {
        const people = await self.db.readAllPeople();
        res.send(JSON.stringify(people));
      } catch (err) {
        res.status(500).send(err);
      }
    });
  }

  async initDb() {
    this.db = new PeopleDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`PeopleServer listening on port ${port}!`);
    });
  }
}

const server = new PeopleServer(process.env.DATABASE_URL);
server.start();
