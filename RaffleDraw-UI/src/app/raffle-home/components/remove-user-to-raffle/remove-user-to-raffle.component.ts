import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../../models/user';
import { FormArray } from '@angular/forms';
import { RaffleData } from '../../models/raffle-data';
import { SelectionModel } from '@angular/cdk/collections';
import { SharedService } from 'src/app/shared/shared.service';
import { UserContext } from 'src/app/shared/models/user-context';
import { RaffleService } from '../../services/raffle.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-remove-user-to-raffle',
  templateUrl: './remove-user-to-raffle.component.html',
  styleUrls: ['./remove-user-to-raffle.component.css']
})
export class RemoveUserToRaffleComponent implements OnInit {

  rafflesData: any;
  users: any;
  updatedRafflesData: any;
  isFormCreated = false;
  userForm: FormGroup;

  displayedColumns: string[] = ['raffleRef', 'raffleName', 'promotionName', 'date', 'status', 'select'];
  dataSource: MatTableDataSource<RaffleData>;
  selectedRaffles = new SelectionModel<RaffleData>(true, []);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  userContext: UserContext;
  constructor(
    public dialogRef: MatDialogRef<RemoveUserToRaffleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private raffleService: RaffleService,
    private sharedService: SharedService,
    private userService: UserService) { }

  ngOnInit() {
    this.userContext = this.sharedService.userContext;
    this.raffleService.getRaffles(this.userContext._id).subscribe(response => {
      const rafflesData = [];
      const result: any = response;
      result.forEach(raffle => {
        const index = raffle.assignedTo.findIndex(x => x.userId === this.data._id);
        if (index > -1) {
          rafflesData.push(raffle);
        }
      });
      this.rafflesData = rafflesData;
      this.constructTable(this.rafflesData);
    });
    // this.createForm();
    this.isFormCreated = true;

  }

  constructTable(raffles: any) {
    if (raffles) {
      this.dataSource = new MatTableDataSource(raffles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  isAllSelected() {
    const numSelected = this.selectedRaffles.selected.length;
    const numRows = this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selectedRaffles.clear() :
      this.dataSource.data.forEach(row => this.selectedRaffles.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: RaffleData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectedRaffles.isSelected(row) ? 'deselect' : 'select'} row`;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  removeRafflesFromUser() {
    const user = this.data;
    user.operationType = 'REMOVE_USER_FROM_RAFFLE';
    if (user) {
      this.selectedRaffles.selected.forEach(raffle => {
        const itemIndex = user.raffles.findIndex(item => item._id === raffle._id);
        if (itemIndex > -1) {
          user.raffles.splice(itemIndex, 1);
        }
      });
      this.userService.updateUser(user).subscribe(result => {
        this.dialogRef.close(result);
      });
    }
  }

}


