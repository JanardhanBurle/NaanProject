import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../../models/user';
import { FormArray } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { UserContext } from '../../../shared/models/user-context';
import { AuthorizationService } from '../../../authorization/services/authorization.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userContext: UserContext;
  rafflesData: any;
  users: any;
  updatedRafflesData: any;
  isFormCreated = false;
  userForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.data.operationName = 'Change Password';
    this.userContext = this.sharedService.userContext;
    this.createForm();
  }


  createForm() {
    this.userForm = this.formBuilder.group({
      _id: new FormControl({ value: this.data ? this.data.userId : null, disabled: true }, Validators.required),
      password: ['', [Validators.required]],
      confirmPassword: ['']
    });
    this.isFormCreated = true;
  }


  checkPasswords() {
    if (this.userForm && this.userForm.controls.confirmPassword.touched) {
      const pass = this.userForm.controls.password.value;
      const confirmPassword = this.userForm.controls.confirmPassword.value;
      return pass === confirmPassword ? false : true;
    } else { return false; }
  }


  validateFormContol(control: string) {
    if (this.userForm) {
      return this.userForm.controls[control].touched && this.userForm.controls[control].invalid;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }




  resetPassword() {
    if (!this.checkPasswords()) {
      const user = new User();
      user.password = this.userForm.controls.confirmPassword.value;
      user.userId = this.data.userId;
      this.authService.resetPassword(user).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
  }

}
