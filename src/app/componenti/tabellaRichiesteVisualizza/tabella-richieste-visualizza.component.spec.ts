import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaRichiesteVisualizzaComponent } from './tabella-richieste-visualizza.component';

describe('TabellaRichiesteVisualizzaComponent', () => {
  let component: TabellaRichiesteVisualizzaComponent;
  let fixture: ComponentFixture<TabellaRichiesteVisualizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabellaRichiesteVisualizzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabellaRichiesteVisualizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
