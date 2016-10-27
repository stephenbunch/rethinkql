import { IExpression } from './IExpression';

export class MethodCallExpression implements IExpression {
  name: string;
  thisArg: IExpression;
  arguments: IExpression[];

  constructor(name: string, thisArg: IExpression, args: IExpression[]) {
    this.name = name;
    this.thisArg = thisArg;
    this.arguments = args;
  }

  toJSON() {
    return {
      type: 'methodCall',
      name: this.name,
      thisArg: this.thisArg.toJSON(),
      arguments: this.arguments.map(argument => argument.toJSON()),
    };
  }

  evaluate(context: Object) {
    const func = context[this.name] as () => any;
    return func.apply(
      this.thisArg.evaluate(context),
      this.arguments.map(argument => argument.evaluate(context))
    );
  }
}
