import { IExpression } from './IExpression';

export class ParameterExpression implements IExpression {
  position: number;

  constructor(position: number) {
    this.position = position;
  }

  toJSON() {
    return {
      type: 'parameter',
      position: this.position,
    };
  }

  evaluate(context: Object) {
    return context[this.position];
  }
}
