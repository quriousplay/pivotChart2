import { Component, Input, Output, ElementRef, EventEmitter, SimpleChanges } from '@angular/core';

import { Nvd3Chart } from './nvd3';
import 'd3';
import 'nvd3';

/* 
* 피벗 차트 기능
    1. 멀티차트
    2. field 항목 정의 
        - 필드
        - 필터
        - value, 차트매핑(n)
        - 그룹
*/
declare var d3, nv: any;
declare var $: any;

@Component({
    selector: 'pivot-chart',
    template: `<svg nvd3-chart></svg>`,
})

//@Injectable
export class PivotChart extends Nvd3Chart {

    @Input()
    data: any = [];

    startDate = new Date('2017-07-17 00:00');
    endDate = new Date('2017-07-18 00:00');
    millisecondsBetweenTicks = 7200000; //2시간 간격

    margin = {
        top: 10,
        right: 50,
        bottom: 30,
        left: 50
    };

    height = 0;

    fields = [];    //columns 
    values = [];    //y
    groupby = [];   //x
    filters = [];   //
    templates = []; 

    constructor(el: ElementRef) {
        super(el);
    }

    ngAfterViewInit() {
        this.setProperty();
        this.setData();
    }

    setProperty() {
        

        this.chart = nv.models.multiChart()
            .margin({ top: 30, right: 60, bottom: 50, left: 70 })
            .color(d3.scale.category10().range());
        this.chart.xAxis.tickFormat(d3.format(',f'));
        this.chart.yAxis1.tickFormat(d3.format(',.1f'));
        this.chart.yAxis2.tickFormat(d3.format(',.1f'));
        //.color(d3.scale.category10().range()) 
        //.forceY([0, 400]);
        //chart.yDomain1([0, 600]);
        //chart.yDomain2([0, 600]);
    }

    setData() {

        var testdata = stream_layers(9, 10 + Math.random() * 100, .1).map(function (data, i) {
            return {
                key: 'Stream' + i,
                values: data.map(function (a) { a.y = a.y * (i <= 1 ? -1 : 1); return a })
            };
        });


        /* Inspired by Lee Byron's test data generator. */
        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function () {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }

        /* Another layer generator using gamma distributions. */
        function stream_waves(n, m) {
            return d3.range(n).map(function (i) {
                return d3.range(m).map(function (j) {
                    var x = 20 * j / m - i / 3;
                    return 2 * x * Math.exp(-.5 * x);
                }).map(stream_index);
            });
        }

        function stream_index(d, i) {
            return { x: i, y: Math.max(0, d) };
        }



        testdata[0].type = "area";
        testdata[0].yAxis = 1;

        testdata[1].type = "area";
        testdata[1].yAxis = 1;

        testdata[2].type = "line";
        testdata[2].yAxis = 1;
        testdata[3].type = "line";
        testdata[3].yAxis = 2;
        testdata[4].type = "scatter";
        testdata[4].yAxis = 1;
        testdata[5].type = "scatter";
        testdata[5].yAxis = 2;
        testdata[6].type = "bar";
        testdata[6].yAxis = 2;
        testdata[7].type = "bar";
        testdata[7].yAxis = 2;
        testdata[8].type = "bar";
        testdata[8].yAxis = 2;


        this.render(testdata);
    }
}

