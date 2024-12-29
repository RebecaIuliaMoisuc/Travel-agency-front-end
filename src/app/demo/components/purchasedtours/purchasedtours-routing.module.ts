import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import{PurchasedToursComponent } from '../purchasedtours/purchasedtours.component';
@NgModule({
    imports: [RouterModule.forChild([
     { path: '', component: PurchasedToursComponent}
    ])],
    exports: [RouterModule]
})
export class PurchasedtoursComponentRoutingModule { }
