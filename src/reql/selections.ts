import { IExpression } from '../expressions/IExpression'
import * as e from '../expressions'

import SequenceExpression from './SequenceExpression'
import ValueExpression from './ValueExpression'
import lambda, { Lambda } from './lambda'

type Update = Object | Lambda

function _update(expr: IExpression, update: Update): IExpression {
  if (typeof update === 'function') {
    return e.call(e.member(expr, 'update'), [lambda(update)])
  }
  return e.call(e.member(expr, 'update'), [e.json(update)])
}

export class SelectionExpression extends SequenceExpression {
  update(update: Update): IExpression {
    return _update(this, update)
  }
}

export class SingleSelectionExpression extends ValueExpression {
  update(update: Update): IExpression {
    return _update(this, update)
  }
}
