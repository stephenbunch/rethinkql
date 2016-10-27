export interface IExpression {
  toJSON(): Object
  evaluate(context: Object): any
}
