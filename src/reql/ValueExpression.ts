import { IExpression } from '../expressions/IExpression'
import * as e from '../expressions'

import lambda, { Lambda } from './lambda'

type Selector = string | string[] | { [key: string]: boolean | Selector }

export default class ValueExpression implements IExpression {
  private value: IExpression

  constructor(value: IExpression) {
    this.value = value
    return new Proxy(this, {
      get: (target, property) =>
        target[property] !== undefined ?
        target[property] :
        new ValueExpression(e.call(target, [e.json(property)]))
    })
  }

  toJSON() {
    return this.value.toJSON()
  }

  evaluate(context = {}) {
    return this.value.evaluate(context)
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
    return new ValueExpression((e.call(e.member(this, 'pluck'), [e.json(selectors)])))
  }
}
