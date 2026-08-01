import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {

  }

  getDevices() {

    return this.http.get(`${this.baseUrl}/devices`);
  }

  getDeviceDetails(deviceId: number) {

  return this.http.get(
    `${this.baseUrl}/devices/${deviceId}/details`
  );
}

login(data: any) {

  return this.http.post(
    `${this.baseUrl}/auth/login`,
    data
  );
}

}