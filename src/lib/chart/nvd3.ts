import { Component, ElementRef, Input } from '@angular/core';

declare let d3: any;
declare let nv: any;
declare var $: any;

@Component({
    selector: '[nvd3-chart]'
})

export class Nvd3Chart {


  @Input() height: any;

  $el: any;
  chart: any;
  datum: any;

  svg: any;

  margin = {
    top: 10,
    right: 50,
    bottom: 30,
    left: 50
  };

  zoomOptions: any = {
    "enabled": true,
    "scaleExtent": [
      1,
      10
    ],
    "useFixedDomain": true,
    "useNiceScale": true,
    "horizontalOff": true,
    "verticalOff": false,
    "unzoomEventType": "dblclick.zoom"
  }

  constructor(el: ElementRef) {
    this.$el = $(el.nativeElement);
  }

  render(datum): void {

    let scope = this;

    this.svg = d3.select(this.$el.find('svg').get(0));

    nv.addGraph(() => {


      this.svg
        .style('height', this.height || '300px')
        .datum(datum)
        .transition().duration(500)
        .call(this.chart)

      nv.utils.windowResize(this.chart.update);

      return this.chart;

    }, (chart) => {
      //chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });     
      return chart;
    });
  }



}

