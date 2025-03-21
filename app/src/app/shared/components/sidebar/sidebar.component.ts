import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit { // se agrega el OnInit para obtener dinámicamente el username

    username: string = '';
  
    ngOnInit(): void {
      this.username = localStorage.getItem('username') || 'Guest';
    }

}
