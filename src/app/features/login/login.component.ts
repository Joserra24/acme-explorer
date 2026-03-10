import { Component, inject } from '@angular/core';
import { FirebaseAuthService } from '../../core/services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected readonly auth = inject(FirebaseAuthService);

  async handleAuthAction() {
    if (this.auth.isAuthenticated()) {
      await this.auth.logout();
      return;
    }

    const user = await this.auth.loginWithGoogle();

    if (user?.email) {
      console.log(`Login successfull. Hello ${user.email}`);
    }
  }
}
