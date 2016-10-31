import { IExpression } from './IExpression';
import { ParameterExpression } from './ParameterExpression';

const wrappers = {};

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
    if (!wrappers[this.parameters.length]) {
      const params = Array(this.parameters.length + 1).join(', _').substr(2);
      wrappers[this.parameters.length] = new Function('fn', `return function(${params}){return fn.apply(this, arguments)}`);
    }
    const wrapper = wrappers[this.parameters.length];
    return wrapper((...args: any[]) =>
      this.body.evaluate(
        this.parameters.reduce(
          (locals, parameter) => Object.assign({}, locals, {
            [parameter.position]: args[parameter.position],
          }),
          context
        )
      )
    );
  }
}
