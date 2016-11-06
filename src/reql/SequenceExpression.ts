import { IExpression } from '../expressions/IExpression'
import * as e from '../expressions'

import lambda, { Lambda } from './lambda'

export default class SequenceExpression implements IExpression {
  private sequence: IExpression

  constructor(sequence) {
    this.sequence = sequence
  }

  toJSON() {
    return this.sequence.toJSON()
  }

  evaluate(context) {
    return this.sequence.evaluate(context)
  }

  map(transform: Lambda): SequenceExpression {
    return new SequenceExpression(e.call(e.member(this, 'map'), [lambda(transform)]) )
  }
}
