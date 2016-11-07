# RxQL
Inspired by a lot of things, but namely GraphQL, Horizon, Entity Framework and Linq. 

### Objectives
* Isomorphic client query subscriptions.
* Native RPC style method calls.
* Describe queries using ReQL like syntax.


## A Simple Example

### Server
```js
import express from 'express'
import { RxQLContext } from 'rxql'
import { RethinkDBTransport, createExpressMiddleware } from 'rxql/server'

const context = new RxQLContext({
  transport: new RethinkDBTransport({
    port: 28015,
    host: 'localhost',
    db: 'dev',
  })
})

const User = context.r.table('users')

const app = express();
app.use('/api', createExpressMiddleware(context))
```

### Client
```js
import { RxQLContext } from 'rxql'
import { HttpTransport } from 'rxql/client'
import { toPromise } from 'rxjs/operator/toPromise'

const context = new RxQLContext({
  transport: new HttpTransport('/api')
})

const User = context.r.table('users')

const query = User.get(42).pluck('id', 'first_name')
const subscription = query.subscribe(user => {
  console.log(user)
})
// { id: 42, name: 'Larry', image: '/user_images/42.png' }

await User.get(42).update({ name: 'Bob', image: input.files[0] })::toPromise()
// { id: 42, name: 'Bob', image: '/user_images/42.png }

subscription.unsubscribe()
```
