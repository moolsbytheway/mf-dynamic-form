import {FormGroup} from '@angular/forms';
import {FormControlBase} from '../model/form-control-base';

export interface ConditionMatcher {
  match(context: ConditionMatcherContext);
}

export type ConditionMatcherResult = {
  matched: boolean;
  fields: string[]
  targetFormGroup?: FormGroup;
}
export type ConditionMatcherContext = {
  control: FormControlBase; formGroup: FormGroup;
}


