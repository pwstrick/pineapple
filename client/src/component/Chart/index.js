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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} ms',
            },
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
        }],
    };
    const myChart = echarts.init(document.getElementById(props.id));
    myChart.setOption(option);
}

export function echartPie(props) {
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
            {
                name: '姓名',
                type: 'pie',
                radius: '60%',
                center: ['50%', '50%'],
                data: [{ name: '任凤元何·戴沈', value: 54037 }, { name: '姜常', value: 52981 }, { name: '滕齐·凤谢', value: 63117 }, { name: '罗季金', value: 84975 }],
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
}
