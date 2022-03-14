import { FormGroup } from '@angular/forms';
import { OnInit, ViewChild, Inject, Component } from '@angular/core';

import { SharedService } from '../../../shared/shared.service';
import { UserContext } from '../../../shared/models/user-context';
import { RaffleData } from '../../models/raffle-data';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatPaginator } from '@angular/material';
import { RaffleService } from '../../services/raffle.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-add-user-to-raffle',
  templateUrl: './add-user-to-raffle.component.html',
  styleUrls: ['./add-user-to-raffle.component.css']
})
export class AddUserToRaffleComponent implements OnInit {

  userContext: UserContext;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddUserToRaffleComponent>,
    private userService: UserService,
    private raffleService: RaffleService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.userContext = this.sharedService.userContext;
    this.raffleService.getRaffles('ALL').subscribe(response => {
      this.constructTable(response);
    });
    this.isFormCreated = true;

  }

  constructTable(raffles: any) {
    if (raffles) {
      this.dataSource = new MatTableDataSource(raffles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.data.forEach(raffle => {
        const index = raffle.assignedTo.findIndex(x => x.userId === this.data._id);
        if (index > -1) {
          this.selectedRaffles.select(raffle);
        }
      });
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

  addRafflesToUser() {
    if (this.data) {
      const user = this.data;
      user.operationType = 'ADD_USER_TO_RAFFLE';
      const raffles = [];
      this.selectedRaffles.selected.forEach(raffle => {
        // const raffleObj = this.rafflesData.find(item => item._id === raffle._id);
        raffles.push({ _id: raffle._id, raffleName: raffle.raffleName });
      });
      user.raffles = raffles;
      this.userService.updateUser(user).subscribe(result => {
        this.dialogRef.close(result);
      });

    }



    console.log(this.userForm);
  }

}


