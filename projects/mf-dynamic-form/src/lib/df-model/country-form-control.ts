import {FormControlBase} from './form-control-base';

export class CountryFormControl extends FormControlBase {
  controlType = 'country';
  i18n = {city: "Ville", state: "Province", country: "Pays", cityIsMissing: "Je ne vois pas la ville désirée"};

  constructor(options, customOptions?: {
    i18n?: {city: string, state: string, country: string, cityIsMissing: string};
  }) {
    super(options);
    this.i18n = customOptions.i18n;
  }
}
