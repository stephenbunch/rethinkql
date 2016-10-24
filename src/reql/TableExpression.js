import MethodCallExpression from '../expressions/MethodCallExpression';
import JsonExpression from '../expressions/JsonExpression';
import SequenceExpression from './SequenceExpression';

export default class TableExpression extends SequenceExpression {
  constructor(name) {
    super(new MethodCallExpression('table', new JsonExpression(name)));
  }

  toJSON() {
    return {
      type: 'table',
      sequence: this.sequence.toJSON(),
    };
  }
}
