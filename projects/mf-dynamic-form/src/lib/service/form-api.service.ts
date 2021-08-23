import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MfForm} from '../model/form-control-base';

@Injectable()
export class FormApi {
  patchValueSubject: Subject<{ field: string, value: any }> = new Subject<{ field: string, value: any }>();
  goToStepSubject: Subject<number> = new Subject<number>();
  patchFormSubject: Subject<MfForm> = new Subject<MfForm>();
  triggerSubmit: Subject<boolean> = new Subject<boolean>();
  editMode: Subject<boolean> = new Subject<boolean>();
  debugMode: Subject<boolean> = new Subject<boolean>();
  triggerPrintDebug: Subject<boolean> = new Subject<boolean>();

  public printDebugDataToConsole() {
    console.info('[Dynamic form] Printing debug data...');
    this.triggerPrintDebug.next(true);
  }

  public submit() {
    console.info('[Dynamic form] Submitting...');
    this.triggerSubmit.next(true);
  }

  public patchForm(form: MfForm) {
    console.info(`[Dynamic form] Patching form current configuration`);
    this.patchFormSubject.next(form);
  }

  public patchValue(field, value) {
    console.info(`[Dynamic form] Patching field ${field} with value ${value}`);
    this.patchValueSubject.next({field, value});
  }

  public goToPreviousStep() {
    console.info(`[Dynamic form] Moving to Previous step`);
    this.goToStepSubject.next(-1);
  }

  public goToNextStep() {
    console.info(`[Dynamic form] Moving to Next step`);
    this.goToStepSubject.next(1);
  }

  public enableEditMode() {
    console.info('[Dynamic form] Edit mode: ON');
    this.editMode.next(true);
  }

  public disableEditMode() {
    console.info('[Dynamic form] Edit mode: OFF');
    this.editMode.next(false);
  }

  public enableDebugMode() {
    console.info('[Dynamic form] Debug mode: ON');
    this.debugMode.next(true);
  }

  public disableDebugMode() {
    console.info('[Dynamic form] Debug mode: OFF');
    this.debugMode.next(false);
  }
}
