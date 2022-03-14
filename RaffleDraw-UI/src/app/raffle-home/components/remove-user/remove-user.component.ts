import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  users: any;
  isFormCreated = false;
  userForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RemoveUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
  }

  removeUser() {
    if (this.data.userId) {
      this.userService.removeUsers(this.data.userId).subscribe(result => {
        const response: any = result;
        if (response.ok === 1) {
          this.dialogRef.close(this.data.userId);
        }
      });
    }
  }
}


