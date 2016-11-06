import * as e from '../expressions'

import TableExpression from './TableExpression'

export const table = (name: string) => new TableExpression(name)
export const expr = json => e.call(e.member(e.variable('r'), 'table'), [e.json(json)]) 
