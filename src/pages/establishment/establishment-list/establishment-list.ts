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
import { QueryInput }                 from '../../../common/models/query-input';
import { Establishment }              from '../establishment.model';
import { EstablishmentService }       from '../establishment.service';

import { EstablishmentDetailsPage }   from '../establishment-details/establishment-details';
import { EstablishmentSearchPage }    from '../establishment-search/establishment-search';
import { OrderWorkflowPage }          from '../../order/order-workflow/order-workflow';
import { LocalStorage }               from '../../../common/services/local-storage';


@Component({
  selector    : 'page-establishment-list',
  templateUrl : 'establishment-list.html',
  providers   : [EstablishmentService]
})
export class EstablishmentListPage {
  @ViewChild(Content)       content     : Content;
  @ViewChild('contentList') contentList : ElementRef;


  public color = 'primary';
  public facebook = '';
  public  establishments    : Array<Establishment>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = true;

 //map: GoogleMap;

  /*public establishments = [
    {id: 1, description: 'Establishment 1'},
    {id: 2, description: 'Establishment 2'},
    {id: 3, description: 'Establishment 3'},
    {id: 4, description: 'Establishment 4'},
    {id: 5, description: 'Establishment 5'},
    {id: 6, description: 'Establishment 6'},
    {id: 7, description: 'Establishment 7'},
    {id: 8, description: 'Establishment 8'},
    {id: 9, description: 'Establishment 9'},
    {id: 10, description: 'Establishment 10'},
    {id: 11, description: 'Establishment 11'},
    {id: 12, description: 'Establishment 12'},
    {id: 13, description: 'Establishment 13'},
    {id: 14, description: 'Establishment 14'},
    {id: 15, description: 'Establishment 15'},
    {id: 16, description: 'Establishment 16'},
    {id: 17, description: 'Establishment 17'},
    {id: 18, description: 'Establishment 18'},
    {id: 19, description: 'Establishment 19'},
    {id: 20, description: 'Establishment 20'},
    {id: 21, description: 'Establishment 21'},
    {id: 22, description: 'Establishment 22'},
    {id: 23, description: 'Establishment 23'},
    {id: 24, description: 'Establishment 24'},
    {id: 25, description: 'Establishment 25'},
    {id: 26, description: 'Establishment 26'},
    {id: 27, description: 'Establishment 27'},
    {id: 28, description: 'Establishment 28'},
    {id: 29, description: 'Establishment 29'},
    {id: 30, description: 'Establishment 30'}
    
  ];
  */

  constructor(
    public  events         : Events,
    public  navCtrl        : NavController,
    public  viewCtrl       : ViewController,
    private $establishment : EstablishmentService,
    private $localStorage  : LocalStorage) {

    //this.loadMap();
    this.query();
  }



  public query(): void{
    this.queryInput.page = 1;
    this.establishments        = null;

    this.$establishment.query(this.queryInput).then(
      data => {
        this.establishments    = <Array<Establishment>> data;
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



  //NAV ----------------------------------------------------
  public goEstablishmentDetails(establishmentId: number): void{
    this.navCtrl.push(EstablishmentDetailsPage, {id: establishmentId});
  }

  public goOrderWorkflow(establishmentId: number): void{
    this.navCtrl.push(OrderWorkflowPage, {id: establishmentId});
  }


  public goEstablishmentSearch(): void{
    this.navCtrl.push(EstablishmentSearchPage, {});
  }







  // OTHERS -------------------------------------------------
  public verifyScroll(){
    let header  = 56;
    let content = this.contentList.nativeElement.offsetTop;
    
    if(this.content.scrollTop.valueOf() - content > 0) {
      this.color = 'dark';
      StatusBar.backgroundColorByHexString('#111');
    }
    else{
      this.color = 'primary';
      StatusBar.backgroundColorByHexString('#a01b1b');
    }
  }

}
