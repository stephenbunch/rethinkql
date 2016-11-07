# RxQL
Inspired by a lot of things, but namely GraphQL, Horizon, Entity Framework and Linq. 

### Objectives
* Isomorphic client query subscriptions.
* Native RPC style method calls.
* Describe queries using ReQL like syntax.
* Use TypeScript.

## A Simple Example

### Server
```js
import express from 'express'
import r from 'rethinkdb'
import { QueryContext, Schema } from 'rxql'
import { createExpressMiddleware } from 'rxql/server'
import { RethinkDBContext, RethinkDBTransport } from 'rxql/rethinkdb'

// Create a new RethinkDB context.
const db = new RethinkDBContext({
  port: 28015,
  host: 'localhost',
  db: 'dev',
})

// A context is where all queries are built.
// Queries can be serialized or observed directly.
const context = new QueryContext({
  transport: new RethinkDBTransport(db)
})

const User = context.r.table('users')

// A schema is used to resolve queries, just like in GraphQL.
const schema = new Schema({
  // Can be either a sequence or a selection.
  users: User,

  // Can also be a function to handle an action. Parameters are
  // deserialized using the schema with the assumption that data
  // is never write-only.
  patchUser: (user, patch) => db.select(user).update(patch),
})

// Launch the app.
const app = express()
app.use('/api', createExpressMiddleware(schema))
app.listen(3000)
```

### Client
```js
import { QueryContext } from 'rxql'
import { HttpTransport } from 'rxql/client'
import { toPromise } from 'rxjs/operator/toPromise'

// Create a new context for building queries.
const context = new QueryContext({
  transport: new HttpTransport('/api')
})

// Define the root node for selecting users.
const User = context.r.table('users')

// Define an action for updating a user.
const patchUser = context.r.action('patchUser')

// Create a new query and subscribe to it.
const query = User.get(42).pluck('id', 'name', 'image')
const subscription = query.subscribe(user => {
  // Log the result whenever an item in the sequence changes. 
  console.log(user)
})
// outputs:
//     { id: 42, name: 'Larry', image: '/user_images/42.png' }

// Update the user.
await patchUser(User.get(42), {
  name: 'Bob',
  image: input.files[0],
})::toPromise()
// outputs:
//     { id: 42, name: 'Bob', image: '/user_images/42.png }

// Destroy the subscription.
subscription.unsubscribe()
```
