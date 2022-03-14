import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { User } from '../../models/user';
import { FormArray } from '@angular/forms';
import { RaffleData } from '../../models/raffle-data';
import { SelectionModel } from '@angular/cdk/collections';
import { SharedService } from 'src/app/shared/shared.service';
import { UserContext } from 'src/app/shared/models/user-context';
import { RaffleService } from '../../services/raffle.service';
@Component({
  selector: 'app-user-raffles',
  templateUrl: './user-raffles.component.html',
  styleUrls: ['./user-raffles.component.css']
})
export class UserRafflesComponent implements OnInit {

  rafflesData: any;
  users: any;
  updatedRafflesData: any;
  isFormCreated = false;

  displayedColumns: string[] = ['raffleRef', 'raffleName', 'promotionName', 'date', 'status'];
  dataSource: MatTableDataSource<RaffleData>;
  selectedRaffles = new SelectionModel<RaffleData>(true, []);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  userContext: UserContext;
  constructor(
    public dialogRef: MatDialogRef<UserRafflesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private raffleService: RaffleService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.userContext = this.sharedService.userContext;
    this.raffleService.getRaffles(this.userContext._id).subscribe(result => {
      const response: any = result;
      const rafflesData = [];
      response.forEach(raffle => {
        const index = raffle.assignedTo.findIndex(x => x.userId === this.data._id);
        if (index > -1) {
          rafflesData.push(raffle);
        }
      });
      this.rafflesData = rafflesData;
      this.constructTable(this.rafflesData);
    });
    this.isFormCreated = true;

  }

  constructTable(raffles: any) {
    if (raffles) {
      this.dataSource = new MatTableDataSource(raffles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}


