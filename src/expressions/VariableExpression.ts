import { IExpression } from './IExpression'

export default class VariableExpression implements IExpression {
  identifier: string

  constructor(identifier: string) {
    this.identifier = identifier
  }

  toJSON() {
    return {
      type: 'variable',
      identifier: this.identifier,
    }
  }

  evaluate(context = {}) {
    return context[this.identifier]
  }
}
