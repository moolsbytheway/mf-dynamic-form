import {
  CheckboxFormControl,
  DropdownFormControl,
  DropdownOption,
  DynamicFormControl, KeyValueConditionMatcher,
  MfForm,
  RadioButtonFormControl,
  TextboxFormControl,
  TextBoxType
} from 'mf-dynamic-form';
import {ExempleCustomFormControlComponent} from './custom-form-controls/exemple-custom-form-control.component';

export const fetchTypeFlux$ = (value): Promise<DropdownOption[]> => {
  return new Promise((resolve) => {
    resolve(value == 1 ? [
      {label: 'Backend value 1 for Val 1', value: 11},
      {label: 'Backend value 2 for Val 1', value: 12},
    ] : [
      {label: 'Backend value 1 for Val 2', value: 21},
      {label: 'Backend value 2 for Val 2', value: 22},
    ]);
  });
};

export const PURCHASE_ORDER_FORM_DEFINITION: MfForm = {
  debugMode: true,
  customControls: {
    unitsFormControl: ExempleCustomFormControlComponent
  },
  steps: [
    {
      label: 'Informations de la commande',
      iconClass: 'fa fa-truck',
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
              label: 'read only one',
              value: 'Moulaye',

              readOnly: true,
              export: false,
              onChanged: (value, patchValue) => {
                console.log("new firstName: " + value)
                patchValue("calculatedValue", Math.random())
              },
              type: TextBoxType.TEXT,
            }),
            new TextboxFormControl({
              key: 'calculatedValue',
              label: 'read only two',
              readOnly: true,
              export: false,
              onChanged: (value) => {
                console.log("new calculatedValue: " + value)
              },
            }),
            new TextboxFormControl({
              key: 'lastName',
              label: 'Nom',
              value: 'Ahmed',
            }),
            new DropdownFormControl({
              key: 'modeTransport',
              label: 'Mode de transport',
              value: '1',
              options: [
                {label: 'Val1', value: 1},
                {label: 'Val2', value: 2},
              ]
            }),
            new DropdownFormControl({
              key: 'typeFluxWithTriggerField',
              label: 'Type de flux with Trigger field',
              visibleWhen: new KeyValueConditionMatcher('modeTransport', "", "EQUALS"),
              requiredWhen: new KeyValueConditionMatcher('modeTransport', "", "EQUALS"),
              value: '11',
              options$: {
                triggerField: 'modeTransport',
                callback: fetchTypeFlux$
              }
            }),
            new DropdownFormControl({
              key: 'typeFluxWithoutTriggerField',
              label: 'Type de flux without Trigger field',
              visibleWhen:new KeyValueConditionMatcher('typeFluxWithTriggerField', "", "EQUALS"),
              value: '21',
              options$: {
                callback: (value) => {
                  return new Promise((resolve) => {
                    resolve([
                      {label: 'NO trigger Backend value 1', value: 11},
                      {label: 'NO trigger Backend value 2', value: 22},
                    ]);
                  });
                }
              }
            }),
            new RadioButtonFormControl({
              key: 'radioButton',
              classes :{
                item: "radio-inline"
              },
              label: 'Acceptes tu les termes et conditions ?',
              value: 'true',
              options: [
                {label: 'Oui', value: 'true'},
                {label: 'Non', value: 'false'}
              ]
            }),
            new CheckboxFormControl({
              key: 'checkboxes',
              required: true,
              classes :{
                item: "col-xl-12"
              },
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
    },
    {
      label: 'step 2',
      sections: [
        {
          label: 'step 2',
          controls: [
            new TextboxFormControl({
              key: 'firstName2',
              label: 'Prénom',
              value: '',
              type: TextBoxType.TEXT,
            }),
            new TextboxFormControl({
              key: 'lastName3',
              label: 'Nom',
              value: '',
            }),
            new TextboxFormControl({
              key: 'fsfd',
              required: false,
              label: 'Nofdfm',
              value: '',
            })
          ]
        }
      ]
    }]
};
