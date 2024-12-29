import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ToursComponent } from '../tours/tours.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ToursComponent}
    ])],
    exports: [RouterModule]
})
export class ToursRoutingModule { }
