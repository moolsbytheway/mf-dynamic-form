import {CheckboxFormControl, MfForm, RadioButtonFormControl, TextboxFormControl} from 'mf-dynamic-form';

export const PURCHASE_ORDER_FORM_DEFINITION: MfForm = {
  debugMode: true,
  steps: [
    {
      label: 'Informations de la commande',
      sections: [
        {
          label: 'Informations de la commande',
          controls: [
            new TextboxFormControl({
              key: 'firstName',
              disableWhen: [{field: 'radioButton', value: 'true'}],
              label: 'Prénom',
              type: 'text',
            }),
            new TextboxFormControl({
              key: 'lastName',
              label: 'Nom',
              type: 'text'
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
              visibleWhen: [{field: 'radioButton', value: 'true'}],
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
