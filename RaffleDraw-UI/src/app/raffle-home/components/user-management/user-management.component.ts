import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SnackComponent } from '../snackComponent/snackbar.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { RemoveUserComponent } from '../remove-user/remove-user.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AddUserToRaffleComponent } from '../add-user-to-raffle/add-user-to-raffle.component';
import { RemoveUserToRaffleComponent } from '../remove-user-to-raffle/remove-user-to-raffle.component';
import { User } from '../../models/user';
import { ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { UserRafflesComponent } from '../user-raffles/user-raffles.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserManagementComponent implements OnInit {

  userContext: any;
  displayedColumns: string[] = ['userId', 'userName', 'role', 'lastLoginDate', 'raffles', 'view_more'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public userService: UserService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.userContext = this.sharedService.userContext;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.constructTable(response);
    });
  }

  constructTable(users: any) {
    if (users) {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
















  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      data: { operationType: '' }, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.userId) {
        this.getUsers();
        this.openSnackBar('User ' + result.userId + ' created successfully');
      }
    });
  }



  openRemoveUserDialog(user: User): void {
    const dialogRef2 = this.dialog.open(RemoveUserComponent, {
      width: '500px',
      data: user, disableClose: true
    });
    dialogRef2.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
        this.openSnackBar('User with Id: ' + result + ' removed successfully');
      }
    });
  }


  openLinkRaffleUserDialog(user: User): void {
    const dialogRef = this.dialog.open(AddUserToRaffleComponent, {
      width: '800px',
      data: user, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.userId) {
        this.openSnackBar('Raffles added successfully to user: ' + user.userId);
      }
    });
  }


  openUnLinkRaffleUserDialog(user: User): void {
    const dialogRef = this.dialog.open(RemoveUserToRaffleComponent, {
      width: '800px',
      data: user, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result._id) {
        this.openSnackBar('Raffles are removed successfully from the user: ' + user.userId);
      }
    });
  }



  openRafflesDialog(user: User): void {
    const dialogRef = this.dialog.open(UserRafflesComponent, {
      width: '800px',
      data: user, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }



  openChangePasswordDialog(row: User): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '500px',
      data: row, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.authentication === true) {
        this.openSnackBar('Password has been changed successfully for the user :' + row.userId);
      }
    });
  }


  openSnackBar(winnerSelected) {
    this.snackbar.openFromComponent(SnackComponent, {
      data: winnerSelected,
      duration: 5000
    });
  }




}
