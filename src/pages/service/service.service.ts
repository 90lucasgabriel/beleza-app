import { Injectable }        from '@angular/core';
import 'rxjs/add/operator/map';

import { QueryInput }        from '../../common/models/query-input';
import { Service }           from './service.model';
import { ServiceResource }   from './service.resource';


@Injectable()
export class ServiceService {
  private service  : Service;
  private services : Array<Service>;
  constructor(private serviceRes: ServiceResource) {}

  public query(queryInput: QueryInput): Promise<Array<Service>>{
    return new Promise( resolve => {
      this.serviceRes.query(queryInput).$observable
        .subscribe( data => {
          this.services = data;
          resolve(this.services);
        })
    });
  }

  public get(id): Promise<Service>{
    return new Promise( resolve => {
      this.serviceRes.get(id).$observable
      .subscribe( data => {
        this.service = data;
        resolve(this.service);
      })
    });
  }

  public search(data): Promise<Array<Service>>{
    return new Promise( resolve => {
      this.serviceRes.search(data).$observable
        .subscribe( data => {
          this.services = data;
          resolve(this.services);
        })
    });
  }


}

export const SERVICE: Array<any> = [ServiceResource, ServiceService];