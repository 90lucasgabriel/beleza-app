import { Injectable }        from '@angular/core';
import 'rxjs/add/operator/map';

import { QueryInput }        from '../../common/models/query-input';
import { Job }               from './job.model';
import { JobResource }       from './job.resource';


@Injectable()
export class JobService {
  private job  : Job;
  private jobs : Array<Job>;
  constructor(private jobRes: JobResource) {}

  public query(queryInput: QueryInput): Promise<Array<Job>>{
    return new Promise( resolve => {
      this.jobRes.query(queryInput).$observable
        .subscribe( data => {
          this.jobs = data;
          resolve(this.jobs);
        })
    });
  }

  public queryJobsByBranch(page: number, branchId: number): Promise<Array<Job>>{
    return new Promise( resolve => {
      this.jobRes.queryJobsByBranch({page, branchId}).$observable
        .subscribe( data => {
          this.jobs = data;
          resolve(this.jobs);
        })
    });
  }
  public get(id): Promise<Job>{
    return new Promise( resolve => {
      this.jobRes.get(id).$observable
      .subscribe( data => {
        this.job = data;
        resolve(this.job);
      })
    });
  }

  public search(data): Promise<Array<Job>>{
    return new Promise( resolve => {
      this.jobRes.search(data).$observable
        .subscribe( data => {
          this.jobs = data;
          resolve(this.jobs);
        })
    });
  }


}
