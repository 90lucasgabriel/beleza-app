import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { BranchHomePage }                from './branch-home/branch-home';
import { BranchListPage }                from './branch-list/branch-list';
import { BranchDetailsPage }             from './branch-details/branch-details';
import { BranchSearchPage }              from './branch-search/branch-search';

import { BranchResource }                from './branch.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(BranchHomePage),
    IonicModule.forRoot(BranchListPage),
    IonicModule.forRoot(BranchDetailsPage),
    IonicModule.forRoot(BranchSearchPage),
  ],
  declarations: [
    BranchHomePage,
    BranchListPage,
    BranchDetailsPage,
    BranchSearchPage
  ],
  exports: [
    BranchHomePage,
    BranchListPage,
    BranchDetailsPage,
    BranchSearchPage
  ]
})
export class BranchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : BranchModule,
      providers : [
        BranchResource
      ]
    };
  }
}
