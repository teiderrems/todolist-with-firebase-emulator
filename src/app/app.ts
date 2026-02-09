import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  protected readonly title = signal('todo_list');
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  private readonly authService =inject(AuthService);

  constructor() {
      console.log('Auth Emulator Config:', this.auth);
      console.log('firestore Emulator Config:', this.firestore);
  }

  ngOnInit() {
    this.authService.login('ghizlane@gmail.com', 'rems2001').then((data) => {
      console.log('Login successful:', data);
    }).catch((error) => {
      console.error('Login failed:', error);
    });
    console.log('Auth Emulator Config:', this.auth);
  }
}
