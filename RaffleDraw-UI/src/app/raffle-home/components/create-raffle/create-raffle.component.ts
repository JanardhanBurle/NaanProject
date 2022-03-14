import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Inject } from '@angular/core';
import { RaffleData } from '../../models/raffle-data';
import { RaffleDisplayConfig } from '../../models/raffle-display-config';
import { AfterViewInit } from '@angular/core';
import { TweenMax, Power3 } from "gsap/TweenMax";
import * as XLSX from 'xlsx';
import { share } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PromotionData } from '../../models/promo-data';
import { SharedService } from '../../../shared/shared.service';
import { RaffleWinner } from '../../models/raffle-winner';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { Prize } from '../../models/prize';
import { DomSanitizer } from '@angular/platform-browser';
import { SnackComponent } from '../snackComponent/snackbar.component';
import { PromotionService } from '../../services/promotion.service';
import { RaffleService } from '../../services/raffle.service';
declare const $: any;
type AOA = any[][];

@Component({
  selector: 'app-create-raffle',
  templateUrl: './create-raffle.component.html',
  styleUrls: ['./create-raffle.component.css']
})
export class CreateRaffleComponent implements OnInit {
  raffleUsers: any;
  raffleId: string;
  raffleLoaded = false;
  prizes: Prize[];
  numberOfWinners = 0;
  subscriber: Subscription;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  raffleWinnersList: MatTableDataSource<any>;
  promotionsList: PromotionData[];
  popupTitle: string;
  createRaffle: FormGroup;
  totalRecords = 0;
  raffleCustomersInfo: any[];
  fileUploadStatus = 'Not loaded';
  raffleWinners: RaffleWinner[] = [];
  fileName = 'Load Raffle Data';
  winnerColumns = ['id', 'name', 'accountNumber', 'prize', 'raffleCode'];
  delay = 0.03;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(
    public dialogRef: MatDialogRef<CreateRaffleComponent>,
    @Inject(MAT_DIALOG_DATA) public raffleData: RaffleData,
    public fb: FormBuilder,
    public promotionService: PromotionService,
    public sanitizer: DomSanitizer, public snackbar: MatSnackBar,
    private sharedService: SharedService,
    private raffleService: RaffleService) { }


  ngOnInit() {


    this.promotionService.getPromotions().subscribe(promos => {
      const response: any = promos;
      this.promotionsList = response.filter(promo => promo.isCompleted);
      if (!this.raffleData) {
        this.popupTitle = 'Create Raffle';
        this.createRaffleForm();
      } else {
        this.popupTitle = 'View Raffle';
        this.createRaffleForm(this.raffleData);
      }
      this.raffleLoaded = true;

    });

  }




  createRaffleForm(data?: any) {
    this.createRaffle = this.fb.group({
      raffleName: new FormControl({ value: data ? data.raffleName : null, disabled: data ? data.isCompleted : false }, [Validators.required, Validators.minLength(5)]),
      raffleRef: new FormControl({ value: data ? data.raffleRef : null, disabled: data ? data.isCompleted : false }),
      raffleDate: new FormControl({ value: data ? data.raffleDate : new Date(), disabled: true }, Validators.required),
      promotion: new FormControl({ value: data ? data.promotion._id : null, disabled: data ? data.isCompleted : false }),
      raffleType: new FormControl({ value: data ? data.raffleType : null, disabled: data ? data.isCompleted : false }, Validators.required),
      isCompleted: [data ? data.isCompleted : false]
    });
    this.raffleId = data ? data._id : "(N/A)";
    this.raffleUsers = data ? data.assignedTo : [{
      userId: this.sharedService.userContext._id,
      userName: this.sharedService.userContext.userName,
    }];

    this.raffleCustomersInfo = data ? data.participants : [];
    this.totalRecords = this.raffleCustomersInfo.length;
    this.raffleData = this.createRaffle.value;
    this.fileName = data ? data.raffleDataFileName : 'Load Raffle Data';
    this.fileUploadStatus = this.totalRecords > 0 ? 'Uploaded' : 'Not loaded';
    this.raffleWinners = data ? data.winners : [];
    this.numberOfWinners = data ? data.promotion.noOfWinners : 0;
    if (this.raffleWinners.length > 0)
      this.raffleWinnersList = new MatTableDataSource(this.raffleWinners);
    this.onFormChanges();
  }

  onFormChanges(): void {
    this.createRaffle.valueChanges.subscribe(val => {
      console.log(val);
      if (val.raffleName) {
        const words = val.raffleName.split(" ");
        let raffleRef = '';
        if (words.length > 1) {
          words.forEach(word => {
            raffleRef = raffleRef + word[0];
          });
        } else {
          raffleRef = val.raffleName;
        }
        val.raffleRef = raffleRef.toUpperCase();
      }
      if (val.promotion && val.promotion !== '0') {
        const promotion = this.promotionsList.find(promo => promo._id === val.promotion);
        this.numberOfWinners = promotion.noOfWinners;
        this.prizes = promotion.prizes;
      }

    });
  }



  validateControl(control: string) {
    return this.createRaffle.controls[control].touched && this.createRaffle.controls[control].invalid;
  }


  startRaffle() {
    if (Number(this.createRaffle.controls.raffleType.value) === 1) {
      this.manualSelectRaffle();
    } else {
      this.autoSelectRaffle();
    }
  }

