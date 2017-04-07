import { Component } 		            from '@angular/core';
import { ViewController, NavController, NavParams, ModalController } 	          from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { QueryInput }               from '../../../common/models/query-input';
import { LocalStorage }             from '../../../common/services/local-storage';

import { Branch }                   from '../../branch/branch.model';
import { BranchService }            from '../../branch/branch.service';

import { JobListPage }              from '../../job/job-list/job-list';
import { EmployeeListPage }         from '../../employee/employee-list/employee-list';
import { UserListPage }             from '../../user/user-list/user-list';
 

@Component({
  selector    : 'page-schedule-create',
  templateUrl : 'schedule-create.html',
  providers   : [BranchService]
})
export class ScheduleCreatePage {
  public facebook = '';
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public id         : number;
  public branch     : Branch; 
  public isModal    : boolean;
  public showSpinner: boolean = true;
  
  public branchId;
  public jobId;
  public branchJobId;
  public employeeId;

  public job;

  constructor(
    private modalCtrl     : ModalController,
    private viewCtrl      : ViewController,
    public  navCtrl       : NavController,
    private navParams     : NavParams,
    private $branch       : BranchService,
    private $localStorage : LocalStorage) {

    this.branchId      = this.navParams.get('id');
  }




  public get(id: number): void{
    let params : Object = {
      id      : id
    }

    this.$branch.get(params).then(
      data => {
        this.branch     = <Branch> data;
        this.showSpinner = false;
      });    
  }

  







  //NAV ----------------------------------------------------
  public showJobList(branchId: number): void{
    console.log('branchId', branchId);
    let modal = this.modalCtrl.create(JobListPage, {branchId: branchId});
    modal.onDidDismiss(data => {
      this.jobId     = data;
      console.log('jobId', this.jobId);
    });
    this.jobId = modal.present(); 
  }

  public showUserProfessionalList(branchId: number, jobId?: number): void{
    let modal = this.modalCtrl.create(EmployeeListPage, {branchId: branchId, jobId: jobId});
    modal.onDidDismiss(data => {
      console.log('employeeId', this.employeeId)
      this.employeeId = data;
    });
    this.employeeId = modal.present(); 
  }

  public dismiss():void {
    this.viewCtrl.dismiss();
  }



  //VIEW ------------------------------------------------------
  public ionViewWillEnter(){
    this.isModal = this.navParams.get('isModal');
    this.get(this.branchId);

    StatusBar.backgroundColorByHexString('#a01b1b');
  }
  
  public ionViewWillLeave(){
    //StatusBar.backgroundColorByHexString('#a01b1b');
  }


}
