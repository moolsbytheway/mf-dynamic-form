import {TextBoxType} from './textbox-type';
import {ConditionMatcher} from '../condition-matchers/condition-matcher';

export class FormControlBase {
  value: any;
  key: string;
  classes: MfFormControlClasses;
  label: string;
  disabled: boolean;
  readOnly: boolean;
  notReadOnly: boolean;
  required: boolean;
  order: number;
  placeholder: string;
  alphanumeric: boolean;
  controlType: string;
  type: TextBoxType;
  exportOnly: boolean;
  export: boolean;
  visible: boolean;
  hidden: boolean;
  requiredWhen: ConditionMatcher[];
  visibleWhen: ConditionMatcher[];
  disableWhen: ConditionMatcher[];
  enableWhen: ConditionMatcher[];
  minLength: number;
  maxLength: number;
  positiveNumberOnly: boolean;
  options: DropdownOption[];
  options$: PromiseOptionsParams;
  inputs: any;
  component: string;
  // The angular component provided by name in component field
  componentElement?: string;
  onChanged: Function;
  timeZone: string;


  constructor(options: {
    value?: any;
    key?: string;
    export?: boolean;
    disabled?: boolean;
    visible?: boolean;
    label?: string;
    alphanumeric?: boolean;
    required?: boolean;
    exportOnly?: boolean;
    readOnly?: boolean;
    notReadOnly?: boolean;
    requiredWhen?: ConditionMatcher[];
    visibleWhen?: ConditionMatcher[];
    disableWhen?: ConditionMatcher[];
    enableWhen?: ConditionMatcher[];
    order?: number;
    controlType?: string;
    type?: TextBoxType;
    options?: DropdownOption[],
    options$?: PromiseOptionsParams,
    minLength?: number;
    hidden?: boolean;
    maxLength?: number;
    positiveNumberOnly?: boolean;
    classes?: MfFormControlClasses;
    placeholder?: string;
    inputs?: any;
    component?: string;
    onChanged?: Function;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.exportOnly = !!options.exportOnly;
    this.required = options.required == undefined ? true : !!options.required;
    this.requiredWhen = options.requiredWhen || [];
    this.visibleWhen = options.visibleWhen || [];
    this.disableWhen = options.disableWhen || [];
    this.enableWhen = options.enableWhen || [];
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || TextBoxType.TEXT;
    this.maxLength = options.maxLength;
    this.readOnly = !!options.readOnly;
    this.notReadOnly = !!options.notReadOnly;
    this.alphanumeric = !!options.alphanumeric;
    this.disabled = !!options.disabled;
    this.hidden = !!options.hidden;
    this.minLength = options.minLength;
    this.positiveNumberOnly = options.positiveNumberOnly;
    this.classes = options.classes;
    this.options$ = options.options$;
    this.options = options.options || [];
    this.export = options.export == undefined ? true : options.export;
    this.visible = options.visible == undefined ? true : options.visible;
    this.placeholder = options.placeholder || options.label;
    this.inputs = options.inputs;
    this.component = options.component;
    this.onChanged = options.onChanged;
  }
}


export type MfForm = {
  debugMode?: boolean,
  readOnly?: boolean,
  exportDisabledFields?: boolean,
  steps: MfFormStep[]
  customControls?: any
}

export type MfFormStep = { label?: string, iconClass?: string, sections: MfFormSection[] };
export type MfFormSection = { label?: string, controls: FormControlBase[] }
export type DropdownOption = { value: any, label: string };
export type PromiseOptionsParams = { callback: (any) => Promise<DropdownOption[]>, triggerField?: string };
export type MfFormControlClasses = {
  root?: string,
  label?: string,
  item?: string
}
