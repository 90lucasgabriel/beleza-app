import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { HomeClientPage }                from './home-client/home-client';

@NgModule({
  imports:      [
    IonicModule.forRoot(HomeClientPage)
  ],
  declarations: [
    HomeClientPage
  ],
  exports: [
    HomeClientPage
  ]
})
export class HomeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : HomeModule,
      providers : [

      ]
    };
  }
}
