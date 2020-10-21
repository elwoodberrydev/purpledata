import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public products = []; //
  public destroy$: Subject<boolean> = new Subject<boolean>(); // used as the notifier of the takeUntil() operator.

  constructor( private dataService:DataService ) { }

  ngOnInit() {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe( ( res: HttpResponse<any> ) => {
      console.log(res);
      this.products = res.body;
    })
  }

  // In case the user decided to navigate away from the component before the HTTP response is received.
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe(); // Unsubscribe from the subject
  }


  //
  public firstPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(
      this.dataService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe( ( res:HttpResponse<any> ) => {
        console.log(res);
        this.products = res.body;
      })
  }

  //
  public previousPage() {
    if(this.dataService.prev!==undefined&&this.dataService.prev!==''){
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.prev)
        .pipe(takeUntil(this.destroy$))
        .subscribe( ( res:HttpResponse<any> ) => {
          console.log(res);
          this.products = res.body;
        })
    }
  }

  //
  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.next)
        .pipe(takeUntil(this.destroy$))
        .subscribe( ( res:HttpResponse<any> ) => {
          console.log(res);
          this.products = res.body;
        })
    }
  }

  //
  public lastPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.last)
    .pipe(takeUntil(this.destroy$))
    .subscribe( ( res:HttpResponse<any> ) => {
      console.log(res);
      this.products = res.body;
    })
  }




}
