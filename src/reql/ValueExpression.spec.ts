import * as rethinkdb from 'rethinkdb'
import { expect } from 'chai'
import * as r from './'

it('should support bracket syntax', () => {
  const expr = r.table('test').get('foo').get('a', 'b')
  const query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo")("a")("b")')
})

it('should support pluck', () => {
  const value = r.table('test').get('foo')

  let expr = value.pluck('bar')
  let query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo").pluck("bar")')

  expr = value.pluck('bar', 'baz')
  query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo").pluck("bar", "baz")')

  expr = value.pluck(['bar'])
  query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo").pluck(["bar"])')

  expr = value.pluck({ bar: true })
  query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo").pluck({"bar": true})')

  expr = value.pluck({ bar: 'baz' })
  query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo").pluck({"bar": "baz"})')

  expr = value.pluck({ bar: ['baz'] })
  query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo").pluck({"bar": ["baz"]})')

  expr = value.pluck({ bar: { baz: true } })
  query = expr.evaluate({ r: rethinkdb })
  expect(query.toString()).to.equal('r.table("test").get("foo").pluck({"bar": {"baz": true}})')
})
