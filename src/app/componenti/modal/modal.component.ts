import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  isModalOpen: boolean = false;

  ngOnInit(): void {
  this.isModalOpen = false;
  }


  openModal():boolean{
    this.isModalOpen= true;
    return this.isModalOpen = true;
  }

  closeModal() : boolean{
    this.isModalOpen = false;
    return this.isModalOpen = false;
  }
}
