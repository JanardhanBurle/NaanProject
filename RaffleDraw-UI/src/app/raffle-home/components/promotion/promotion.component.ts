import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PromotionData } from '../../models/promo-data';
import { CreatePromotionComponent } from '../create-promotion/create-promotion.component';
import { PromotionService } from '../../services/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'promoType', 'promoName', 'scheduledDate', 'isCompleted', 'view_promo'];
  dataSource: MatTableDataSource<PromotionData>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(public dialog: MatDialog,
    private promotionService: PromotionService) {
  }

  ngOnInit() {
    this.getPromotions();
  }

  getPromotions() {
    this.promotionService.getPromotions().subscribe(data => {
      this.constructTable(data);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewPromo(promoData: PromotionData) {
    console.log(promoData);
    const dialogRef = this.dialog.open(CreatePromotionComponent, { data: promoData, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        let updatePromotion = new PromotionData();
        updatePromotion = result;
        this.promotionService.updatePromotion(updatePromotion).subscribe(res => {
          this.getPromotions();
        });
      }
    });
  }

  createPromo() {
    const dialogRef = this.dialog.open(CreatePromotionComponent, { data: null, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        let newPromotion = new PromotionData();
        newPromotion = result;
        this.promotionService.savePromotion(newPromotion).subscribe(res => {
          this.getPromotions();
        });
      }
    });
  }



  constructTable(users: any) {
    if (users) {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {

  }


}
