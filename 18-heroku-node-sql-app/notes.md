# Heroku Node and SQL Application

- [Heroku Node and SQL Application](#heroku-node-and-sql-application)
  - [Today](#today)
  - [CRUD with Node and PostgreSQL](#crud-with-node-and-postgresql)
  - [CRUD with Express and PostgreSQL](#crud-with-express-and-postgresql)
  - [Deployment with Heroku](#deployment-with-heroku)
  - [Heroku Example App](#heroku-example-app)
  - [Useful References](#useful-references)

## Today

- CRUD with Node and PostgreSQL
- CRUD with Express and PostgreSQL
- Deployment with Heroku

**Prequesites**

- [Heroku and SQL](../17-heroku-and-sql/notes.md)

## CRUD with Node and PostgreSQL

Example Code: [01-crud-node-sql](code/01-crud-node-sql)

_To follow along, you should open this repository in your code editor and have a terminal open inside the `18-heroku-node-sql-app/01-crud-node-sql` directory._

We have seen how to create a Heroku App, create a PostgreSQL database, and connect to it using the pgAdmin tool. Now we will create a Node application that will create, read, update, and delete data from a database that lives in a Heroku App. Review the code in the [01-crud-node-sql](code/01-crud-node-sql) directory. Here are the highlights:

- [code/01-crud-node-sql/people-db.js](code/01-crud-node-sql/people-db.js): A module that interacts with the database.
- [code/01-crud-node-sql/index.js](code/01-crud-node-sql/index.js): The code that interacts with the `people-db.js` module to make calls to the database.
- [code/01-crud-node-sql/.env](code/01-crud-node-sql/.env): A file that contains the database connection information.

To run this application, you will need to install dependencies. This includes the library [pg](https://node-postgres.com/) used to communicate to a PostgreSQL database, the [dotenv](https://www.npmjs.com/package/dotenv) library used to read the `.env` file, and the [copyfiles](https://www.npmjs.com/package/copyfiles) library used to deploy the application. These libraries have already been recorded in the `package.json` file.

```bash
npm install
```

Next, we need to do the following:

1. Copy files to a `deploy` directory.
1. Create a Heroku App.
1. Create a PostgreSQL database on Heroku.
1. Copy connection information for the PostgreSQL database on Heroku to the `.env` file.
1. Run the app!

First, we need to copy the files to a `deploy` directory. The `package.json` file has a rule to copy certain files to the `deploy` directory. The reason for this is because when we create a Heroku App, it will automatically create a local git repository for us and we do not want it to interfere with the repository this code currently exists in. It is also pretty common to have a `deploy` directory that contains the files that need to be deployed to Heroku.

```bash
npm run deploy
```

You will now notice a `deploy` directory with the files for the application. This file is not tracked by the main class git repository as their is an entry in the `.gitignore` file to exclude it. Next, we need to visit the `deploy` directory and create a Heroku App. To create a Heroku App, run the following command (make sure you are logged into your Heroku account using the `heroku login` command):

```bash
> cd deploy
> npm install
> heroku create
Creating app... done, ⬢ shielded-beach-36235
https://shielded-beach-36235.herokuapp.com/ | https://git.heroku.com/shielded-beach-36235.git
```

The last command will create a new Heroku app and print out the app name to the console. You will need to use this app name to create a database. Next, create the database (replacing the name with your app name):

```bash
> heroku addons:add -a shielded-beach-36235 heroku-postgresql:hobby-dev
Creating heroku-postgresql:hobby-dev on ⬢ shielded-beach-36235... free
Database has been created and is available
 ! This database is empty. If upgrading, you can transfer
 ! data from another database with pg:copy
Created postgresql-encircled-92692 as DATABASE_URL
Use heroku addons:docs heroku-postgresql to view documentation
```

Now, we need to get the database credentials from Heroku. We can do this by running the following command:

```bash
> heroku pg:credentials:url -a shielded-beach-36235
# The output looks like this (with the user replaced with Us and the
# password replaced with Ps):
Connection information for default credential.
Connection info string:
   "dbname=d39m84tf0ubgio host=ec2-3-229-252-6.compute-1.amazonaws.com port=5432 user=UUUUUUUUUUU  password=PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP sslmode=require"
Connection URL:
   postgres://UUUUUUUUUUU:PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP@ec2-3-229-252-6.compute-1.amazonaws.com:5432/d39m84tf0ubgio
```

Copy the "Connection URL" value and paste it into the `.env` file as the value of the DATABASE_URL. Lastly, run the application:

```bash
> npm start
```

## CRUD with Express and PostgreSQL

Example Code: [02-crud-express-sql](code/02-crud-express-sql)

_To follow along, you should open this repository in your code editor and have a terminal open inside the `18-heroku-node-sql-app/02-crud-express-sql` directory._

We have seen how to create a Heroku App, create a PostgreSQL database, and connect to it using the pgAdmin tool. Now we will create a Node application that will create, read, update, and delete data from a database that lives in a Heroku App. Review the code in the [02-crud-express-sql](code/02-crud-express-sql) directory. Here are the highlights:

- [code/02-crud-express-sql/people-db.js](code/02-crud-express-sql/people-db.js): A module that interacts with the database.
- [code/02-crud-express-sql/index.js](code/02-crud-express-sql/index.js): The express application that provides endpoints that interact with the `people-db.js` module to make calls to the database.
- [code/01-crud-express-sql/.env](code/01-crud-express-sql/.env): A file that contains the database connection information.

To run this application, you will need to install dependencies. This includes the library [pg](https://node-postgres.com/) used to communicate to a PostgreSQL database, the [dotenv](https://www.npmjs.com/package/dotenv) library used to read the `.env` file, and the [copyfiles](https://www.npmjs.com/package/copyfiles) library used to deploy the application, [express](https://expressjs.com/). These libraries have already been recorded in the `package.json` file.

```bash
npm install
```

Next, we need to do the following:

1. Copy files to a `deploy` directory.
1. Create a Heroku App.
1. Create a PostgreSQL database on Heroku.
1. Copy connection information for the PostgreSQL database on Heroku to the `.env` file.
1. Run the app!

Refer to the previous section for the steps to create a Heroku App and create a PostgreSQL database.

## Deployment with Heroku

Example Code: [03-deploy-heroku](code/03-deploy-heroku)

_To follow along, you should open this repository in your code editor and have a terminal open inside the `18-heroku-node-sql-app/01-crud-node-sql` directory._

We will cover the details of this application in class. For now, the following notes and commands should suffice.

```bash
> npm run deploy
> cd deploy
> git init
> git add .
> git commit -m "Deploying Heroku"
> heroku login
> heroku create
Creating app... done, ⬢ shielded-beach-36235
https://shielded-beach-36235.herokuapp.com/ | https://git.heroku.com/shielded-beach-36235.git
# You can also connect to an existing app with: heroku git:remote -a cs326-demo-app
```

The last command will create a new Heroku app and print out the app name to the console. You will need to use this app name to create a database. Next, create the database (replacing the name with your app name):

```bash
> heroku addons:add -a shielded-beach-36235 heroku-postgresql:hobby-dev
Creating heroku-postgresql:hobby-dev on ⬢ shielded-beach-36235... free
Database has been created and is available
 ! This database is empty. If upgrading, you can transfer
 ! data from another database with pg:copy
Created postgresql-encircled-92692 as DATABASE_URL
Use heroku addons:docs heroku-postgresql to view documentation
```

Now, we need to get the database credentials from Heroku. We can do this by running the following command:

```bash
heroku pg:credentials:url
# The output looks like this (with the user replaced with Us and the
# password replaced with Ps):
Connection information for default credential.
Connection info string:
   "dbname=d39m84tf0ubgio host=ec2-3-229-252-6.compute-1.amazonaws.com port=5432 user=UUUUUUUUUUU  password=PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP sslmode=require"
Connection URL:
   postgres://UUUUUUUUUUU:PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP@ec2-3-229-252-6.compute-1.amazonaws.com:5432/d39m84tf0ubgio
```

Copy the "Connection URL" value and paste it into the `.env` file as the value of the DATABASE_URL. You will also need to add a property inside your `package.json` file to specify the version of Node.js that you are using. To determine the version of Node.js, run `node --version`. Then, use that version to include the following in the `package.json` file (here we assume the version is 16.11.0):

```json
  "engines": {
  "node": "16.11.0"
}
```

Lastly, add/commit the changes and push to Heroku to deploy the application and open a browser window to the deployed application:

```bash
> git add .                         # important to save .env change
> git commit -am 'added pg creds'   # need to commit
> git push heroku main              # pushes changes to heroku and deploys
> heroku open                       # opens the deployed app in a browser
```

## Heroku Example App

If you feel like you need additional practice with creating Heroku apps, you can check out [this tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs) to create an example app using Node.js. It is fairly simple. First, you need to clone the example app that Heroku provides:

```bash
git clone https://github.com/heroku/node-js-getting-started.git
```

Then enter the directory you just cloned:

```bash
cd node-js-getting-started
```

Now, you can either create a new app from the command line or hook it up to an existing app that you created through the Heroku dashboard. To create a new app, you can run the following command from inside the repository folder:

```bash
heroku create
```

This will generate a new app with a unique name. You can then open the Heroku dashboard to view the app. To hook up an existing app, you can run the following command from inside the repository folder:

```bash
heroku git:remote -a <app-name>
```

There are various options you can use to create an app from the Heroku CLI, but it is beyond the scope of this course. After you have created the app, you can deploy it to Heroku by running the following command from inside the repository folder:

```bash
git push heroku main
```

You will see lots of output generated from this. You can now visit the application running in the browser by running this command:

```bash
heroku open
```

This should open a new browser window with the application running:

![](pics/heroku-3.png)

## Useful References

- https://node-postgres.com
- https://github.com/motdotla/dotenv
- [Creating Apps from the CLI on Heroku](https://devcenter.heroku.com/articles/creating-apps)
- [Connecting with Node.js and PostgreSQL with Heroku](https://devcenter.heroku.com/articles/connecting-heroku-postgres#connecting-in-node-js)
- [Pooling](https://node-postgres.com/features/pooling)
- [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
