import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatMenuModule,
    RouterModule,
  ]
})
export class HeaderComponent implements OnInit {

  public title: string = 'Kindergarden-App';
  public imagePath: string = "./../assets/images/kindergarden.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}