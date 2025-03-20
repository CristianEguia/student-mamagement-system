import { Component, ElementRef, Renderer2, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, private el: ElementRef){
  }
    ngOnInit(): void{
      this.renderer.addClass(document.body, 'sb-nav-fixed');
    }

    ngOnDestroy(): void{
      this.renderer.removeClass(document.body, 'sb-nav-fixed');
  }

  sidebarToggle(event: boolean){
    if(event) this.renderer.addClass(document.body, 'sb-sidenav-toggled');
    if(!event) this.renderer.removeClass(document.body, 'sb-sidenav-toggled');
  }

}
