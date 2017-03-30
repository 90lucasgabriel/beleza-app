import { Injectable, Injector }     from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Observable }               from 'rxjs';

import { AppConfig }                from '../../app/app.config';
import { QueryInput }               from '../../common/models/query-input';
import { Branch }            from './branch.model';

import { AuthGuardResource }        from '../../common/services/auth-guard-resource';

@Injectable()
@ResourceParams({
  add2Provides : false,
  url          : AppConfig.BASE_URL + 'api/client/branches'
})
export class BranchResource extends AuthGuardResource {

  constructor(http: Http, injector: Injector){
    super(http, injector);
  }

  @ResourceAction({
    isArray: true,
  })
  query: ResourceMethod<QueryInput, Array<Branch>>;

  @ResourceAction({
    path: '/{!id}',
    params: {'include': 'images'}
  })
  get: ResourceMethod<{id: number}, Branch>;

  @ResourceAction({
    isArray: true,
    path: '/search/{!data}',
    params: {'include': 'images'}
  })
  search: ResourceMethod<{data: string}, Array<Branch>>;


  // FAVORITES ----------------------------------------------
  @ResourceAction({
    path: '/favorites/{!userId}',
  })
  queryFavoritesByUser: ResourceMethod<{page: number, userId: number}, Array<Branch>>; 
}
