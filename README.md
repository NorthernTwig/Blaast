# Examination 2

# Answers to the questions
[Here](https://github.com/1dv527/on222bx-examination-2/wiki/Q---A)

# How to get it up and running
* The script will create a .env, and also runs 'npm install'
* run "npm start"

# What works

#### Entry
GET - / | Gets the entry point

#### User
GET - /users | Gets all the users  
GET - /users/:id | Gets a specific user  
POST - /users | Create a user (register)  
PATCH - /users | Update the user associated with your JWT  
DELETE - /users | Delete the user associated with your JWT  

#### Auth
POST - /auth | Authenticates user and returns a JWT  

#### Post
GET - /posts | Gets all the blogposts  
GET - /posts/:id | Gets a specific blogpost  
GET - /posts/users/:id | Gets all the posts done by a specific user  
POST - /posts | Creates a blogpost  
PATCH - /posts/:id | Updates a specific blogpost  
DELETE - /posts/:id | Deletes a specific blogpost  

#### Comment
GET - /comments | Gets all the comments  
GET - /comments/:id | Gets a specific comment  
GET - /comments/users/:id | Gets all the comments done by a specific user  
GET - /comments/posts/:id | Gets all the comments done on a specific blogpost  
POST - /comments/posts/:id | Creates a comment on a specific blogpost  
PATCH - /comments/:id | Updates a specific comment  
DELETE - /comments/:id | Deletes a specific comment  

#### Webhook
GET - /webhooks | Gets all the webhooks  
GET - /webhooks/:id | Gets a specific webhook  
POST - /webhooks | Create a webhook  
PATCH - /webhooks/:id | Updates a specific webhook  
DELETE - /webhooks/:id | Deletes a specific webhook  
