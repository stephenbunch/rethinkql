import { IExpression } from './IExpression';

export class CallExpression implements IExpression {
  func: IExpression;
  arguments: IExpression[];

  constructor(func: IExpression, args: IExpression[]) {
    this.func = func;
    this.arguments = args;
  }

  toJSON() {
    return {
      type: 'call',
      func: this.func.toJSON(),
      arguments: this.arguments.map(argument => argument.toJSON()),
    };
  }

  evaluate(context = {}) {
    const func = this.func.evaluate(context);
    const args = this.arguments.map(arg => arg.evaluate(context));
    return func.apply(undefined, args);
  }
}
