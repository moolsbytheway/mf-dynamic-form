import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolTipComponent implements OnInit {

  @Input()
  helpText: string;

  innerHTML: string;


  ngOnInit(): void {
    this.convertToHTML(this.helpText);
  }

  convertToHTML(helpText: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(helpText, 'text/html');
    this.innerHTML = doc.body.innerHTML;
  }

}
