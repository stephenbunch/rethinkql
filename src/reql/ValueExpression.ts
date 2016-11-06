import { IExpression } from '../expressions/IExpression'
import * as e from '../expressions'

import lambda, { Lambda } from './lambda'

type Selector = string | string[] | { [key: string]: boolean | Selector }

export default class ValueExpression implements IExpression {
  private value: IExpression

  constructor(value: IExpression) {
    this.value = value
  }

  toJSON() {
    return this.value.toJSON()
  }

  evaluate(context = {}) {
    return this.value.evaluate(context)
  }

  get(...keys: (string | number)[]): ValueExpression {
    let result: ValueExpression = this
    for (const key of keys) {
      result = new ValueExpression(e.call(result, [e.json(key)]))
    }
    return result
  }

  add(...args: number[]): ValueExpression {
    return new ValueExpression(e.call(e.member(this, 'add'), args.map(arg => e.json(arg))))
  }

  merge(merge: Object | Lambda): ValueExpression {
    if (typeof merge === 'function') {
      return new ValueExpression(e.call(e.member(this, 'merge'), [lambda(merge)]))
    }
    return new ValueExpression((e.call(e.member(this, 'merge'), [e.json(merge)])))
  }

  pluck(...selectors: Selector[]): ValueExpression {
    return new ValueExpression((e.call(e.member(this, 'pluck'), selectors.map(selector => e.json(selector)))))
  }
}
