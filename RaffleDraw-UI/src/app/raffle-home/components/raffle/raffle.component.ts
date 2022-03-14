import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDatepicker } from '@angular/material';
import { RaffleData } from '../../models/raffle-data';
import { CreateRaffleComponent } from '../create-raffle/create-raffle.component';
import { AfterViewInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { UserContext } from '../../../shared/models/user-context';
import { Router } from '@angular/router';
import { RunRaffleComponent } from '../run-raffle/run-raffle.component';
import { RaffleDashboardComponent } from '../raffle-dashboard/raffle-dashboard.component';
import { RaffleService } from '../../services/raffle.service';

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.css'],
  providers: [CreateRaffleComponent]
})
export class RaffleComponent implements OnInit, AfterViewInit {

  userContext: UserContext;
  displayedColumns: string[] = ['raffleRef', 'raffleName', 'promotionName', 'date', 'status', 'view_raffle'];
  dataSource: MatTableDataSource<RaffleData>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(public dialog: MatDialog,
    public raffleService: RaffleService,
    private sharedService: SharedService,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.userContext = this.sharedService.userContext;
    if (this.userContext) {
      this.getRaffleInfo();
    } else {
      this.router.navigate(['/login']);
    }
  }


  getRaffleInfo() {
    this.raffleService.getRaffles(this.userContext._id).subscribe(response => {
      this.constructTable(response);
    });
  }

  constructTable(raffles: any) {
    if (raffles) {
      this.dataSource = new MatTableDataSource(raffles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  runRaffle() {
    this.router.navigate(['/raffle-home/dashboard']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createRaffle() {
    const dialogRef = this.dialog.open(CreateRaffleComponent, { data: null, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== 'cancel') {
        console.log(result);
        let updatedData = new Array<RaffleData>();
        this.raffleService.saveRaffle(result).subscribe(updatedData => {
          console.log('Raffle data saved', updatedData);
          this.getRaffleInfo();
        });
      }
    });
  }

  viewRaffle(raffleData: RaffleData) {
    const dialogRef = this.dialog.open(CreateRaffleComponent, { data: raffleData, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result && (result !== 'cancel')) {
        this.raffleService.updateRaffle(result).subscribe(updatedData => {
          console.log('Raffle data updated', updatedData);
          this.getRaffleInfo();
        });
      }
    });
  }



  launchRaffle(raffleData: RaffleData) {
    this.sharedService.raffleData = raffleData;
    this.router.navigate(['/raffle-home/dashboard']);
  }

  ngAfterViewInit() { }

}
