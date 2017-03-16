import { Injectable }              from '@angular/core';
import 'rxjs/add/operator/map';

import { QueryInput }              from '../../common/models/query-input';
import { Establishment }           from './establishment.model';
import { EstablishmentResource }   from './establishment.resource';


@Injectable()
export class EstablishmentService {
  private establishment  : Establishment;
  private establishments : Array<Establishment>;
  constructor(private establishmentRes: EstablishmentResource) {}

  public query(queryInput: QueryInput): Promise<Array<Establishment>>{
    return new Promise( resolve => {
      this.establishmentRes.query(queryInput).$observable
        .subscribe( data => {
          this.establishments = data;
          resolve(this.establishments);
        })
    });
  }

  public get(id): Promise<Establishment>{
    return new Promise( resolve => {
      this.establishmentRes.get(id).$observable
      .subscribe( data => {
        this.establishment = data;
        resolve(this.establishment);
      })
    });
  }

  public search(data): Promise<Array<Establishment>>{
    return new Promise( resolve => {
      this.establishmentRes.search(data).$observable
        .subscribe( data => {
          this.establishments = data;
          resolve(this.establishments);
        })
    });
  }


}