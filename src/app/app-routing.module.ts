import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'continents', loadChildren: () => import('./demo/components/continents/continets.module').then(m => m.ContinentsModule) },
                    { path: 'countries', loadChildren: () => import('./demo/components/countries/countries-routing.module').then(m => m.CountriesRoutingModule) },
                    { path: 'cities', loadChildren: () => import('./demo/components/cities/cities-routing.module').then(m => m.CitiesRoutingModule) },
                    { path: 'airports', loadChildren: () => import('./demo/components/airports/airports-routing.module').then(m => m.AirportsRoutingModule) },
                    { path: 'hotels', loadChildren: () => import('./demo/components/hotels/hotels-routing.module').then(m => m.HotelsRoutingModule) },
                    { path: 'tours', loadChildren: () => import('./demo/components/tours/tours-routing.module').then(m => m.ToursRoutingModule) },
                    { path: 'purchasedtours', loadChildren: () => import('./demo/components/purchasedtours/purchasedtours-routing.module').then(m => m.PurchasedtoursComponentRoutingModule) },
                    { path: 'packages', loadChildren: () => import('./demo/components/packages/packages-routing.module').then(m => m.PackagesComponentRoutingModule) },

                ]
                
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
