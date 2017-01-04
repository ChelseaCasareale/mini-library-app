#Mini Library App

This app is an extension of the app created in the course "Building Web Applications with Node.js and Express 4.0" by Jonathan Mills on  Pluralsight. There isn't a Github repo for the course app.

##General Info
This app is a small library/book collection type app with a Node.js backend and Mongodb database. The course ended with hooking up the API to GET a list of books and an individual book with some data added from the Goodreads API.

I have added features, and am continuing to update the app.

###DONE
- POST functionality to add books
- PATCH functionality to update books
- VERY basic profile page when you log in or sign up (necessary to use the rest of the app)

###TO DO
- Better sign in/sign up with a more complete profile page
- POST and PATCH validation measures
- Proxy route for the API
- OAuth
- Goodreads service implementation for book list view
- Add genre and read/unread to API
- Add sorting to API
- Tests

###MAYBES
- Different way of seeding database
- Mongoose instead of Mongodb npm module
- SQL db version
- Different UI (I just don't like this one as much!)

##Want to play with it?
As usual, clone the repo and `npm install` to get all the dependencies. `npm start` will run all the gulp tasks and start you on PORT 3000.

Make sure you have Mongodb on your system and are running it when you open the app!

Seed the db with some books if you want by going to the route `/admin/addbooks`.

Please note, logging in or signing up is *necessary* to view the books links!!!
