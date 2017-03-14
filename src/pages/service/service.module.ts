import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { ServiceListPage }                from './service-list/service-list';
import { ServiceDetailsPage }             from './service-details/service-details';
import { ServiceSearchPage }              from './service-search/service-search';

import { ServiceResource }                from './service.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(ServiceListPage),
    IonicModule.forRoot(ServiceDetailsPage),
    IonicModule.forRoot(ServiceSearchPage),
  ],
  declarations: [
    ServiceListPage,
    ServiceDetailsPage,
    ServiceSearchPage
  ],
  exports: [
    ServiceListPage,
    ServiceDetailsPage,
    ServiceSearchPage
  ]
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : ServiceModule,
      providers : [
        ServiceResource
      ]
    };
  }
}
