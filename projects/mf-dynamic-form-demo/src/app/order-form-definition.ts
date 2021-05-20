import {CheckboxFormControl, MfForm, RadioButtonFormControl, TextboxFormControl} from 'mf-dynamic-form';
import {DynamicFormControl} from 'mf-dynamic-form';
import {ExempleCustomFormControlComponent} from './custom-form-controls/exemple-custom-form-control.component';
import {TextBoxType} from 'mf-dynamic-form';

export const PURCHASE_ORDER_FORM_DEFINITION: MfForm = {
  debugMode: true,
  customControls: {
    unitsFormControl: ExempleCustomFormControlComponent
  },
  steps: [
    {
      label: 'Informations de la commande',
      sections: [
        {
          label: 'Informations de la commande',
          controls: [
            new DynamicFormControl({
              key: 'units',
              required: false,
              requiredWhen: [{field: 'radioButton', value: 'true'}],
              visibleWhen: [{field: 'radioButton', value: 'true'}],
              component: 'unitsFormControl',
              inputs: {
                a: 1,
                b: 2
              }
            }),
            new TextboxFormControl({
              key: 'firstName',
              label: 'Prénom',
              value: "Moulaye",
              type: TextBoxType.TEXT,
            }),
            new TextboxFormControl({
              key: 'lastName',
              label: 'Nom',
              type: TextBoxType.PHONE
            }),
            new RadioButtonFormControl({
              key: 'radioButton',
              class: 'radio-inline',
              label: 'Acceptes tu les termes et conditions ?',
              value: '',
              options: [
                {label: 'Oui', value: 'true'},
                {label: 'Non', value: 'false'}
              ]
            }),
            new CheckboxFormControl({
              key: 'checkboxes',
              required: true,
              class: 'col-xl-12',
              label: 'Selectionnez les choix applicables',
              value: ['2', '1'],
              options: [
                {label: 'Choix1', value: '1'},
                {label: 'Choix2', value: '2'},
                {label: 'Choix3', value: '3'}
              ]
            }),
          ]
        },
      ]
    }
  ]
};
