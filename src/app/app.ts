import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './pages/auth/auth.service';
import { ToastComponent } from './shared/toast.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, ConfirmDialogComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('todo_list');
  // private readonly auth = inject(Auth);
  // private readonly firestore = inject(Firestore);

  // constructor() {
  //     console.log('Auth Emulator Config:', this.auth);
  //     console.log('firestore Emulator Config:', this.firestore);
  // }

  // ngOnInit() {
  //   this.authService.login('ghizlane@gmail.com', 'rems2001').then((data) => {
  //     console.log('Login successful:', data);
  //   }).catch((error) => {
  //     console.error('Login failed:', error);
  //   });
  //   console.log('Auth Emulator Config:', this.auth);
  // }
}
