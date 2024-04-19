import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaRichiesteFiltriComponent } from './tabella-richieste-filtri.component';

describe('TabellaRichiesteFiltriComponent', () => {
  let component: TabellaRichiesteFiltriComponent;
  let fixture: ComponentFixture<TabellaRichiesteFiltriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabellaRichiesteFiltriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabellaRichiesteFiltriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
