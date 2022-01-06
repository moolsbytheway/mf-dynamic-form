## CHANGLOG

### v0.0.1

- Initial version

### v0.1.0

- Added support for Radiobuttons

### v0.2.0

- Added support for Checkboxes
- changed peerDependency country-state-city@2.0.0 to mf-country-state-city@0.0.1

### v0.2.1

- Fix build

### v0.2.2

- Manually add city

### v0.2.3

- Fix dependency

### v0.2.4

### v0.2.5

### v0.3.0

- Internationalisation

### v0.3.1

- Fixes Internationalisation

### v0.3.2

- Fields visibility

### v0.3.3

- Bug Fixes

### v0.3.4

- Bug Fixes

### v1.0.0

- Dropped Country picker component and dependecies
- Added dynamic form control support

### v1.0.1
- Fix visibleWhen and disableWhen
- add classes to inputs
- add control buttons classes support

### v1.0.2
- Fix bug checkboxes

### v1.0.3
- Fix requiredWhen for radioButtons

### v1.1.0
- Add readOnly

### v1.1.1
- Fix readOnly

### v1.1.2
- Fix readOnly

### v1.1.3
- Fix disableWhen

### v1.1.4
- Css tweak

### v1.2.0
- add types for Text field
- fix visibleWhen, requiredWhen for DynamicFormControls

### v1.2.1
- bug fixes

### v1.3.0
- added options$ to resolve DropdownFormControl from a Promie

### v1.4.0
- in DynamicFormControl with have now access to field formValue (the whole FormGroup)

### v1.4.1
- Fix visibleWhen

### v1.4.2
- Fix dropdowns default
- add option "exportOnly" to add a hidden field

### v1.4.3
- Fix read only

### v1.4.4
- Add option "disabled"
- Fix default css

### v1.5.0
- check if a step is validated

### v1.6.0
- add on change listener for the form component

### v1.7.0
- form value is always submitted even if form is not valid

### v1.7.1
- Fix form call

### v1.8.0
- Add onChanged to dynamicFormControl

### v1.8.1
- Fix onChanged value missing

### v1.8.2
- Throw an exception if the user provide a dynamicFormComponent without putting it in customControls

### v1.8.3
- Throw an exception if the user provide a dynamicFormComponent without putting it in customControls

### v1.9.0
- Emitting event after dynamicFormControl update is now optional

### v1.9.1
- Fix

### v1.10.0
- onChange on the form itself is deprecated now
- We can now listen to changes on a specific field with an option to patch another field value from the same method onChanged(value, patchValueMethod) 
- Added a method patchValue to be able to modify form value directly from the MfDynamicForm component @ViewChild

### v1.10.1
- Fix

### v1.11.0
- add option to show empty readonly field

### v1.11.1
- try to fix dynamic component output not working sometimes

### v1.12.0
- readOnly is now an @Input of the form
- [BREAKING CHANGE] public method debug is renamed printDebugDataToConsole

### v1.12.1
- Fix undefined

### v1.12.2
- Fix 

### v1.13.0
- [BREAKING CHANGE] reverted 1.12.0
- [BREAKING CHANGE] public method debug is renamed printDebugDataToConsole


### v1.14.0
- Fix date fields not disabled


### v1.15.0
- Add FormApi service that will be emitted with formReady EventEmitter


### v1.15.1
- Fix readOnly mode

### v1.15.2
- Fix typo formReadyOnly -> formReadOnly

### v1.15.3
- Fix typo readyOnly -> readOnly

### v1.16.0
- remove inline css

### v1.17.0
- Add operator to visibleWhen

### v1.17.1
- Bug fix: DropdownComponent always selecting first value instead of given value

### v1.18.0
- Add Show All Steps feature 

### v1.19.0
- Add icon to step title

### v1.19.1
- FIX Alignment of  icon and title of step

### v1.19.2
- FIX visibleWhen with many conditions

### v1.19.3
- FIX bug options selecting null instead of empty string

### v2.0.0
- Add the logic of matcher:
  Built in matcher KeyValueConditionMatcher 
  Additional matcher exemple: https://github.com/moolsbytheway/mfx-advanced-condition-matcher 


### v2.1.0
- BREAKING CHANGE: Remove keyvalue condition matcher
- External matchers: 
  - Key-value matcher: https://github.com/moolsbytheway/mfx-key-value-matcher
  - Field value presence matcher: https://github.com/moolsbytheway/mfx-field-presence-matcher


### v2.1.1
- FIX bug options selecting null instead of empty string

### v2.1.2
- added ng-dynamic-component as whitelist dependencies (automatic installation)

### v2.2.0
- add enableWhen

### v2.3.0
- Add targetFormGroup to ConditionMatcherResult

### v2.3.1
- FIX targetForm for advancedConditionalMatcher

### v2.4.0
- Pass DynamicFormComponent to DynamicFormControlComponent
- 
### v2.5.0
- add the time zone in the date on submit or on change
- 
### v2.5.1
- fix time zone in the date

### v2.6.0
- Add exportDisabledFields in MfForm
- 
### v2.6.1
- fix date
- 
### v2.6.2
- fix date : onsubmit & onchange isodate  UTC

### v2.7.0
- Breaking changes: exportDisabledFields is now an input for the component and has value "true" by default
- add option exportHiddenFields with value "true" by default

### v2.8.0
- added method "getFormRawValue" in dynamic-form-control
- Fix: empty fields are set to null by default when exporting (onSubmit, onChange)

### v2.8.1
- Fix field visibility issue 
