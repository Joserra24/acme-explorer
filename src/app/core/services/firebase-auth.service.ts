import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { type User } from 'firebase/auth';
import {
  GoogleAuthProvider,
  type Auth,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { firebaseApp } from './firebase';


// Injectable: We mark the class as a service that can be injected into other components or services
@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly auth: Auth | null = this.isBrowser ? getAuth(firebaseApp) : null;
  private readonly provider = new GoogleAuthProvider();

  readonly user = signal<User | null>(null);
  readonly isAuthenticated = computed(() => this.user() !== null);
  readonly isLoading = signal(false);
  readonly authError = signal<string | null>(null);

  constructor() {
    if (!this.auth) {
      return;
    }

    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
    });
  }

  async loginWithGoogle(): Promise<User | null> {
    if (!this.auth || this.isLoading()) {
      return null;
    }

    this.isLoading.set(true);
    this.authError.set(null);

    try {
      const credential = await signInWithPopup(this.auth, this.provider);
      return credential.user;
    } catch (error) {
      this.authError.set(this.getErrorMessage(error));
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout(): Promise<void> {
    if (!this.auth || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.authError.set(null);

    try {
      await signOut(this.auth);
    } catch (error) {
      this.authError.set(this.getErrorMessage(error));
    } finally {
      this.isLoading.set(false);
    }
  }

  async toggleAuth(): Promise<User | null> {
    if (this.isAuthenticated()) {
      await this.logout();
      return null;
    }

    return this.loginWithGoogle();
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Authentication failed.';
  }
}
