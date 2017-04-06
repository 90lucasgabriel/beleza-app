import { Component, ViewChild } 		            from '@angular/core';
import { NavController, ViewController, NavParams } 	          from 'ionic-angular';
import { StatusBar }                from 'ionic-native';


import { QueryInput }               from '../../../common/models/query-input';
import { Employee }                 from '../employee.model';
import { EmployeeService }          from '../employee.service';

import { LocalStorage }             from '../../../common/services/local-storage';


@Component({
  selector    : 'page-employee-list',
  templateUrl : 'employee-list.html',
  providers   : [EmployeeService]
})
export class EmployeeListPage {
  @ViewChild('searchbar') searchbar;

  public facebook = '';
  //public  employees    : Array<Employee>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner      = true;
  public employees        = [];
  public branchId         : number;
  public jobId            : number;
  public branchJobId      : number;

  constructor(
    public  navCtrl       : NavController,
    private navParams     : NavParams,
    public  viewCtrl      : ViewController,
    private $employee     : EmployeeService,
    private $localStorage : LocalStorage) {

    this.branchId         = this.navParams.get('branchId');
    this.jobId            = this.navParams.get('jobId');
    this.branchJobId      = this.navParams.get('branchJobId');
    this.queryEmployeesByBranchAndJob();
  }




  public query(): void{
    this.queryInput.page = 1;
    this.employees        = null;

    this.$employee.query(this.queryInput).then(
      data => {
        this.employees    = <Array<any>> data;
        this.showSpinner = false;
      });
  }


  public queryEmployeesByBranchAndJob(): void{
    this.queryInput.page = 1;
    this.employees       = null;
    console.log('job', this.jobId);
    this.$employee.queryEmployeesByBranchAndJob(this.queryInput.page, this.branchId, this.jobId).then(
      data => {
        this.employees    = <Array<any>> data;
        this.showSpinner = false;
      });
  }

  public queryEmployeesByBranchJob(): void{
    this.queryInput.page = 1;
    this.employees        = null;

    this.$employee.queryEmployeesByBranchJob(this.queryInput.page, this.branchJobId).then(
      data => {
        this.employees    = <Array<any>> data;
        this.showSpinner = false;
      });
  }




  //COMPONENTS ----------------------------------------------------------
  public dismiss(employeeId?: number) {
    this.viewCtrl.dismiss({employeeId: employeeId});
  }



  //NAV ----------------------------------------------------
   



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
