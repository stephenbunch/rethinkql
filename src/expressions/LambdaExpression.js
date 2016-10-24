export default class LambdaExpression {
  constructor(parameters, body) {
    this.parameters = parameters;
    this.body = body;
  }

  toJSON() {
    return {
      type: 'lambda',
      parameters: this.parameters.map(parameter => parameter.toJSON()),
      body: this.body.toJSON(),
    };
  }

  evaluate(context = {}) {
    return (...args) => this.body.evaluate(
      this.parameters.reduce(
        (lambdaContext, parameter) => ({
          ...lambdaContext,
          [parameter.name]: args[parameter.name],
        }),
        context
      )
    );
  }
}
