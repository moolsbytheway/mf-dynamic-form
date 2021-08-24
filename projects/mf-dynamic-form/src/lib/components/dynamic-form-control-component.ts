import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Directive()
export abstract class DynamicFormControlComponent {
	@Output()
	output: EventEmitter<any> = new EventEmitter();
	@Input()
  formValue: FormGroup
  @Input()
  formReadyOnly: boolean

	protected updateFormControlValue(value, options?) {
		this.output.emit({value, options})
	}
}
