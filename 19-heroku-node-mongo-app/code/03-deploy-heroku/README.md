# Deploying to Heroku

Here is a [good reference](https://www.mongodb.com/developer/how-to/use-atlas-on-heroku/).

General steps are:

1. Get the connection string from the Atlas UI and paste it into the `.env` file.
2. Run `npm run deploy`
3. cd into the `deploy` folder that was created in previous step.
4. Run `heroku login` to login to Heroku.
5. Run `git init` to create a git repo (if you didn't already).
6. Run `heroku create a-name-for-the-people-app`
7. Run `git add .` and `git commit -m "Deploy"` (if you didn't already).
8. Run `git push heroku main`
9. Verify the app is running with `heroku ps:scale web=1`
10. Open the app with `heroku open`

To destroy the app: `heroku apps:destroy --confirm a-name-for-the-people-app`
