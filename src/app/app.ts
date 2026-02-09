import { Component, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('todo_list');
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  constructor() {
      console.log('Auth Emulator Config:', this.auth);
      console.log('firestore Emulator Config:', this.firestore);
  }
}
