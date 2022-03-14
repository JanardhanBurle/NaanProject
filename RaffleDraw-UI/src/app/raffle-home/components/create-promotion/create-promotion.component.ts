import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RaffleData } from '../../models/raffle-data';
import { Inject } from '@angular/core';
import { PromotionData } from '../../models/promo-data';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Prize } from '../../models/prize';
import { FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PromotionService } from '../../services/promotion.service';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit {
  promoId: any;
  promotionTypes: any;
  showPromoForm = false;
  prizesList: Prize[] = [];
  popupTitle: string;
  createPromotion: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreatePromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public promotionData: PromotionData,
    public fb: FormBuilder, public promotionService: PromotionService,
    public sanitizer: DomSanitizer) {
  }


  ngOnInit() {
    this.promotionService.getPromotionTypes().subscribe(promotionTypes => {
      if (promotionTypes) {
        this.promotionTypes = promotionTypes;
        if (!this.promotionData) {
          this.popupTitle = 'Create Promotion';
          this.createPromotionForm();
        } else {
          this.popupTitle = 'View Promotion';
          this.createPromotionForm(this.promotionData);
        }
        this.showPromoForm = true;
      }
    });
  }


  public createPromotionForm(data?: any) {
    this.createPromotion = this.fb.group({
      promoName: new FormControl({ value: data ? data.promoName : null, disabled: data ? data.isCompleted : false }, Validators.required),
      promoType: new FormControl({ value: data ? data.promoType._id : null, disabled: data ? data.isCompleted : false }, Validators.required),
      scheduledDate: new FormControl({ value: data ? data.scheduledDate : new Date(), disabled: true }, Validators.required),
      typeOfWinner: new FormControl({ value: data ? data.typeOfWinner : null, disabled: data ? data.isCompleted : false }),
      approvalRequired: new FormControl({ value: data ? data.approvalRequired : false, disabled: data ? data.isCompleted : false }, Validators.required),
      noOfWinners: new FormControl({ value: data ? data.noOfWinners : null, disabled: data ? data.isCompleted : false }),
      noOfPrizes: new FormControl({ value: data ? data.noOfPrizes : null, disabled: (data ? data.typeOfWinner === 1 ? true : false : false) || (data ? data.isCompleted : false) }),
      standByWinnerRequired: new FormControl({ value: data ? data.standByWinnerRequired : false, disabled: data ? data.isCompleted : false }, Validators.required),
      prizes: this.fb.array([]),
      isCompleted: [data ? data.isCompleted : false]
    });
    this.popupTitle = (data && data.isCompleted) ? 'View Pormotion' : 'Create Promotion';
    this.promoId = data ? data._id : "(N/A)";
    this.promotionData = this.createPromotion.value;
    this.onFormChanges();
    if (data && data.prizes && data.prizes.length > 0) {
      this.buildFormArray(data.prizes);
    }
  }


  buildFormArray(array) {
    const prizes = this.createPromotion.controls.prizes as FormArray;
    this.clearFormArray(prizes);
    for (let i = 0; i < array.length; i++) {
      prizes.push(this.fb.group({
        id: array[i].id,
        name: array[i].name,
        fileStatus: array[i].fileStatus,
        content: array[i].content
      }));
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormChanges(): void {
    this.createPromotion.controls['noOfPrizes'].valueChanges.subscribe(val => {
      console.log(val);
      if (val) {
        const noOfPrizes = Number(val);
        const prizes = this.createPromotion.controls.prizes as FormArray;
        this.clearFormArray(prizes);
        for (let i = 0; i < noOfPrizes; i++) {
          prizes.push(this.fb.group({
            id: i,
            name: '',
            fileStatus: 'Upload',
            content: ''
          }));
        }
      }
    });
  }


  // fileChangeListener(event: any, fileInput) {
  //   console.log(fileInput);
  // }


  fileChangeListener(input: any, fileInput: any) {
    if (input.files[0].type !== 'image/png') {
      let prize = new Prize();
      prize.id = fileInput.id;
      prize.name = fileInput.name;
      prize.fileStatus = 'Only image is allowed.';
      this.updatePrizeItem(prize);
      return;
    }

    const files = input.files;
    const file: File = input.files[0];
    if (files && file) {
      const fileReader: FileReader = new FileReader();

      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        const binaryString = myReader.result;
        let prize = new Prize();
        prize.id = fileInput.id;
        prize.name = file.name;
        prize.fileStatus = 'Uploaded';
        prize.content = binaryString;
        this.updatePrizeItem(prize);
      }
      myReader.readAsDataURL(file);
    }
  }



  updatePrizeItem(prize: Prize) {
    const prizes = this.createPromotion.controls.prizes as FormArray;
    const prizeControl = prizes.controls[prize.id] as FormGroup;
    prizeControl.controls['id'].patchValue(prize.id);
    prizeControl.controls['name'].patchValue(prize.name);
    prizeControl.controls['fileStatus'].patchValue('Uploaded');
    prizeControl.controls['content'].patchValue(prize.content);
  }



  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  getSafeImageUrl(url: string) {
    if (url) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else
      return '../assets/images/prize-placeholder.png';
  }


  sendPromoInfo() {
    let newPromo = new PromotionData();
    newPromo = this.createPromotion.value;
    newPromo._id = this.promoId;
    newPromo.scheduledDate = this.createPromotion.controls.scheduledDate.value;
    newPromo.noOfPrizes = this.createPromotion.controls.noOfPrizes.value;
    newPromo.isCompleted = (this.createPromotion.controls.prizes.value.length === this.createPromotion.controls.noOfPrizes.value && this.createPromotion.valid);
    return newPromo;
  }

  changeWinnerType() {
    let winnerTypeVal = Number(this.createPromotion.controls['typeOfWinner'].value);

    if (winnerTypeVal === 1) {
      this.createPromotion.controls['noOfPrizes'].patchValue(1);
      this.createPromotion.controls['noOfPrizes'].disable();
      this.createPromotion.controls['noOfWinners'].enable();
    }
    else if (winnerTypeVal === 2) {
      this.createPromotion.controls['noOfPrizes'].enable();
      this.createPromotion.controls['noOfWinners'].enable();
    } else {
      this.createPromotion.controls['noOfPrizes'].patchValue(1);
      this.createPromotion.controls['noOfPrizes'].disable();
      this.createPromotion.controls['noOfWinners'].patchValue(1);
      this.createPromotion.controls['noOfWinners'].disable();
    }
  }


}
