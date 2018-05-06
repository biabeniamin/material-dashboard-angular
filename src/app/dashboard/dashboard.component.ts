import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { log } from 'util';
import { Injectable } from '@angular/core';
import { Http, Response} from "@angular/http";
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/take';
import { MyExampleService2 } from "../my-example.service";

import {HttpClient} from '@angular/common/http';
export interface SensorsValue {
  Temperature : number;
  Humidity : number;
}

interface LightStatusModel {
  LightStatus: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public temperature : number = 22;
  public humidity : number = 48;
  public state: boolean;
  private alive: boolean; 


  private temperatureHistory : number[];
  private humidityHistory : number[];
  private temperatureHistoryLabels : string[];

  constructor(private http: HttpClient) { 
    this.getLightStatus();
    this.alive = true;
    this.temperatureHistory = [22,22,22,22,22,22,22];
    this.humidityHistory = [48,48,48,48,48,48,48];
    this.temperatureHistoryLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    
  }

  getLightStatus(){
    this.http.get<LightStatusModel>("http://192.168.0.107/getLightStatus.php").subscribe(s => {

      if(s.LightStatus == 1) 
        this.state = true;
      else this.state = false;
    
      log(this.state as boolean);
    });
  }

  getSensorsValue() {
    log(this.state as boolean);
    //return this.http.get<SensorsValue[]>("http://192.168.0.100:81/index.php");
     return this.http.get<SensorsValue[]>("http://192.168.0.107/getTemperature.php");

  }

  turnOnLight()
  {
    this.state = true;
    this.http.get("http://192.168.0.107/index.php?cmd=lightOn").subscribe(res => {
   });
   log("action 1");
  };

  turnOffLight()
  {
    this.state = false;
    log("action 2");
    this.http.get("http://192.168.0.107/index.php?cmd=lightOff").subscribe(res => {
    });;
  };
  unlockDoor()
  {
    log("action 3");
    this.http.get("http://192.168.0.107/index.php?cmd=openDoor").subscribe(res => {
    });;
  };
  

  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 300;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    

    seq = 0;
};

updateTemperature()
    {
      const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 20,
        high: 40, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

      

        for(let i = 0;i<this.temperatureHistory.length-1;i++)
        {
          this.temperatureHistory[i] = this.temperatureHistory[i + 1];
        }

        this.temperatureHistory[this.temperatureHistory.length - 1] = this.temperature;
        //log(new Date().getMinutes().toString());

        const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            this.temperatureHistory
          ]
      };
        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);
    };

    updateHumidity()
    {
      const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

        for(let i = 0;i<this.humidityHistory.length-1;i++)
        {
          this.humidityHistory[i] = this.humidityHistory[i + 1];
        }

        this.humidityHistory[this.humidityHistory.length - 1] = this.humidity;

        const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            this.humidityHistory
          ]
      };
        var dailySalesChart = new Chartist.Line('#humidityHistory', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);
    };
  
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      

   

    
    

    

      IntervalObservable.create(3000)
      .takeWhile(() => true) // only fires when component is alive
      .subscribe(() => {

        this.getSensorsValue().subscribe(res => {
          this.temperature = res[res.length-1].Temperature;
          this.humidity = res[res.length-1].Humidity;
          log(res[res.length-1].Humidity.toString());
        });

        this.updateTemperature();
        this.updateHumidity();

      });
      
  }

}
