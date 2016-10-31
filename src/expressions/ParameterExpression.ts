import { IExpression } from './IExpression';

export interface IParameterExpression extends IExpression {
  readonly position: number;
}

export class ParameterExpression implements IParameterExpression {
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
