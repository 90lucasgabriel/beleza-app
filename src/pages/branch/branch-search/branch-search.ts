import { Component, ViewChild } 	  from '@angular/core';
import { NavController }            from 'ionic-angular';

import { QueryInput }               from '../../../common/models/query-input';
import { Branch }            from '../branch.model';
import { BranchService }      from '../branch.service';

import { BranchDetailsPage }  from '../branch-details/branch-details';


@Component({
  selector    : 'page-branch-search',
  templateUrl : 'branch-search.html',
  providers   : [BranchService]
})
export class BranchSearchPage {
  @ViewChild('searchbar') myInput;

  public  branches   : Array<Branch>;
  public  originalServices : Array<Branch>;
  public  queryInput       : QueryInput     = {
    page: 1
  };
  public picture     = null;
  public showSpinner = true;

  constructor(
  	public  navCtrl        : NavController,
  	private $branch : BranchService) {
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
  ionViewDidEnter(): void{
     setTimeout(() => {
      this.myInput.setFocus();
    }, 150);     
  }

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

}
