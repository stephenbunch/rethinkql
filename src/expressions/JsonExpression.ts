import { IExpression } from './IExpression'

export default class JsonExpression implements IExpression {
  value: any

  constructor(json: any) {
    this.value = json
  }

  toJSON() {
    let value = this.value
    if (value && typeof value.toJSON === 'function') {
      value = value.toJSON()
    }
    return {
      type: 'json',
      value,
    }
  }

  evaluate() {
    return this.value
  }
}
