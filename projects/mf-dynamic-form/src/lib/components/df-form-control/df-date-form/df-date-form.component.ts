import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'df-date-form',
  styleUrls: ['./df-date-form.component.scss'],
  templateUrl: './df-date-form.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DfDateFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() control: any;
  @Input() isDisabled: boolean = false;
  @Output()
	change: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
  }

  onChangeDate(date){
    if (date.target?.value) {
      this.change.emit(date.target.value);
    }
  }
}

