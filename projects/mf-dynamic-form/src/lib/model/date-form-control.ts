import { DateUtils } from '../utils/date-utils';
import {FormControlBase} from './form-control-base';

export class DateFormControl extends FormControlBase {
	controlType = 'date';
	minDate: string;
	maxDate: string;

	constructor(options, customOptions?: {
		minDate?: string,
		maxDate?: string,
		timeZone?: string
	}) {
		super(options);
		this.minDate = customOptions?.minDate;
		this.maxDate = customOptions?.maxDate;
		if(customOptions?.timeZone)
			this.timeZone = customOptions?.timeZone;
		else 
			this.timeZone = DateUtils.DEFAULT_TIMEZONE;
	}
}
