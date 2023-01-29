# lash-social application

Lash-social is a simple application built using Node.js, Express and MongoDB that allows users to create an account, login, create posts, view posts, and follow other users. 

### Lash-social _Endpoints_

- POST /users/login: Login in a user
- POST /users: Create a new user account
- GET /users/:username: Retrieve a specific user by username
- GET /users/:username/followers: Retrieve a list of followers for a specific user
- GET /users/:username/following: Retrieve a list of users a specific user is following
- POST /users/:username/follow: Follow a specific user
- DELETE /users/:username/follow: Unfollow a specific user

### Run Application

npm install to install all dependencies

npm run dev to run the application in dev mode
