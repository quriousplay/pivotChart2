import { Component, ElementRef } from '@angular/core';
import { PivotChart } from '../lib/chart/pivotChart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pivot chart poc';

  pivotChart: PivotChart;

  constructor(el: ElementRef) {
    this.pivotChart = new PivotChart(el);
  }

  ngOnInit(): void {

  }
}
