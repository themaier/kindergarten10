import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-kindergarden',
  templateUrl: './kindergarden.component.html',
  styleUrls: ['./kindergarden.component.scss'],
  standalone: true,
  imports: [
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
    // this.allKindergardens=this.backendService.getKindergardens();
    // this.selectedKindergarten=this.backendService.getKindergartenDetails(1);
    // console.log(this.allKindergardens.find((kg: any) => kg.id === 1))
    // console.log("Hallo")
    // this.selectedKindergarten=1
    // console.log(this.selectedKindergarten)
    const kindergardenIdControl = this.form.get('kindergardenId');
    this.backendService.getKindergartenDetails(1).subscribe(
      data => {
        if (data) {
          // Handle the received details
          console.log(data);
          this.selectedKindergarten=data;
        }
      }
    );
    // this.form.get('kindergardenId').valueChanges.subscribe(selectedId => {
    //   // Handle the selected ID
    //   console.log('Selected Kindergarten ID:', selectedId);
    //   // You can call a function here to fetch additional details based on selectedId
    // });
    // if (kindergardenIdControl) {
    //   kindergardenIdControl.valueChanges.subscribe(kindergardenId => {
    //     if (kindergardenId) {
    //       this.selectedKindergarten = this.backendService.getKindergartenDetails(kindergardenId);
    //     } else {
    //       this.selectedKindergarten = null;
    //     }
    //   });
    // }

    if (kindergardenIdControl) {
      kindergardenIdControl.valueChanges.subscribe(kindergardenId => {
        if (kindergardenId) {
          // this.selectedKindergarten = this.backendService.getKindergartenDetails(kindergardenId);
          this.backendService.getKindergartenDetails(1).subscribe(
            data => {
              if (data) {
                // Handle the received details
                console.log(data);
                this.selectedKindergarten=data;
              }
            }
          );
        } else {
          this.selectedKindergarten = null;
        }
      });
    }
  }

  onSubmit() {
  }
}
