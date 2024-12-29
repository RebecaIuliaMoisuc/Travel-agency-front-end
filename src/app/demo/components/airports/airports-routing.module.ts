import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AirportsComponent } from '../airports/airports.component';
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AirportsComponent}
    ])],
    exports: [RouterModule]
})
export class AirportsRoutingModule { }
