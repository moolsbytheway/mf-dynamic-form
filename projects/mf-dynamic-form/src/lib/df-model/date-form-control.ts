import {FormControlBase} from './form-control-base';

export class DateFormControl extends FormControlBase {
  controlType = 'date';
  minDate: string;
  maxDate: string;

  constructor(options, customOptions?: {
    minDate?: string,
    maxDate?: string
  }) {
    super(options);
    this.minDate = customOptions.minDate;
    this.maxDate = customOptions.maxDate;
  }
}
