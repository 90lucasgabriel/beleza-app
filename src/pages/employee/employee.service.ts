import { Injectable }        from '@angular/core';
import 'rxjs/add/operator/map';

import { QueryInput }        from '../../common/models/query-input';
import { Employee }          from './employee.model';
import { EmployeeResource }  from './employee.resource';


@Injectable()
export class EmployeeService {
  private employee  : Employee;
  private employees : Array<Employee>;
  constructor(private employeeRes: EmployeeResource) {}

  public query(queryInput: QueryInput): Promise<Array<Employee>>{
    return new Promise( resolve => {
      this.employeeRes.query(queryInput).$observable
        .subscribe( data => {
          this.employees = data;
          resolve(this.employees);
        })
    });
  }

  public queryEmployeesByBranchAndJob(page: number, branchId: number, jobId: number): Promise<Array<Employee>>{
    return new Promise( resolve => {
      this.employeeRes.queryEmployeesByBranchAndJob({page: page, branchId: branchId, jobId: jobId}).$observable
        .subscribe( data => {
          this.employees = data;
          resolve(this.employees);
        })
    });
  }

  public queryEmployeesByBranchJob(page: number, branchJobId: number): Promise<Array<Employee>>{
    return new Promise( resolve => {
      this.employeeRes.queryEmployeesByBranchJob({page, branchJobId}).$observable
        .subscribe( data => {
          this.employees = data;
          resolve(this.employees);
        })
    });
  }

}
