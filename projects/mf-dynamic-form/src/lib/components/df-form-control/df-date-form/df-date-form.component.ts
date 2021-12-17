import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'df-date-form',
  styleUrls: ['./df-date-form.component.scss'],
  templateUrl: './df-date-form.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DfDateFormComponent implements OnInit {
  @Input() control: any;
  @Input() isDisabled: boolean = false;
  @Input() timeZone: string = "+00:00";
  @Output()
	change: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.timeZone = this.control?.timeZone;
  }

  onChangeDate(date){
    if (date.target?.value) {
      const dateIsoWithTz= this.addTimeZone(date.target?.value);
      this.change.emit(dateIsoWithTz);
    }
  }
  addTimeZone(date){
    return date + this.timeZone;
  }
}

