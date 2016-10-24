import MethodCallExpression from '../expressions/MethodCallExpression';
import ParameterExpression from '../expressions/ParameterExpression';
import LambdaExpression from '../expressions/LambdaExpression';
import DatumExpression from './DatumExpression';

export default class SequenceExpression {
  constructor(sequence) {
    this.sequence = sequence;
  }

  toJSON() {
    return {
      type: 'sequence',
      sequence: this.sequence.toJSON(),
    };
  }

  evaluate(context) {
    return this.sequence.evaulate(context);
  }

  map(callback) {
    const parameters = [new DatumExpression(new ParameterExpression(0))];
    const body = callback(...parameters);
    return new SequenceExpression(
      new MethodCallExpression('map', this.sequence, [new LambdaExpression(parameters, body)])
    );
  }
}
