import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublishersPage } from './publishers.page';

describe('PublishersPage', () => {
  let component: PublishersPage;
  let fixture: ComponentFixture<PublishersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublishersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
