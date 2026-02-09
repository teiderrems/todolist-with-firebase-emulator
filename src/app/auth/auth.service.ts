import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  constructor() {
      console.log('Auth Emulator Config:', this.auth);
      console.log('firestore Emulator Config:', this.firestore);
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User logged in:', userCredential.user);
    }
    catch (error) {
      console.error('Login error:', error);
    }
  }

  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User registered:', userCredential.user);
    }
    catch (error) {
      console.error('Registration error:', error);
    }
  }
}
