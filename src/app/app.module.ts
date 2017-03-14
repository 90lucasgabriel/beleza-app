import { NgModule, ErrorHandler }     from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ResourceModule }             from 'ng2-resource-rest';
//import { CloudModule }                from '@ionic/cloud-angular';

//import { ModelsModule }               from '../common/models/models.module';
import { LocalStorage }               from '../common/services/local-storage';
import { AuthGuardResource }          from '../common/services/auth-guard-resource';
import { AccountModule }              from '../pages/account/account.module';
import { ServiceModule }              from '../pages/service/service.module';
import { UserModule }                 from '../pages/user/user.module';
import { UserService }                from '../pages/user/user.service';

import { AppConfig }                  from './app.config';
import { MyApp }                      from './app.component';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),

    ResourceModule.forRoot(),
    ServiceModule.forRoot(),
    UserModule.forRoot(),
    AccountModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    LocalStorage,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
