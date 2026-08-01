import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {

  devices: any[] = [];

  constructor(
  private apiService: ApiService,
  private router: Router
) {

} 
  openDevice(deviceId: number) {

      this.router.navigate(['/device', deviceId]);
  }

  logout() {

  localStorage.removeItem('token');

  localStorage.removeItem('user');

  this.router.navigate(['/']);
}

  ngOnInit(): void {

    this.loadDevices();
  }

  loadDevices() {

    this.apiService.getDevices().subscribe({

      next: (response: any) => {

        console.log(response);

        this.devices = response.data;
      },

      error: (error: any) => {

        console.error(error);
      }

    });
  }

}