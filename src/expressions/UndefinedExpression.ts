import { IExpression } from './IExpression'

export default class UndefinedExpression implements IExpression {
  toJSON() {
    return {
      type: 'undefined',
    }
  }

  evaluate() {
    return undefined
  }
}
