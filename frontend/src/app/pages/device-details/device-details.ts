import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api';

@Component({
  selector: 'app-device-details',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './device-details.html',

  styleUrls: ['./device-details.css']
})

export class DeviceDetails implements OnInit {

  device: any;

  anomalies: any[] = [];

  actions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    const deviceId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadDeviceDetails(deviceId);
  }

  loadDeviceDetails(deviceId: number) {

    this.apiService.getDeviceDetails(deviceId)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.device = response.device;

          this.anomalies = response.anomalies;

          this.actions = response.actions;
        },

        error: (error: any) => {

          console.error(error);
        }

      });
  }

  goBack() {

    this.router.navigate(['/dashboard']);
  }

  logout() {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    this.router.navigate(['/']);
  }

}