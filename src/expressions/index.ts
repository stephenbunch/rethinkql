import { IExpression } from './IExpression'
import CallExpression from './CallExpression'
import JsonExpression from './JsonExpression'
import LambdaExpression from './LambdaExpression'
import MemberExpression from './MemberExpression'
import ParameterExpression, { IParameterExpression } from './ParameterExpression'
import VariableExpression from './VariableExpression'

export const call = (func: IExpression, args: IExpression[]) => new CallExpression(func, args)
export const json = (json: any) => new JsonExpression(json)
export const lambda = (parameters: IParameterExpression[], body: IExpression) => new LambdaExpression(parameters, body)
export const member = (object: IExpression, member: string) => new MemberExpression(object, member)
export const parameter = (position: number) => new ParameterExpression(position)
export const variable = (identifier: string) => new VariableExpression(identifier)
