import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[numberOnly]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberOnlyDirective,
      multi: true,
    },
  ],
})
export class NumberOnlyDirective implements ControlValueAccessor {
  onChange: any;
  onTouched: any;

  constructor(private el: ElementRef) {}

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    let value = $event.target.value;
    value = value.replace(/[\D]/g, '');
    $event.target.value = value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value ? value : '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
