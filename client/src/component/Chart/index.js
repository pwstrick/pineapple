// import {useState, useEffect} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
// import echarts from 'echarts';

export function echartLine(props) {
    const option = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: props.data.x,
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              formatter: `{value} ${props.unit}`,
            },
        },
        series: [{
            data: props.data.y,
            type: 'line',
        }],
    };
    const myChart = echarts.init(document.getElementById(props.id));
    myChart.setOption(option);
}

export function echartPie(props) {
    const { data, click } = props;
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)',
        },
        series: [
            {
                type: 'pie',
                radius: '60%',
                center: ['50%', '50%'],
                data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };
    const myChart = echarts.init(document.getElementById(props.id));
    myChart.setOption(option);
    if (click) {
        myChart.off('click');
        myChart.on('click', click);
    }
}
