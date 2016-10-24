export default class MethodCallExpression {
  constructor(name, thisArg, args) {
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

  evaluate(context) {
    return context[this.name].apply(
      this.thisArg.evaluate(context),
      this.arguments.map(argument => argument.evaluate(context))
    );
  }
}
