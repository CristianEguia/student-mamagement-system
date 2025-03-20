import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy{
  constructor(private renderer: Renderer2, private el: ElementRef){
  }
    ngOnInit(): void{
      this.renderer.addClass(document.body, 'bg-primary');
    }

    ngOnDestroy(): void{
      this.renderer.removeClass(document.body, 'bg-primary');
  }

}
