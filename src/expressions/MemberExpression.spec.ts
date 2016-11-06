import { expect } from 'chai'
import * as e from './'

it('should access the member', () => {
  const member = e.member(e.json({ foo: 2 }), 'foo')
  expect(member.evaluate()).to.equal(2)
})
