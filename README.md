# Examination 2

# What works

#### Entry
GET - / (works)

#### User
GET - /users (works)
GET - /users/:id (works)
POST - /users (works) (error handling works)
PATCH - /users (works) (error handling works)
DELETE - /users (works)

#### Auth
POST - /auth (works)

#### Post
GET - /posts
GET - /posts/:id
GET - /posts/users/:id
POST - /posts
PATCH - /posts/:id
DELETE - /posts/:id

#### Comment
GET - /comments
GET - /comments/:id
GET - /comments/users/:id
GET - /comments/posts/:id
POST - /comments/posts/:id
PATCH - /comments/:id
DELETE - /comments/:id

#### Webhook
GET - /webhooks
GET - /webhooks/:id
POST - /webhooks
PATCH - /webhooks/:id
DELETE - /webhooks/:id