import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { JobListPage }                from './job-list/job-list';
import { JobDetailsPage }             from './job-details/job-details';
import { JobSearchPage }              from './job-search/job-search';

import { JobResource }                from './job.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(JobListPage),
    IonicModule.forRoot(JobDetailsPage),
    IonicModule.forRoot(JobSearchPage),
  ],
  declarations: [
    JobListPage,
    JobDetailsPage,
    JobSearchPage
  ],
  exports: [
    JobListPage,
    JobDetailsPage,
    JobSearchPage
  ]
})
export class JobModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : JobModule,
      providers : [
        JobResource
      ]
    };
  }
}
