
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
    NgbAlertModule,
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
      name: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      kindergardenId: new FormControl('', [Validators.required])
      // name: ['', [Validators.required]],
      // kindergardenId: ['', Validators.required],
      // birthDate: [null, Validators.required]
    })
  }

  getNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Bitte etwas eingeben.';
    }
    return this.name.hasError('string') ? 'Kein korrekter Name' : '';
  }

  getBirthDateErrorMessage() {
    if (this.birthDate.hasError('required')) {
      return 'Bitte etwas eingeben.';
    }
    return this.birthDate.hasError('birthDate') ? 'Kein korrektes Geburtsdatum' : '';
  }

  onSubmit() {
    if(this.addChildForm.valid) {
      console.log(this.currentPage);
      this.showAlert = true;
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
    }
  }
}