import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './login.html',

  styleUrls: ['./login.css']
})

export class Login {

  username: string = '';

  password: string = '';

  errorMessage: string = '';

  hidePassword: boolean = true;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {

  }

  login() {

    const loginData = {

      username: this.username,

      password: this.password
    };

    this.apiService.login(loginData)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          localStorage.setItem(
            'token',
            response.token
          );

          localStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );

          this.router.navigate(['/dashboard']);
        },

        error: (error: any) => {

          console.error(error);

          this.errorMessage =
            error.error.message;
        }

      });
  }

}