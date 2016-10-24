# RethinkQL

GraphQL is good at recursively resolving a query.
ReQL is good at defining queries.
RethinkDB supports changefeeds on tables.
Observables provide a common interface for subscribing to a value.

Goals
* Generate a GraphQL and/or REST api from the schema.
* Isomorphic client query subscriptions.
* Native RPC style method calls.
* Describe queries using ReQL like syntax.


## A Simple Example

### Server
```js
import express from 'express';
import createRethinkQLMiddleware from 'express-rethinkql';

const getUser = id => r.table('users').get(id);
const MySchema = {
  users: NodeList()
}


const app = express();
app.use('/rethinkql', createRethinkQLMiddleware({
  schema: MySchema,
  graphiql: true
}));
```

### Client

```js

const stream = query(User.get(42).pluck('id', 'first_name'));
const subscription = stream.subscribe(user => {
  console.log(user);
});
// { id: 42, first_name: 'Larry' }

client.do(User.get(42).update({ first_name: 'Bob' }));
// { id: 42, first_name: 'Bob' }

subscription.unsubscribe();
```

## Nodes
## Operators
## Actions
## Queries
