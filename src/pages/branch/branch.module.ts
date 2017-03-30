import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { BranchHomePage }                from './branch-home/branch-home';
import { BranchListPage }                from './branch-list/branch-list';
import { BranchListFavoritesPage }       from './branch-list-favorites/branch-list-favorites';
import { BranchDetailsPage }             from './branch-details/branch-details';
import { BranchSearchPage }              from './branch-search/branch-search';

import { BranchResource }                from './branch.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(BranchHomePage),
    IonicModule.forRoot(BranchListPage),
    IonicModule.forRoot(BranchListFavoritesPage),
    IonicModule.forRoot(BranchDetailsPage),
    IonicModule.forRoot(BranchSearchPage),
  ],
  declarations: [
    BranchHomePage,
    BranchListPage,
    BranchListFavoritesPage,
    BranchDetailsPage,
    BranchSearchPage
  ],
  exports: [
    BranchHomePage,
    BranchListPage,
    BranchListFavoritesPage,
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
