import { Component, ViewChild } 		            from '@angular/core';
import { NavController, ViewController, NavParams } 	          from 'ionic-angular';
import { StatusBar }                from 'ionic-native';


import { QueryInput }               from '../../../common/models/query-input';
import { Job }                      from '../job.model';
import { JobService }               from '../job.service';

import { JobDetailsPage }           from '../job-details/job-details';
import { JobSearchPage }            from '../job-search/job-search';
import { LocalStorage }             from '../../../common/services/local-storage';


@Component({
  selector    : 'page-job-list',
  templateUrl : 'job-list.html',
  providers   : [JobService]
})
export class JobListPage {
  @ViewChild('searchbar') searchbar;

  public facebook = '';
  //public  branchJobs    : Array<Job>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner: boolean = true;
  public branchJobs = [];
  public branchId: number;
  constructor(
    public  navCtrl       : NavController,
    private navParams     : NavParams,
    public  viewCtrl      : ViewController,
    private $job          : JobService,
    private $localStorage : LocalStorage) {


    this.branchId      = this.navParams.get('branchId');
    this.query();
  }




  public query(): void{
    this.queryInput.page = 1;
    this.branchJobs        = null;

    this.$job.queryJobsByBranch(this.queryInput.page, this.branchId).then(
      data => {
        this.branchJobs    = <Array<any>> data;
        this.showSpinner = false;
      });
  }




  //COMPONENTS ----------------------------------------------------------
  public dismiss(id?: number) {
    this.viewCtrl.dismiss(id);
  }



  //NAV ----------------------------------------------------
  public goJobDetails(serviceId: number): void{
    this.navCtrl.push(JobDetailsPage, {id: serviceId});
  }

  public goJobSearch(): void{
    this.navCtrl.push(JobSearchPage, {});
  }





  //VIEW ------------------------------------------------------
  public ionViewWillEnter(){
    StatusBar.backgroundColorByHexString('#CCC');
  }

  public ionViewDidEnter(){
    /*setTimeout(() => {
      this.searchbar.setFocus();
    }, 150);   */
  }

  public ionViewWillLeave(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }


}
