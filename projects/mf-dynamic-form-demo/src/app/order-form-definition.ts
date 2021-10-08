import {DropdownOption, KeyValueConditionMatcher, MfForm, TextboxFormControl} from 'mf-dynamic-form';
import {AdvancedConditionMatcher} from 'mfx-advanced-condition-matcher/dist/advanced-condition-matcher-plugin';
export const PURCHASE_ORDER_FORM_DEFINITION: MfForm = {
  readOnly: false,
  steps: [{
    label: 'Informations d\'expédition',
    sections: [
      {
        label: 'Description de l\'expédition',
        controls: [
          new TextboxFormControl({
            value: 'c',
            key: 'incoterm',
            label: 'Incoterm',
            exportOnly: false,
            required: true,
            requiredWhen: [],
            visibleWhen: [],
            disableWhen: [],
            order: 1,
            controlType: 'textbox',
            readOnly: false,
            notReadOnly: false,
            alphanumeric: false,
            disabled: false,
            hidden: false,
            options: [],
            export: true,
            visible: true,
            placeholder: 'Incoterm'
          }),
          new TextboxFormControl({
            value: 'test',
            key: 'visible_transport_request',
            label: 'visible',
            exportOnly: false,
            required: false,
            requiredWhen: [
              new AdvancedConditionMatcher(
                `incoterm =="c" or (incoterm !="c" and ch_90_transport_request==123)`),
              new KeyValueConditionMatcher('ch_90_transport_request', 'down', 'EQUALS'),
              new KeyValueConditionMatcher('ch_90_transport_request', 'down2', 'EQUALS'),
            ],

            visibleWhen: [
              new AdvancedConditionMatcher(
                `incoterm =="c" or (incoterm !="c" and ch_90_transport_request==123)`),
              new KeyValueConditionMatcher('ch_90_transport_request', 'down', 'EQUALS'),
              new KeyValueConditionMatcher('ch_90_transport_request', 'down2', 'EQUALS'),
            ],

            disableWhen: [
              new AdvancedConditionMatcher(
                `incoterm =="c" or (incoterm !="c" and ch_90_transport_request==123)`),
              new KeyValueConditionMatcher('ch_90_transport_request', 'down', 'EQUALS'),
              new KeyValueConditionMatcher('ch_90_transport_request', 'down2', 'EQUALS'),],
            order: 1,
            controlType: 'textbox',
            readOnly: false,
            notReadOnly: false,
            alphanumeric: false,
            disabled: false,
            hidden: false,
            options: [],
            export: true,
            visible: true,
            placeholder: 'visible'
          }),
          new TextboxFormControl({
            value: 'down',
            key: 'ch_90_transport_request',
            label: 'ch 90',
            exportOnly: false,
            required: true,
            requiredWhen: [],
            visibleWhen: [],
            disableWhen: [],
            order: 1,
            controlType: 'textbox',
            readOnly: false,
            notReadOnly: false,
            alphanumeric: false,
            disabled: false,
            hidden: false,
            options: [],
            export: true,
            visible: true,
            placeholder: 'ch 90'
          })
        ]
      }]
  }]
};
