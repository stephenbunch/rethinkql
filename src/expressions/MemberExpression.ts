import { IExpression } from './IExpression'

export default class MemberExpression implements IExpression {
  object: IExpression
  member: string

  constructor(object: IExpression, member: string) {
    this.object = object
    this.member = member
  }

  toJSON() {
    return {
      type: 'member',
      object: this.object.toJSON(),
      member: this.member,
    }
  }

  evaluate(context = {}) {
    const object = this.object.evaluate(context)
    const member = object[this.member]
    if (typeof member === 'function') {
      return member.bind(object)
    }
    return member
  }
}
