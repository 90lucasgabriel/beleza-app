import { Component, ViewChild } 	  from '@angular/core';
import { NavController, ViewController }            from 'ionic-angular';
import { StatusBar }                from 'ionic-native';

import { QueryInput }               from '../../../common/models/query-input';
import { Branch }                   from '../branch.model';
import { BranchService }            from '../branch.service';

import { BranchDetailsPage }        from '../branch-details/branch-details';


@Component({
  selector    : 'page-branch-search',
  templateUrl : 'branch-search.html',
  providers   : [BranchService]
})
export class BranchSearchPage {
  @ViewChild('searchbar') searchbar;

  public  branches   : Array<Branch>;
  public  originalServices : Array<Branch>;
  public  queryInput       : QueryInput     = {
    page: 1
  };
  public picture     = null;
  public showSpinner = true;

  constructor(
    public  viewCtrl : ViewController,
    public  navCtrl  : NavController,
    private $branch  : BranchService) {
  }


  //FUNCTIONS --------------------------------------
  public query(): void{
    this.queryInput.page = 1;
    this.branches        = null;

  }
  
  public search(searchEvent): void {
    this.showSpinner    = true;
    let term            = searchEvent.target.value;
    let params : Object = {
      include    : 'images',
      data       : term
    }

    if (term.trim() === '' || term.trim().length < 3) {
      this.branches = this.originalServices;
    } else {
      this.$branch.search(params).then(
      data => {
        this.branches    = <Array<Branch>> data;
        this.showSpinner = false;
      });
    }
  }







  //COMPONENTS ----------------------------------------
  public doInfinite(infiniteScroll): void {
  	this.queryInput.page = this.queryInput.page + 1;

  	this.$branch.query(this.queryInput).then(
  		data => {
  			this.branches = this.branches.concat(<Array<Branch>> data);
  			infiniteScroll.complete();
  		}
    );  	
  }






  //NAV ----------------------------------------------------
  public goServiceDetails(branchId: number): void{
    this.navCtrl.push(BranchDetailsPage, {id: branchId});
  }

  public dismiss():void {
    this.viewCtrl.dismiss();
  }








  //VIEW ------------------------------------------------------
  public ionViewWillEnter(){
    StatusBar.backgroundColorByHexString('#CCC');
  }

  public ionViewDidEnter(){
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 150);   
  }

  public ionViewWillLeave(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }


  
}
