import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { PromotionData } from '../../models/promo-data';
import { RaffleData } from '../../models/raffle-data';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { SnackComponent } from '../snackComponent/snackbar.component';
import { PromotionService } from '../../services/promotion.service';
import { RaffleService } from '../../services/raffle.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
  reportsData: any[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  reportsForm: FormGroup;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public fb: FormBuilder,
    public snackbar: MatSnackBar,
    private promotionService: PromotionService,
    private raffleService: RaffleService) { }

  ngOnInit() {
    this.reportsForm = this.fb.group({
      reportType: ['promotionReport', Validators.required],
      fromDate: [new Date(), Validators.required],
      toDate: [new Date(), Validators.required]
    });
    this.searchReport();
    this.changeReportsForm();
  }

  changeReportsForm() {
    this.reportsForm.controls['reportType'].valueChanges.subscribe(data => {
      this.searchReport();
    });
  }


  searchReport() {
    const reportType = this.reportsForm.controls.reportType.value;
    const fromDate = this.reportsForm.controls.fromDate.value;
    const toDate = this.reportsForm.controls.toDate.value;
    let data = [];
    if (reportType === 'promotionReport') {
      this.promotionService.getPromotions().subscribe(result => {
        const response: any = result;
        data = response;
        data = data.filter(dataItem => new Date(dataItem.date) >= fromDate && new Date(dataItem.date) <= toDate);
        console.log(data);
        this.reportsData = data;
        this.buildDatagrid(reportType);
        this.constructTable(data);
      });
    } else {
      this.raffleService.getRaffles('ALL').subscribe(result => {
        const response: any = result;
        data = response;
        data = data.filter(dataItem => new Date(dataItem.date) >= fromDate && new Date(dataItem.date) <= toDate);
        console.log(data);
        this.reportsData = data;
        this.buildDatagrid(reportType);
        this.constructTable(data);
      });
    }

  }



  buildDatagrid(type: string) {
    if (type === 'promotionReport') {
      this.displayedColumns = ['promoCode', 'promoType', 'promoDescription', 'date', 'status'];
    } else {
      this.displayedColumns = ['raffleRef', 'raffleName', 'promotionName', 'date', 'status'];
    }
  }

  constructTable(data: any) {
    if (data) {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  downloadReport() {
    const fileName = this.reportsForm.controls.reportType.value + '_' + new Date().getUTCDate() + '_' + 1 + new Date().getUTCMonth() + '_' + new Date().getUTCFullYear();
    this.openSnackBar('Downloading ' + fileName);
    this.exportAsExcelFile(this.reportsData, fileName);
    this.openSnackBar(fileName + '.xlsx is downloaded!!');
  }


  openSnackBar(winnerSelected: string) {
    this.snackbar.openFromComponent(SnackComponent, {
      data: winnerSelected,
      duration: 5000
    });
  }


  public exportAsExcelFile(data: any[], excelFileName: string): void {
    let sheetsInfo: any = {};
    let sheetNames: string[] = [];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    sheetsInfo['data'] = worksheet;
    sheetNames.push('data');
    data.forEach(item => {
      if (item.winners && item.winners.length > 0) {
        const winners: XLSX.WorkSheet = XLSX.utils.json_to_sheet(item.winners);
        sheetsInfo['Raffle_' + item.raffleId + 'winners'] = winners;
        sheetNames.push('Raffle_' + item.raffleId + 'winners');
      }


      if (item.prizes && item.prizes.length > 0) {
        const winners: XLSX.WorkSheet = XLSX.utils.json_to_sheet(item.prizes);
        sheetsInfo['Promo_' + item.promoCode + '_prizes'] = winners;
        sheetNames.push('Promo_' + item.promoCode + '_prizes');
      }



    });

    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: sheetsInfo, SheetNames: sheetNames };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