  manualSelectRaffle() {
    this.delay = 0.005;
    let number = ((Math.random() * 1000)).toString();
    this.countDown('node00', 'node01', Number(number[0]));
    setTimeout(() => { this.countDown('node10', 'node11', Number(number[1])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node20', 'node21', Number(number[2])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node30', 'node31', Number(number[3])); }, (Math.random() * 1000));
    setTimeout(() => { this.countDown('node40', 'node41', Number(number[4])); }, (Math.random() * 1000));
  }


  autoSelectRaffle() {
    this.delay = 0.005;
    let inter = interval(3000);
    let count = 1;
    this.subscriber = inter.pipe(
      startWith(0)
    ).subscribe(response => {
      this.manualSelectRaffle();
      this.stopRaffle('auto');
      count += 1;
      if (count > this.numberOfWinners) {
        this.subscriber.unsubscribe();
        this.delay = 0;
      }
    });

  }


  getSafeImageUrl(url: string) {
    if (url) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else
      return '../assets/images/prize-placeholder.png';
  }




  stopRaffle(type: string) {
    if (type === 'manual') {
      this.delay = 0;
    }

    setTimeout(() => {
      const mirrorSelectedRaffle = $('#node00')[0].textContent + $('#node10')[0].textContent + $('#node20')[0].textContent;
      const selectedWinner = this.raffleCustomersInfo.find(customer => Number(customer.customerId) === Number(mirrorSelectedRaffle));
      const selectedRaffle = $('#node00')[0].textContent + $('#node10')[0].textContent + $('#node20')[0].textContent + $('#node30')[0].textContent + $('#node40')[0].textContent;
      if (selectedWinner) {
        let winner = new RaffleWinner();
        winner.id = this.raffleWinners ? this.raffleWinners.length + 1 : 1;
        winner.name = selectedWinner.customerName;
        winner.customerId = selectedWinner.customerId;
        winner.accountNumber = selectedWinner.accountNo;
        winner.raffleCode = $('#node00')[0].textContent + $('#node10')[0].textContent + $('#node20')[0].textContent + $('#node30')[0].textContent + $('#node40')[0].textContent;;
        winner.prize = this.prizes.length === 1 ? this.prizes[0].content : this.prizes[Number(winner.id) - 1].content;
        winner.prizeName = this.prizes.length === 1 ? this.prizes[0].name : this.prizes[Number(winner.id) - 1].name;
        this.raffleWinners.push(winner);
        this.openSnackBar('Winner ' + this.raffleWinners.length + ' selected');
      }
      this.raffleWinnersList = new MatTableDataSource(this.raffleWinners);
    }, 200);
  }


  saveRaffleData() {
    let newRaffle = new RaffleData();
    newRaffle = this.createRaffle.value;
    this.raffleService.saveRaffle(newRaffle).subscribe(response => {
      console.log('Raffle data saved', response)
    });

  }


  fileChangeListener(event: any): void {
    const input = event.target;
    if (input.files[0].type !== 'application/vnd.oasis.opendocument.spreadsheet') {
      this.fileName = 'Invalid document! Only .xlsx or .ods format is allowed.';
      return;
    }

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e: any) => {

      // read work book
      const bstr: string = e.target.result;
      const wb: XLSX.WorkSheet = XLSX.read(bstr, { type: 'binary' });

      // grab first sheet
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // save Data
      const data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.fileUploadStatus = 'Uploaded';
      this.fileName = input.files[0].name;

      // console.log(this.data);
      const raffleCustomersInfo = [];
      data.forEach(row => {
        raffleCustomersInfo.push({
          customerId: row[0],
          customerName: row[1],
          accountNo: row[2]
        });
        this.raffleCustomersInfo = raffleCustomersInfo;
        this.totalRecords = this.raffleCustomersInfo.length;
      });
    };
    fileReader.readAsBinaryString(input.files[0]);
  }


  countDown(node0, node1, counter) {
    let _thisComponent = this;
    if (this.delay === 0) return;
    let n0 = document.querySelector('#' + node0);
    let n1 = document.querySelector('#' + node1);
    let nodeValue = '#' + node0 + ', #' + node1;
    if (counter > 0) {
      counter--;
    } else {
      counter = 9;
    }
    n1.textContent = counter;
    TweenMax.to(nodeValue, this.delay, {
      y: '+=400',
      delay: this.delay,
      ease: Power3.easeInOut,
      onComplete: function () {
        n0.textContent = counter;
        TweenMax.set(nodeValue, { y: '-=400', onComplete: _thisComponent.countDown(node0, node1, counter) });
      }
    });
  }

  sendRaffleInfo() {
    let newRaffle = new RaffleData();
    if (!this.createRaffle) return;
    newRaffle = this.createRaffle.value;
    newRaffle._id = this.raffleId;
    newRaffle.raffleDate = this.createRaffle.controls.raffleDate.value;
    newRaffle.winners = this.raffleWinners;
    newRaffle.participants = this.raffleCustomersInfo;
    newRaffle.createdBy = this.sharedService.userContext._id;
    newRaffle.assignedTo = this.raffleUsers;
    newRaffle.createdOn = new Date().toString();
    newRaffle.raffleDataFileName = this.fileName;
    newRaffle.isCompleted = this.raffleWinners.length < this.numberOfWinners ? false : true;
    return newRaffle;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(winnerSelected) {
    this.snackbar.openFromComponent(SnackComponent, {
      data: winnerSelected,
      duration: 3000
    });
  }

}
