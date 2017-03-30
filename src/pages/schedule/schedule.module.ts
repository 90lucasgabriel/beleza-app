import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { ScheduleListPage }                  from './schedule-list/schedule-list';
import { ScheduleCreatePage }                from './schedule-create/schedule-create';

import { ScheduleResource }                  from './schedule.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(ScheduleListPage),
    IonicModule.forRoot(ScheduleCreatePage)
  ],
  declarations: [
    ScheduleListPage,
    ScheduleCreatePage
  ],
  exports: [
    ScheduleListPage,
    ScheduleCreatePage
  ]
})
export class ScheduleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : ScheduleModule,
      providers : [
        ScheduleResource
      ]
    };
  }
}
