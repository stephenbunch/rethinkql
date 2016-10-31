import { VariableExpression } from '../expressions/VariableExpression';
import { MemberExpression } from '../expressions/MemberExpression';
import { CallExpression } from '../expressions/CallExpression';
import { JsonExpression } from '../expressions/JsonExpression';
import { SequenceExpression } from './SequenceExpression';

export const r = {
  table: (name: string) => new SequenceExpression(new CallExpression(new MemberExpression(new VariableExpression('r'), 'table'), [new JsonExpression(name)])),
  expr: json => new CallExpression(new MemberExpression(new VariableExpression('r'), 'table'), [new JsonExpression(json)])
};
