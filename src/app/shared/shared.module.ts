import { NgModule } from '@angular/core';

// Pipes

// Directives
import { SortDirective } from './directives';

@NgModule({
  declarations: [SortDirective],
  exports: [SortDirective],
})
export class SharedModule {}
