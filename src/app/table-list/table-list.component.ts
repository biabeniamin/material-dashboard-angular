import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import {HttpClient} from '@angular/common/http';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
export interface Log
{
  Date : number;
  Message :string;
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  public Logs : Log[] = [];

  getLog() {

    //return this.http.get<Log[]>("http://192.168.0.100:81/getLog.php");
    return this.http.get<Log[]>("http://192.168.0.107/getLog.php");

  }

  updateLog()
  {
    this.getLog().subscribe(res => {
      this.Logs = res;
      //this.temperature = res[res.length-1].Temperature;
      //this.humidity = res[res.length-1].Humidity;
      log(res.length.toString());
    });
  }

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
    this.updateLog();

    IntervalObservable.create(3000)
      .takeWhile(() => true) // only fires when component is alive
      .subscribe(() => {

        this.getLog().subscribe(res => {
          this.updateLog()
        });

      });

  }

}
