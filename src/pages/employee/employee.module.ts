import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { EmployeeListPage }               from './employee-list/employee-list';

import { EmployeeResource }               from './employee.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(EmployeeListPage)
  ],
  declarations: [
    EmployeeListPage
  ],
  exports: [
    EmployeeListPage
  ]
})
export class EmployeeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : EmployeeModule,
      providers : [
        EmployeeResource
      ]
    };
  }
}
