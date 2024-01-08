import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Child } from 'src/app/shared/interfaces/Child';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DataComponent implements OnInit {

  form: FormGroup;
  

  constructor(private fb: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
    this.form = this.fb.group({
      kindergardenId: [null]
    });
  }
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public page: number = 0;
  public pageSize: number = 2;
  public kindergardenId: number | null = null;
  public dataSource!: MatTableDataSource<Child>;

  ngOnInit(): void {
    const kindergardenIdControl = this.form.get('kindergardenId');
    if (kindergardenIdControl) {
      kindergardenIdControl.valueChanges.subscribe(kindergardenId => {
        this.kindergardenId = kindergardenId;
        this.selectPage(this.page, this.pageSize);
    })
    }

    this.backendService.getChildren(this.currentPage, this.pageSize, this.kindergardenId);
  }

  sortChildrenBy(criteria: string): void {
    this.storeService.children.sort((a: any, b: any) => {
      if (criteria === 'kindergarden.name') {
        return a.kindergarden.name.localeCompare(b.kindergarden.name);
      } else {
        const aValue = a[criteria];
        const bValue = b[criteria];

        if (aValue < bValue) {
          return -1;
        }
        if (aValue > bValue) {
          return 1;
        }
        return 0;
      }
    });
  }

  sortData(sort: Sort) {
    this.storeService.children.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'kindergarden.name':
          return compare(a.kindergarden.name, b.kindergarden.name, isAsc);
        case 'registrationDate':
          return compare(a.registrationDate, b.registrationDate, isAsc);
        default:
          return 0;
      }
    });
  }
  



  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  selectPage(i: any, pageSize: number) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage)
    this.backendService.getChildren(currentPage, pageSize, this.kindergardenId);
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

  public returnAllItems() {
    return this.storeService.childrenTotalCount;
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex+1;
    this.pageSize = event.pageSize;
    this.selectPage(this.page, this.pageSize);
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}