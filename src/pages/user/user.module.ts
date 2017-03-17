import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { UserLoginPage }                  from './user-login/user-login';
import { UserListPage }                   from './user-list/user-list';

import { UserResource }                   from './user.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(UserLoginPage),
    IonicModule.forRoot(UserListPage)
  ],
  declarations: [
    UserLoginPage,
    UserListPage
  ],
  exports: [
    UserLoginPage,
    UserListPage
  ]
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : UserModule,
      providers : [
        UserResource
      ]
    };
  }
}
