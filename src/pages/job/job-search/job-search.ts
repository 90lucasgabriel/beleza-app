import { Component, ViewChild } 	  from '@angular/core';
import { NavController }            from 'ionic-angular';

import { QueryInput }               from '../../../common/models/query-input';
import { Job }                      from '../job.model';
import { JobService }               from '../job.service';

import { JobDetailsPage }           from '../job-details/job-details';


@Component({
  selector    : 'page-job-search',
  templateUrl : 'job-search.html',
  providers   : [JobService]
})
export class JobSearchPage {
  @ViewChild('searchbar') myInput;

  public  jobs         : Array<Job>;
  public  originalJobs : Array<Job>;
  public  queryInput   : QueryInput     = {
    page: 1
  };
  public picture     = null;
  public showSpinner = true;

  constructor(
  	public  navCtrl  : NavController,
  	private $job     : JobService) {
  }


  //FUNCTIONS --------------------------------------
  public query(): void{
    this.queryInput.page = 1;
    this.jobs            = null;

  }
  
  public search(searchEvent): void {
    this.showSpinner    = true;
    let term            = searchEvent.target.value;
    let params : Object = {
      include    : 'images',
      data       : term
    }

    if (term.trim() === '' || term.trim().length < 3) {
      this.jobs = this.originalJobs;
    } else {
      this.$job.search(params).then(
      data => {
        this.jobs    = <Array<Job>> data;
        this.showSpinner = false;
      });
    }
  }







  //COMPONENTS ----------------------------------------
  ionViewDidEnter(): void{
     setTimeout(() => {
      this.myInput.setFocus();
    }, 150);     
  }

  public doInfinite(infiniteScroll): void {
  	this.queryInput.page = this.queryInput.page + 1;

  	this.$job.query(this.queryInput).then(
  		data => {
  			this.jobs = this.jobs.concat(<Array<Job>> data);
  			infiniteScroll.complete();
  		}
    );  	
  }






  //NAV ----------------------------------------------------
  public goJobDetails(jobId: number): void{
    this.navCtrl.push(JobDetailsPage, {id: jobId});
  }

}
