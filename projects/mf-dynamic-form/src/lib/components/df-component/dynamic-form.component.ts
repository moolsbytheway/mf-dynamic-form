import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {FormControlBase, MfForm} from '../../df-model/form-control-base';
import {FormControlService} from '../../df-service/form-control.service';

@Component({
  selector: 'mf-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormControlService],
  encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent {
  debugMode: boolean;
  stepper: boolean;
  formGroup: FormGroup;
  formControls: FormControlBase[] = [];
  activeStep = 0;
  groups: { name: string, controls: FormControlBase[] }[] = [];

  @Input()
  i18n = {next: "Suivant", cancel: "Annuler", previous: "Précedent", save: "Save"};

  @Input() set form(f: MfForm) {
    if (!f) {
      return;
    }
    this.init(f);
  }

  get isFirstStep() {
    return this.activeStep === 0;
  }

  get isLastStep() {
    return this.activeStep === this.groups.length - 1;
  }

  @Output() formSubmitted = new EventEmitter();

  constructor(private qcs: FormControlService) {
  }

  submit() {
    const form = {};
    this.formControls.forEach(it => {
      if (it.export) {
        form[it.key] = this.formGroup.controls[it.key].value;
      }
    });
    this.formSubmitted.emit(form);
  }

  private initGroups() {
    const groups = [];
    if (!this.stepper) {
      this.formControls.forEach(it => it.step = '');
    }
    this.formControls.forEach(control => {
      if (groups.find(it => it.name === control.step)) {
        groups.forEach(it => {
          if (it.name === control.step) {
            it.controls = [...it.controls, control];
          }
        });
      } else {
        groups.push({name: control.step, controls: [control]});
      }
    });
    this.groups = groups;
  }

  goToPreviousStep() {
    this.activeStep--;
  }

  goToNextStep() {
    this.activeStep++;
  }

  isActiveStep(index: number) {
    return index === this.activeStep;
  }

  back() {
    window.history.back();
  }

  debug() {
    console.log(this.formGroup.controls);
  }

  private init(f: MfForm) {
    this.stepper = f.stepper;
    this.debugMode = f.debugMode;
    this.formControls = f.controls.sort((a, b) => a.order - b.order);
    this.initGroups();
    this.formGroup = this.qcs.toFormGroup(this.formControls);
  }
}
