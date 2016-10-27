import { IExpression } from './IExpression';
import { ParameterExpression } from './ParameterExpression';

export class LambdaExpression implements IExpression {
  parameters: ParameterExpression[];
  body: IExpression;

  constructor(parameters: ParameterExpression[], body: IExpression) {
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
    return (...args: any[]) => this.body.evaluate(
      this.parameters.reduce(
        (lambdaContext, parameter) => Object.assign({}, lambdaContext, {
          [parameter.position]: args[parameter.position],
        }),
        context
      )
    );
  }
}
