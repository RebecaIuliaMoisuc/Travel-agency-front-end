import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PackagesComponent } from './packages.component';
@NgModule({
    imports: [RouterModule.forChild([
     { path: '', component: PackagesComponent}
    ])],
    exports: [RouterModule]
})
export class PackagesComponentRoutingModule { }
