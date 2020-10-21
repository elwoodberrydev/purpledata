import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public products = []; //
  public destroy$: Subject<boolean> = new Subject<boolean>(); // used as the notifier of the takeUntil() operator.

  constructor( private dataService:DataService ) { }

  ngOnInit(){
    this.dataService.sendGetRequest().pipe( takeUntil( this.destroy$ ) ).subscribe( ( data:any[] ) => {
      console.log( data );
      this.products = data;
    })
  }

  // In case the user decided to navigate away from the component before the HTTP response is received.
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe(); // Unsubscribe from the subject
  }

}
