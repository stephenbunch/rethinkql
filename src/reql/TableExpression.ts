import * as e from '../expressions'

import { SelectionExpression, SingleSelectionExpression } from './selections'

export default class TableExpression extends SelectionExpression {
  constructor(name: string) {
    super(e.call(e.member(e.variable('r'), 'table'), [e.json(name)]))
  }

  get(key: any) {
    return new SingleSelectionExpression(e.call(e.member(this, 'get'), [e.json(key)]))
  }
}
