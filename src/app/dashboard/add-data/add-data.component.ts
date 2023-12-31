
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroupDirective } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';


/** @title Form field with error messages */
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
  standalone: true,
  providers: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgbAlertModule
  ],

})


export class AddDataComponent implements OnInit{

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService) {
  }

  public addChildForm: any;
  @Input() currentPage!: number;
  name = new FormControl('', [Validators.required]);
  kindergardenId = new FormControl('', [Validators.required]);
  birthDate = new FormControl('', [Validators.required]);

  currentYear = new Date().getFullYear();
  startDate = new Date(this.currentYear-3, 0, 1);
  showAlert = false;

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: new FormControl('', [Validators.required, this.customPatternValidator()]),
      birthDate: new FormControl(null, [Validators.required]),
      kindergardenId: new FormControl('', [Validators.required])
    })
  }
  
  formatDate(date: Date): string {
    return date ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : '';
  }

  customPatternValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const pattern = /^[A-Za-z]{2,} [A-Za-z]{2,}$/;
      const isValid = pattern.test(control.value);
      return isValid ? null : { 'invalidPattern': true };
    };
  }

  minDate = new Date(this.currentYear-7, 0, 1); // January 1, 2021

  myFilter = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }
    return d >= this.minDate;
  };

  getNameErrorMessage() {
    const nameControl = this.addChildForm.get('name');
    if (nameControl.hasError('required')) {
      return 'Bitte etwas eingeben.';
    }
    if (nameControl.hasError('invalidPattern')) {
      return 'Namesformat beachten: "Max Mustermann"';
    }
    return '';
  }

  getBirthDateErrorMessage() {
    const birthDateControl = this.addChildForm.get('birthDate');
    if (birthDateControl.hasError('required')) {
      return 'Bitte Geburtsdatum auswählen.';
    }
    return '';
  }

  getKindergardenErrorMessage() {
    const kindergardenControl = this.addChildForm.get('kindergardenId');
    if (kindergardenControl.hasError('required')) {
      return 'Bitte Kindergarten auswählen.';
    }
    return '';
  }

 

  onSubmit(formDirective: FormGroupDirective) {
    if(this.addChildForm.valid) {
      console.log(this.currentPage);
      
      this.addChildForm.patchValue({
        birthDate: moment(this.addChildForm.value.birthDate).format("YYYY-MM-DD")
      });
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
      formDirective.resetForm();
      this.addChildForm.reset();
      this.showAlert = true;
    }
  }
}