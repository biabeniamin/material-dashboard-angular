import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {HttpClient} from '@angular/common/http';
export interface Temperature {
  Value : number;
}


@Injectable()
export class MyExampleService2 {
  constructor(private http: HttpClient) { }

  getPeople() {

    return this.http.get<Temperature[]>("http://192.168.0.100:81/index.php");

  }
}