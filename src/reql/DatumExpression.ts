import { IParameterExpression } from '../expressions/ParameterExpression';
import { ValueExpression } from './ValueExpression';

export class DatumExpression extends ValueExpression implements IParameterExpression {
  parameter: IParameterExpression;

  constructor(parameter: IParameterExpression) {
    super(parameter);
    this.parameter = parameter;
  }

  get position() {
    return this.parameter.position;
  }
}
