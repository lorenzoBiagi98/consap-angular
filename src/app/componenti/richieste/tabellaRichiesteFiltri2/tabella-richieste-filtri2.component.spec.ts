import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaRichiesteFiltri2Component } from './tabella-richieste-filtri2.component';

describe('TabellaRichiesteFiltri2Component', () => {
  let component: TabellaRichiesteFiltri2Component;
  let fixture: ComponentFixture<TabellaRichiesteFiltri2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabellaRichiesteFiltri2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabellaRichiesteFiltri2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
