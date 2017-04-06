import { Injectable, Injector }     from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Observable }               from 'rxjs';

import { AppConfig }                from '../../app/app.config';
import { QueryInput }               from '../../common/models/query-input';
import { Job }                      from './job.model';

import { AuthGuardResource }        from '../../common/services/auth-guard-resource';

@Injectable()
@ResourceParams({
  add2Provides : false,
  url          : AppConfig.BASE_URL + 'api/client/jobs'
})
export class JobResource extends AuthGuardResource {

  constructor(http: Http, injector: Injector){
    super(http, injector);
  }

  @ResourceAction({
    isArray: true,
    params: {'include': 'images'}
  })
  query: ResourceMethod<QueryInput, Array<Job>>;

  @ResourceAction({
    isArray: true,
    path: '/by-branch/{!branchId}',
    params: {'include': 'job'}
  })
  queryJobsByBranch: ResourceMethod<{page: number, branchId: number}, Array<any>>;

  @ResourceAction({
    path: '/{!id}',
    params: {'include': 'images'}
  })
  get: ResourceMethod<{id: number}, Job>;

  @ResourceAction({
    isArray: true,
    path: '/search/{!data}',
    params: {'include': 'images'}
  })
  search: ResourceMethod<{data: string}, Array<Job>>;
}
