import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Child } from 'src/app/shared/interfaces/Child';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    CommonModule
  ]
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) {}
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public page: number = 0;
  public dataSource!: MatTableDataSource<Child>;
  ;

  ngOnInit(): void {
      // this.backendService.getChildren(this.currentPage).subscribe(data => {
      //   this.dataSource.data = data;
      //   this.dataSource.sort = this.sort;
      // });
    this.backendService.getChildren(this.currentPage);
    // this.backendService.getChildren(this.currentPage).subscribe(data => {
    //   this.dataSource.data = data;
    // });
    // // this.storeService.children.sort = this.sort;
    // this.dataSource = new MatTableDataSource(this.storeService.children);
    // this.dataSource.sort = this.sort;
    
  }

  sortChildrenBy(criteria: string): void {
    this.storeService.children.sort((a: any, b: any) => {
      if (criteria === 'kindergarden.name') {
        return a.kindergarden.name.localeCompare(b.kindergarden.name);
      } else {
        const aValue = a[criteria];
        const bValue = b[criteria];
  
        // Assuming the values are strings for simplicity
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

  selectPage(i: any) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage)
    this.backendService.getChildren(currentPage);
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

  public returnAllItems() {
    return this.storeService.childrenTotalCount;
  }


  // Handle Paginaton event
  handlePageEvent(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.selectPage(pageIndex+1);
  }
}


