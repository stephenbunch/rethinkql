# RxQL

## Objectives
* Isomorphic client query subscriptions.
* Native RPC style method calls.
* Describe queries using ReQL like syntax.


## A Simple Example

### Server
```js
import express from 'express';
import { RxQLClient } from 'rxql'
import { RethinkDbTransport, createExpressMiddleware } from 'rxql/server';

const client = new RxQLClient({
  transport: new RethinkDbTransport({
    port: 28015,
    host: 'localhost',
    db: 'dev',
  })
})

const User = client.r.table('users')

const app = express();
app.use('/api', createExpressMiddleware(client))
```

### Client
```js
import { RxQLClient } from 'rxql'
import { HttpTransport } from 'rxql/client'
import { toPromise } from 'rxjs/operator/toPromise'

const client = new RxQLClient({
  transport: new HttpTransport('/api')
})
const User = client.r.table('users')

const query = User.get(42).pluck('id', 'first_name')
const subscription = query.subscribe(user => {
  console.log(user)
})
// { id: 42, name: 'Larry', image: '/user_images/42.png' }

await User.get(42).update({ name: 'Bob', image: input.files[0] })::toPromise()
// { id: 42, name: 'Bob', image: '/user_images/42.png }

subscription.unsubscribe()
```
