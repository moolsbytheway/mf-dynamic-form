import {FormGroup} from '@angular/forms';
import {FormControlBase} from '../model/form-control-base';

export interface ConditionMatcher {
  match(context: ConditionMatcherContext);
}

export type ConditionMatcherResult = {
  matched: boolean;
  fields: string[]
}
export type ConditionMatcherContext = {
  control: FormControlBase; formGroup: FormGroup;
}


export type OPERATOR = 'EQUALS' | 'NOTEQUALS';


export class KeyValueConditionMatcher implements ConditionMatcher {
  private readonly field: string;
  private readonly value: any;
  private readonly op: OPERATOR;

  private context: ConditionMatcherContext;

  constructor(field, value, op?) {
    this.field = field;
    this.value = value;
    this.op = op;
  }

  match(context: ConditionMatcherContext): ConditionMatcherResult {

    this.context = context;
    const fieldName = this.field;
    const expectedValue = this.value;
    const operator: OPERATOR = this.op ? this.op : 'EQUALS';

    const operatorMatchesValues = value => {
      if (operator == 'EQUALS') {
        return value == expectedValue;
      }
      return value != expectedValue;
    };

    const currentValue = context.formGroup.get(fieldName).value;

    return {
      matched: operatorMatchesValues(currentValue),
      fields: [fieldName]
    } as ConditionMatcherResult;
  }
}

