import { Component, ViewChild } 	  from '@angular/core';
import { NavController }            from 'ionic-angular';

import { QueryInput }               from '../../../common/models/query-input';
import { Establishment }            from '../establishment.model';
import { EstablishmentService }      from '../establishment.service';

import { EstablishmentDetailsPage }  from '../establishment-details/establishment-details';


@Component({
  selector    : 'page-establishment-search',
  templateUrl : 'establishment-search.html',
  providers   : [EstablishmentService]
})
export class EstablishmentSearchPage {
  @ViewChild('searchbar') myInput;

  public  establishments   : Array<Establishment>;
  public  originalServices : Array<Establishment>;
  public  queryInput       : QueryInput     = {
    page: 1
  };
  public picture     = null;
  public showSpinner = true;

  constructor(
  	public  navCtrl        : NavController,
  	private $establishment : EstablishmentService) {
  }


  //FUNCTIONS --------------------------------------
  public query(): void{
    this.queryInput.page = 1;
    this.establishments        = null;

  }
  
  public search(searchEvent): void {
    this.showSpinner    = true;
    let term            = searchEvent.target.value;
    let params : Object = {
      include    : 'images',
      data       : term
    }

    if (term.trim() === '' || term.trim().length < 3) {
      this.establishments = this.originalServices;
    } else {
      this.$establishment.search(params).then(
      data => {
        this.establishments    = <Array<Establishment>> data;
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

  	this.$establishment.query(this.queryInput).then(
  		data => {
  			this.establishments = this.establishments.concat(<Array<Establishment>> data);
  			infiniteScroll.complete();
  		}
    );  	
  }






  //NAV ----------------------------------------------------
  public goServiceDetails(establishmentId: number): void{
    this.navCtrl.push(EstablishmentDetailsPage, {id: establishmentId});
  }

}
