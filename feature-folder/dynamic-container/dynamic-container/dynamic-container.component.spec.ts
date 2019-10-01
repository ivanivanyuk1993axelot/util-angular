import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicContainerComponent } from './dynamic-container.component';

describe('DynamicContainerComponent', () => {
  let component: DynamicContainerComponent<unknown, any>;
  let fixture: ComponentFixture<DynamicContainerComponent<unknown, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
