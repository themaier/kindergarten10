import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE } from './constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getKindergardens() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

  public getKindergartenDetails(kindergardenId: number): Observable<Kindergarden | undefined>  {
    return this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').pipe(
      map(kindergardens => kindergardens.find(kg => kg.id === kindergardenId))
    );
  }

  public getChildren(page: number, childrenPerPage: number = CHILDREN_PER_PAGE, kindergardenId: number | null = null) {
    this.storeService.isLoading = true;
    let url = `http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${childrenPerPage}`;
    if (kindergardenId !== null) {
      url += `&kindergardenId=${encodeURIComponent(kindergardenId)}`;
    }
    this.http.get<ChildResponse[]>(url, { observe: 'response' }).subscribe(data => {
      this.storeService.children = data.body!;
      this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
      this.storeService.isLoading = false;
    });
    }

  public addChildData(child: Child, page:  number) {
    this.http.post('http://localhost:5000/childs', child).subscribe(_ => {
      this.getChildren(page);
    })
  }

  public deleteChildData(childId: string, page: number) {
    this.storeService.isLoading = true;
    this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe(_=> {
      this.getChildren(page);
    })
  }
}
