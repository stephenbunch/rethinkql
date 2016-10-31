import { IExpression } from '../expressions/IExpression';
import { CallExpression } from '../expressions/CallExpression';
import { ParameterExpression } from '../expressions/ParameterExpression';
import { LambdaExpression } from '../expressions/LambdaExpression';
import { DatumExpression } from './DatumExpression';
import { MemberExpression } from '../expressions/MemberExpression';

export class SequenceExpression implements IExpression {
  sequence: IExpression;

  constructor(sequence) {
    this.sequence = sequence;
  }

  toJSON() {
    return this.sequence.toJSON();
  }

  evaluate(context) {
    return this.sequence.evaluate(context);
  }

  map<T extends IExpression>(transform: (datum: DatumExpression) => T): SequenceExpression {
    const datum = new DatumExpression(new ParameterExpression(0));
    const parameters = [];
    const body = transform(datum);
    return new SequenceExpression(
      new CallExpression(new MemberExpression(this.sequence, 'map'), [new LambdaExpression([datum], body)]) 
    );
  }
}
