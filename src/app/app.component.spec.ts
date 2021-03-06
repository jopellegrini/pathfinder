import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { GridComponent } from "./grid/grid.component";
import { Cell } from "./cell/Cell";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pathfinder'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("pathfinder");
  });
});
