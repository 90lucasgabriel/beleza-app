import { NavController, ViewController, Events, Content }  from 'ionic-angular';
import { Component, ViewChild, ElementRef }                    from '@angular/core';
import { StatusBar } from 'ionic-native';

import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker} from 'ionic-native';

/*
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
*/
import { QueryInput }          from '../../../common/models/query-input';
import { Branch }              from '../branch.model';
import { BranchService }       from '../branch.service';

import { BranchDetailsPage }   from '../branch-details/branch-details';
import { BranchSearchPage }    from '../branch-search/branch-search';
import { OrderCreatePage }     from '../../order/order-create/order-create';
import { LocalStorage }        from '../../../common/services/local-storage';


@Component({
  selector    : 'page-branch-list',
  templateUrl : 'branch-list.html',
  providers   : [BranchService]
})
export class BranchListPage {
  @ViewChild(Content)       content     : Content;
  @ViewChild('contentList') contentList : ElementRef;


  public color = 'primary';
  public facebook = '';
  public  branches    : Array<Branch>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = true;

 //map: GoogleMap;

  /*public branches = [
    {id: 1, description: 'Branch 1'},
    {id: 2, description: 'Branch 2'},
    {id: 3, description: 'Branch 3'},
    {id: 4, description: 'Branch 4'},
    {id: 5, description: 'Branch 5'},
    {id: 6, description: 'Branch 6'},
    {id: 7, description: 'Branch 7'},
    {id: 8, description: 'Branch 8'},
    {id: 9, description: 'Branch 9'},
    {id: 10, description: 'Branch 10'},
    {id: 11, description: 'Branch 11'},
    {id: 12, description: 'Branch 12'},
    {id: 13, description: 'Branch 13'},
    {id: 14, description: 'Branch 14'},
    {id: 15, description: 'Branch 15'},
    {id: 16, description: 'Branch 16'},
    {id: 17, description: 'Branch 17'},
    {id: 18, description: 'Branch 18'},
    {id: 19, description: 'Branch 19'},
    {id: 20, description: 'Branch 20'},
    {id: 21, description: 'Branch 21'},
    {id: 22, description: 'Branch 22'},
    {id: 23, description: 'Branch 23'},
    {id: 24, description: 'Branch 24'},
    {id: 25, description: 'Branch 25'},
    {id: 26, description: 'Branch 26'},
    {id: 27, description: 'Branch 27'},
    {id: 28, description: 'Branch 28'},
    {id: 29, description: 'Branch 29'},
    {id: 30, description: 'Branch 30'}
    
  ];
  */

  constructor(
    public  events         : Events,
    public  navCtrl        : NavController,
    public  viewCtrl       : ViewController,
    private $branch        : BranchService,
    private $localStorage  : LocalStorage) {

    //this.loadMap();
    this.query();
  }



  public query(): void{
    this.queryInput.page = 1;
    this.branches        = null;

    this.$branch.query(this.queryInput).then(
      data => {
        this.branches    = <Array<Branch>> data;
        this.showSpinner = false;
      });
  }


  //GOOGLE MAPS ---------------------------------------------------------

    public loadMap() {
   // make sure to create following structure in your view.html file
   // and add a height (for example 100%) to it, else the map won't be visible
   // <ion-content>
   //  <div #map id="map" style="height:100%;"></div>
   // </ion-content>

   // create a new map by passing HTMLElement
   let element: HTMLElement = document.getElementById('map');

   let map = new GoogleMap(element);

   // create LatLng object
   let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);

   // create CameraPosition
   let position: CameraPosition = {
     target: ionic,
     zoom: 18,
     tilt: 30
   };

   // listen to MAP_READY event
   map.one(GoogleMapsEvent.MAP_READY).then(() => {
     // move the map's camera to position
     map.moveCamera(position); // works on iOS and Android
  });


   // create new marker
   let markerOptions: GoogleMapsMarkerOptions = {
     position: ionic,
     title: 'Ionic'
   };

   map.addMarker(markerOptions)
     .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });

}

/*
loadMap(){
 
        let location = new GoogleMapsLatLng(-34.9290,138.6010);
 
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
 
    }
*/

  //COMPONENTS ----------------------------------------------------------
  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public doInfinite(infiniteScroll): void{
    this.queryInput.page = this.queryInput.page + 1;

    this.$branch.query(this.queryInput).then(
      data => {
        this.branches = this.branches.concat(<Array<Branch>> data);
        infiniteScroll.complete();
      }
    );    
  }









  //NAV ----------------------------------------------------
  public goBranchDetails(branchId: number): void{
    this.navCtrl.push(BranchDetailsPage, {id: branchId});
  }

  public goOrderCreate(branchId: number): void{
    this.navCtrl.push(OrderCreatePage, {id: branchId});
  }


  public goBranchSearch(): void{
    this.navCtrl.push(BranchSearchPage, {});
  }






  //VIEW ------------------------------------------------------
  public ionViewWillLeave(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }

  public ionViewDidEnter(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }

}
