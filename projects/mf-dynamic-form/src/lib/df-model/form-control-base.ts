export class FormControlBase {
  value: any;
  key: string;
  class: string;
  label: string;
  required: boolean;
  step: string;
  order: number;
  placeholder: string;
  alphanumeric: boolean;
  controlType: string;
  type: string;
  export: boolean;
  visible: boolean;
  hidden: boolean;
  requiredWhen: any[] | { field: string, value: any }[];
  visibleWhen: { field: string, value: any }[];
  disableWhen: { field: string, value: any }[];
  minLength: number;
  maxLength: number;
  options: { value: string, label: string }[];

  constructor(options: {
    value?: any ;
    key?: string;
    step?: string;
    export?: boolean;
    visible?: boolean;
    label?: string;
    alphanumeric?: boolean;
    required?: boolean
    requiredWhen?: any[] | { field: string, value: any }[];
    visibleWhen?: { field: string, value: any }[];
    disableWhen?: { field: string, value: any }[];
    order?: number;
    controlType?: string;
    type?: string;
    options?: { value: string, label: string }[],
    minLength?: number;
    hidden?: boolean;
    maxLength?: number;
    class?: string;
    placeholder?: string;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = options.required == undefined ? true : !!options.required
    this.requiredWhen = options.requiredWhen || [];
    this.visibleWhen = options.visibleWhen || [];
    this.disableWhen = options.disableWhen || [];
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || 'text';
    this.maxLength = options.maxLength;
    this.alphanumeric = !!options.alphanumeric;
    this.hidden = !!options.hidden;
    this.step = options.step;
    this.minLength = options.minLength;
    this.class = options.class;
    this.options = options.options || [];
    this.export = options.export == undefined ? true : options.export;
    this.visible = options.visible == undefined ? false : options.visible;
    this.placeholder = options.placeholder || options.label;
  }
}


export type MfForm = {
  debugMode: boolean,
  stepper: boolean,
  controls: FormControlBase[]
}
