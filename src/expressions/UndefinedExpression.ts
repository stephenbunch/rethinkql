import { IExpression } from './IExpression';

export class UndefinedExpression implements IExpression {
  toJSON() {
    return {
      type: 'undefined',
    };
  }

  evaluate() {
    return undefined;
  }
}
