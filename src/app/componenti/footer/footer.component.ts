import { HostListener, OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  imageUrl : string;

  ngOnInit(): void {
   this.imageUrl = "/Users/lorenzobiagi/Documents/Utilità/CorsoOpenSystem/ripassoAngular/progettoAngular/src/app/immagini/consap_logo_news.jpeg"
  }

  @HostListener('keydown.Tab', ['$event'])
  handleTab(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

}
