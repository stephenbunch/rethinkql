import * as rethinkdb from 'rethinkdb';
import { expect } from 'chai';
import { r } from './index';

it('should evaluate', () => {
  const expr = r.table('test').map(x => x.add(42));
  const query = expr.evaluate({ r: rethinkdb });
  expect(query.toString()).to.equal('r.table("test").map(function(var_0) { return var_0.add(42); })');
});
