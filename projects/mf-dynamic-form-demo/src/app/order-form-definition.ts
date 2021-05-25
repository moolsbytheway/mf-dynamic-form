import {CheckboxFormControl, MfForm, RadioButtonFormControl, TextboxFormControl} from 'mf-dynamic-form';
import {DynamicFormControl} from 'mf-dynamic-form';
import {ExempleCustomFormControlComponent} from './custom-form-controls/exemple-custom-form-control.component';
import {TextBoxType} from 'mf-dynamic-form';
import {DropdownFormControl} from 'mf-dynamic-form';
import {DropdownOption} from 'mf-dynamic-form';

export const fetchTypeFlux$ = (value): Promise<DropdownOption[]> =>  {
  return new Promise((resolve) => {
    resolve(value == 1 ? [
      {label: 'Backend value 1 for Val 1', value: 11},
      {label: 'Backend value 2 for Val 1', value: 12},
    ] : [
      {label: 'Backend value 1 for Val 2', value: 21},
      {label: 'Backend value 2 for Val 2', value: 22},
    ])
  })
}

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
            new DropdownFormControl({
               key: 'modeTransport',
              label: 'Mode de transport',
              options: [
                {label: 'Val1', value: 1},
                {label: 'Val2', value: 2},
              ]
            }),
            new DropdownFormControl({
               key: 'typeFluxWithTriggerField',
              label: 'Type de flux with Trigger field',
              visibleWhen: ['modeTransport'],
              requiredWhen: ['modeTransport'],
              options$: {
                 triggerField: 'modeTransport',
                callback: fetchTypeFlux$
              }
            }),
            new DropdownFormControl({
               key: 'typeFluxWithoutTriggerField',
              label: 'Type de flux without Trigger field',
              visibleWhen: ['typeFluxWithTriggerField'],
              options$: {
                callback: (value) => {
                   return new Promise((resolve) => {
                     resolve([
                       {label: 'NO trigger Backend value 1', value: 11},
                       {label: 'NO trigger Backend value 2', value: 22},
                     ])
                   })
                }
              }
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
