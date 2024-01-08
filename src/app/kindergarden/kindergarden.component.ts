import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-kindergarden',
  templateUrl: './kindergarden.component.html',
  styleUrls: ['./kindergarden.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
})
export class KindergardenPageComponent implements OnInit{

  form: FormGroup;
  selectedKindergarten: any;
  allKindergardens: any;

  constructor(private fb: FormBuilder, public storeService: StoreService, public backendService: BackendService) {
    this.form = this.fb.group({
      kindergardenId: [null]
    });
  }

  ngOnInit(): void {
    const kindergardenIdControl = this.form.get('kindergardenId');

    if (kindergardenIdControl) {
      kindergardenIdControl.valueChanges.subscribe(kindergardenId => {
        if (kindergardenId) {
          this.backendService.getKindergartenDetails(Number(kindergardenId)).subscribe(
              data => {
                if (data) {
                  this.selectedKindergarten=data;
                } else {
                  this.selectedKindergarten=null;
              }}
            );
      }})
    }
  }
}
