import {FormControlBase} from './form-control-base';

export class DynamicFormControl extends FormControlBase {
	controlType = "dynamic"
  onChanged: Function;

  constructor(options, customOptions?: {
    onChanged?: Function,
  }) {
    super(options);
    this.onChanged = customOptions.onChanged;
  }
}
