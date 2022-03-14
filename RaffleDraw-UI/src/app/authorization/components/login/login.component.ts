import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { AuthorizationService } from '../../services/authorization.service';
import { UserContext } from '../../../shared/models/user-context';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: any;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthorizationService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userId: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      try {
        this.authService.validateUserLogin(this.loginForm.value).subscribe(response => {
          const userContext: any = response;
          this.sharedService.userContext = userContext;
          if (userContext.role !== 'ADMIN') {
            this.router.navigate(['/raffle-initiation']);
          } else {
            this.router.navigate(['/raffle-home']);
          }
        }, error => {
          this.loginError = error;
        });

      } catch (error) {
        this.loginError = error;
      }
    }
  }

}
