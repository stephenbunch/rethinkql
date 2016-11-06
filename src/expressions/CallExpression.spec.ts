import { expect } from 'chai'
import * as e from './'

it('should evaluate', () => {
  const p0 = e.parameter(0)
  const func = e.lambda([p0], e.call(e.member(p0, 'foo'), [e.json(3)]))
  const result = func.evaluate()({ foo: x => x * x })
  expect(result).to.equal(9)
})
