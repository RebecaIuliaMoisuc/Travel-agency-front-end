import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ContinentsComponent } from '../continents/continents.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ContinentsComponent }
    ])],
    exports: [RouterModule]
})
export class ContinentsRoutingModule { }
