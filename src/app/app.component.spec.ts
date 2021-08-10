import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { GridComponent } from "./grid/grid.component";

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

describe("objectContaining", function () {
  var grid: GridComponent;

  beforeEach(function () {
    grid = new GridComponent();
  });

  it("matches objects with the expect key/value pairs", function () {
    expect(grid).toEqual(
      jasmine.objectContaining({
        gridWidth: 10,
      })
    );
  });
});
