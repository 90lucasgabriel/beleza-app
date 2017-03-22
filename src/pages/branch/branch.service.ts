import { Injectable }              from '@angular/core';
import 'rxjs/add/operator/map';

import { QueryInput }              from '../../common/models/query-input';
import { Branch }                  from './branch.model';
import { BranchResource }          from './branch.resource';


@Injectable()
export class BranchService {
  private branch  : Branch;
  private branches : Array<Branch>;
  constructor(private branchRes: BranchResource) {}

  public query(queryInput: QueryInput): Promise<Array<Branch>>{
    return new Promise( resolve => {
      this.branchRes.query(queryInput).$observable
        .subscribe( data => {
          this.branches = data;
          resolve(this.branches);
        })
    });
  }

  public get(id): Promise<Branch>{
    return new Promise( resolve => {
      this.branchRes.get(id).$observable
      .subscribe( data => {
        this.branch = data;
        resolve(this.branch);
      })
    });
  }

  public search(data): Promise<Array<Branch>>{
    return new Promise( resolve => {
      this.branchRes.search(data).$observable
        .subscribe( data => {
          this.branches = data;
          resolve(this.branches);
        })
    });
  }


}