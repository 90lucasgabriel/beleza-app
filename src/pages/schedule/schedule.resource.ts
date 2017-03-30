import { Injectable, Injector }     from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod }            from '@angular/http';
import { Observable }               from 'rxjs';

import { AppConfig }                from '../../app/app.config';
import { Schedule }                 from './schedule.model';
import { AuthGuardResource }        from '../../common/services/auth-guard-resource';



@Injectable()
@ResourceParams({
  add2Provides : false,
  url          : AppConfig.BASE_URL + 'api/schedules'
})
export class ScheduleResource extends AuthGuardResource {
  //private grant_type : string = 'password';

  constructor(
    public http           : Http, 
    public injector       : Injector){
    super(http, injector);
  }

  //DEFAULT ---------------------------------------------------------
  @ResourceAction({
    path: '/{!id}',
    params: {'include': 'images'}
  })
  get: ResourceMethod<{id: number}, Schedule>;

  @ResourceAction({
    url: AppConfig.BASE_URL + 'api/schedule',
    auth: true,
    noPresenter: true
  })
  schedule: ResourceMethod<{}, Schedule>;


  @ResourceAction({
      method       : RequestMethod.Post,

    }
  )
  register: ResourceMethod<Schedule, Schedule>;
  


  //CUSTOM ----------------------------------------------------------
  @ResourceAction({
    path: '/find-local-by-token/{!social}/{!token}'
  })
  findLocalByToken: ResourceMethod<{social: string, token: string}, Schedule>;

  @ResourceAction({
    path: '/find-social-by-token/{!social}/{!token}'
  })
  findSocialByToken: ResourceMethod<{social: string, token: string}, any>;


  @ResourceAction({
      method       : RequestMethod.Post,
      url          : AppConfig.BASE_URL + "api/oauth/token",
      data         : {
        client_id     : 'd24d6167e707c17d32d2776d77822aaa',
        client_secret : 'a12fd0b68d342918910b8750650d6dce',
        grant_type    : "password"
      },
      noPresenter: true
    }
  )
  login: ResourceMethod<Schedule, any>;

}
