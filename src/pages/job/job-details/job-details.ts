import { Component } 					        from '@angular/core';
import { NavController, NavParams } 	from 'ionic-angular';

import { Job }                  	    from '../job.model';
import { JobService }  	              from '../job.service';

@Component({
  selector    : 'page-job-details',
  templateUrl : 'job-details.html',
  providers   : [JobService]
})
export class JobDetailsPage {
  public id         : number;
  public job        : Job; 
  public showSpinner: boolean = true;
  public pictures   : Array<Object>;

  constructor(
  public  navCtrl   : NavController,
  private navParams : NavParams,
  private $job      : JobService) {

  	this.id = navParams.get('id');
  	this.get(this.id);
  }  



  public get(id: number): void{
    let params : Object = {
      include : 'images',
      id      : id
    }

    this.$job.get(params).then(
      data => {
        this.job     = <Job> data;
        this.pictures    = this.job.images.data;
        this.showSpinner = false;
      });
    
  }





  // COMPONENTS -------------------------------------------


}
