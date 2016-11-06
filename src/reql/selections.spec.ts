import * as rethinkdb from 'rethinkdb'
import { expect } from 'chai'
import * as r from './'

it('should support update with object', () => {
  const expr = r.table('test').update({ foo: 2 })
  const query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").update({"foo": 2})')
})

it('should support update with lambda', () => {
  const expr = r.table('test').update(x => x.merge({ foo: 2 }))
  const query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").update(function(var_1) { return var_1.merge({"foo": 2}); })')
})
