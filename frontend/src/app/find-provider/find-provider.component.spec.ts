import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProviderComponent } from './find-provider.component';

describe('FindProviderComponent', () => {
  let component: FindProviderComponent;
  let fixture: ComponentFixture<FindProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
