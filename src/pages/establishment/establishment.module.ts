import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { EstablishmentListPage }                from './establishment-list/establishment-list';
import { EstablishmentDetailsPage }             from './establishment-details/establishment-details';
import { EstablishmentSearchPage }              from './establishment-search/establishment-search';

import { EstablishmentResource }                from './establishment.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(EstablishmentListPage),
    IonicModule.forRoot(EstablishmentDetailsPage),
    IonicModule.forRoot(EstablishmentSearchPage),
  ],
  declarations: [
    EstablishmentListPage,
    EstablishmentDetailsPage,
    EstablishmentSearchPage
  ],
  exports: [
    EstablishmentListPage,
    EstablishmentDetailsPage,
    EstablishmentSearchPage
  ]
})
export class EstablishmentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : EstablishmentModule,
      providers : [
        EstablishmentResource
      ]
    };
  }
}
