import {Directive, EventEmitter, Output} from "@angular/core";

@Directive()
export abstract class DynamicFormControlComponent {
	@Output()
	output: EventEmitter<any> = new EventEmitter();

	protected updateFormControlValue(value) {
		this.output.emit(value)
	}
}
