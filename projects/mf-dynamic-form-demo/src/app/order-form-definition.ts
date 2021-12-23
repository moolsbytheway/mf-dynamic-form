import {
  CheckboxFormControl,
  DateFormControl,
  DropdownFormControl,
  DropdownOption,
  MfForm,
  RadioButtonFormControl,
  TextboxFormControl,
  TextBoxType
} from 'mf-dynamic-form';
import {ExempleCustomFormControlComponent} from './custom-form-controls/exemple-custom-form-control.component';
import KeyValueConditionMatcher from 'mfx-key-value-matcher';
import {FormGroup} from '@angular/forms';
import { formatDate } from '@angular/common';

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
const TimeZone: string = "+01:00";
export const PURCHASE_ORDER_FORM_DEFINITION  = (externalFormGroup: FormGroup): MfForm => {
  return {
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
              new DateFormControl(
              {
                key: 'date1',
                label: 'Date +02:00',
                value: "2021-12-23T02:15+02:00",
              },
              {
                minDate: formatDate(new Date(1900, 1, 1), 'yyyy-MM-dd', 'en'),
                maxDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
                timeZone: TimeZone,
              }),
              new DateFormControl(
              {
                key: 'date2',
                label: 'Date Utc',
                value: "2021-12-23T00:15",
              },
              {
                minDate: formatDate(new Date(1900, 1, 1), 'yyyy-MM-dd', 'en'),
                maxDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
                timeZone: TimeZone,
              }),
              new DateFormControl(
              {
                key: 'date3',
                label: 'Date -05:00',
                value: "2021-12-22T19:15-05:00",
              },
              {
                minDate: formatDate(new Date(1900, 1, 1), 'yyyy-MM-dd', 'en'),
                maxDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
                timeZone: TimeZone,
              }),
              new TextboxFormControl({
                key: 'firstName',
                label: 'read only one',
                onChanged: (value, patchValue) => {
                  console.log("new firstName: " + value)
                  patchValue("calculatedValue", Math.random())
                },
                type: TextBoxType.TEXT,
              }),
              new TextboxFormControl({
                key: 'lastName',
                label: 'Nom',
                value: 'Ahmed',
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
                value: '11',
                options$: {
                  triggerField: 'modeTransport',
                  callback: fetchTypeFlux$
                }
              }),
              new TextboxFormControl({
                key: 'targetFormGroup',
                label: 'Field Depends on External Form Group',
                visibleWhen: [new KeyValueConditionMatcher('firstName', "Ahmed", "EQUALS", externalFormGroup)],
                requiredWhen: [new KeyValueConditionMatcher('lastName', "Mohameden", "EQUALS", externalFormGroup)],
                value: '',
                required: false
              }),
              new DropdownFormControl({
                key: 'typeFluxWithoutTriggerField',
                label: 'Type de flux without Trigger field',
                visibleWhen: [new KeyValueConditionMatcher('typeFluxWithTriggerField', "", "EQUALS")],
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
                classes: {
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
                classes: {
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
  }
};
