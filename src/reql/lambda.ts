import * as e from '../expressions'

import ValueExpression from './ValueExpression'

export type Lambda = (datum: ValueExpression) => ValueExpression

export default function lambda(lambda: Lambda) {
  const p0 = e.parameter(0)
  return e.lambda([p0], lambda(new ValueExpression(p0)))
}
