import { ElementRef } from '@angular/core';
import { SortDirective } from './sort.directive';

describe('SortDirective', () => {
  it('should create an instance', () => {
    let targetElement: ElementRef = new ElementRef("");
    const directive = new SortDirective(targetElement);
    expect(directive).toBeTruthy();
  });
});
