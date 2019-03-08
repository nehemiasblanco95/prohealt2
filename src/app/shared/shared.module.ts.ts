import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingDirective } from '../directivas/loading.directive';
import { ChangeDirective } from '../directivas/uppercase.directive';
import { NumberOnlyDirective } from '../directivas/number.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [LoadingDirective, ChangeDirective, NumberOnlyDirective],
    exports: [LoadingDirective, ChangeDirective, NumberOnlyDirective]
})
export class SharedModule { }
