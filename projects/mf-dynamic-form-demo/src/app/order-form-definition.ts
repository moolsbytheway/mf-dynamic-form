import {DynamicFormControl, MfForm, TextboxFormControl} from 'mf-dynamic-form';
import {ExempleCustomFormControlComponent} from './custom-form-controls/exemple-custom-form-control.component';

export const PURCHASE_ORDER_FORM_DEFINITION: MfForm = {
  // @ts-ignore
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
            new TextboxFormControl({
              key: 'firstName',
              label: 'Prénom',
              type: 'text',
            }),
            new TextboxFormControl({
              key: 'lastName',
              label: 'Nom',
              type: 'text'
            })
          ]
        },
      ]
    }, {
      label: 'Informations transport & logistiques',
      sections: [
        {
          label: 'Informations transport & logistiques',
          controls: [
            new TextboxFormControl({
              key: 'info',
              label: 'Commande No',
              type: 'text',
            }),
          ]
        },
      ]
    }, {
      label: 'Références',
      sections: [
        {
          label: 'Références',
          controls: [
            new TextboxFormControl({
              key: 'sap',
              label: 'SAP No',
              type: 'text',
            }),
          ]
        },
      ]
    }, {
      label: 'Articles',
      sections: [
        {
          label: 'Articles',
          controls: [
            new DynamicFormControl({
              key: 'units',
              component: 'unitsFormControl',
              inputs: {
                a: 1,
                b: 2
              }
            }),
          ]
        },
      ]
    }
  ]
};
