import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  isFormCreated = false;
  userForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.data.operationName = 'Add User';
    this.createForm();
  }


  createForm() {
    this.userForm = this.formBuilder.group({
      userId: [null, Validators.required],
      userName: [null, Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: [''],
      isAdmin: [false, Validators.required]
    });
    this.isFormCreated = true;
  }


  checkPasswords() {
    if (this.userForm && this.userForm.controls.confirmPassword.touched) {
      let pass = this.userForm.controls.password.value;
      let confirmPassword = this.userForm.controls.confirmPassword.value;
      return pass === confirmPassword ? false : true;
    } else return false;
  }

  createUser() {
    let user = new User();
    user.userId = this.userForm.controls.userId.value;
    user.userName = this.userForm.controls.userName.value;
    user.password = this.userForm.controls.confirmPassword.value;
    user.role = this.userForm.controls.isAdmin.value ? 'ADMIN' : 'RAFFLE_INITIATOR';
    user.lastLoginDate = new Date();
    delete user.isAdmin;
    this.userService.createUser(user).subscribe(response => {
      this.dialogRef.close(response);
    });
  }




  validateFormContol(control: string) {
    return this.userForm.controls[control].touched && this.userForm.controls[control].invalid;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

