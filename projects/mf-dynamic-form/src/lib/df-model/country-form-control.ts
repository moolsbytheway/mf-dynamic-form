import {FormControlBase} from './form-control-base';

export class CountryFormControl extends FormControlBase {
  controlType = 'country';
  cityIsMissingLabel? ="Je ne vois pas la ville désirée";
}
