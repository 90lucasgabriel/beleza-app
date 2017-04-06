import { Injectable, Injector }     from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Observable }               from 'rxjs';

import { AppConfig }                from '../../app/app.config';
import { QueryInput }               from '../../common/models/query-input';
import { Employee }                 from './employee.model';

import { AuthGuardResource }        from '../../common/services/auth-guard-resource';

@Injectable()
@ResourceParams({
  add2Provides : false,
  url          : AppConfig.BASE_URL + 'api/client/employees'
})
export class EmployeeResource extends AuthGuardResource {

  constructor(http: Http, injector: Injector){
    super(http, injector);
  }

  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<QueryInput, Array<Employee>>;

  @ResourceAction({
    isArray: true,
    path: '/branch/{!branchId}/job/{!jobId}'
  })
  queryEmployeesByBranchAndJob: ResourceMethod<{page: number, branchId: number, jobId: number}, Array<any>>;

  @ResourceAction({
    isArray: true,
    path: '/by-branch-job/{!branchJobId}'
  })
  queryEmployeesByBranchJob: ResourceMethod<{page: number, branchJobId: number}, Array<any>>;

}
