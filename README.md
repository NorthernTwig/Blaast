# Examination 2

# What works

#### Entry
GET - / (works)

#### User
GET - /users (works)
GET - /users/:id (works)
POST - /users (works)
PATCH - /users (works)
DELETE - /users (works)

#### Auth
POST - /auth (works)

#### Post
GET - /posts (works)
GET - /posts/:id (works)
GET - /posts/users/:id (works)
POST - /posts (works) (500?)
PATCH - /posts/:id (works)
DELETE - /posts/:id (works)

#### Comment
GET - /comments (works)
GET - /comments/:id (works)
GET - /comments/users/:id (works)
GET - /comments/posts/:id (works)
POST - /comments/posts/:id (works)
PATCH - /comments/:id (works)
DELETE - /comments/:id (works)

#### Webhook
GET - /webhooks (works)
GET - /webhooks/:id (works)
POST - /webhooks (works)
PATCH - /webhooks/:id (works) (500?)
DELETE - /webhooks/:id (works)

#### Request Chains
DELETE - /posts/:id -> Remove comments (works)
DELETE - /users -> Set comment owners to '[ deleted ]', remove posts, remove webhooks (works)  
PATCH - /users -> If name change, Set comment/post owner name to new Name (works)