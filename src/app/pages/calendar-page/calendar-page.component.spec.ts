import { TestBed, async } from '@angular/core/testing';
import { CalendarPageComponent } from './calendar-page.component';

describe('CalendarPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarPageComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CalendarPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-calendar'`, () => {
    const fixture = TestBed.createComponent(CalendarPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('my-calendar');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(CalendarPageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to my-calendar!');
  });
});
