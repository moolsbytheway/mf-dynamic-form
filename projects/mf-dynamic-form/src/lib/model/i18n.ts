export class I18n {
	next: string;
	previous: string;
	save: string;
	errors: {
		isRequired?: string,
		minLength?: string,
		maxLength?: string,
		emailInvalid?: string,
		alphanumeric?: string,
		passwordMismatch?: string
	};

	constructor(options: {
		next?: string;
		cancel?: string;
		previous?: string;
		save?: string;
		errors?: {
			isRequired?: string,
			minLength?: string,
			maxLength?: string,
			emailInvalid?: string,
			alphanumeric?: string,
			passwordMismatch?: string
		};
	} = {}) {
		this.next = options.next;
		this.previous = options.previous;
		this.save = options.save;
		this.errors = options.errors;
	}

}

