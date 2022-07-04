import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAppHeaderComponent } from './contact-app-header.component';

describe('ContactAppHeaderComponent', () => {
  let component: ContactAppHeaderComponent;
  let fixture: ComponentFixture<ContactAppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactAppHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
