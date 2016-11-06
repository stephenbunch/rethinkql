import * as rethinkdb from 'rethinkdb'
import { expect } from 'chai'
import * as r from './'

it('should support get', () => {
  const expr = r.table('test').get('foo')
  const query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo")')
})
