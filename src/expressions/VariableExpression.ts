import { IExpression } from './IExpression';

export class VariableExpression implements IExpression {
  identifier: string;

  constructor(identifier: string) {
    this.identifier = identifier;
  }

  toJSON() {
    return {
      type: 'variable',
      identifier: this.identifier,
    };
  }

  evaluate(context = {}) {
    return context[this.identifier];
  }
}
