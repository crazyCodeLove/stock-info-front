<template>
    <div>
        <div class="index-perform" id="index-perform">
            <div class="index-perform-pe-desc" desc="指数描述信息">
                <h4>描述信息</h4>
                <p>{{indexName}} - {{indexCode}}</p>
            </div>
            <div :id="indexId" class="index-perform-pe" desc="指数展示位置">
            </div>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'

    export default {
        name: "IndexDisplay",
        data() {
            return {
                //indexId 需要唯一
                indexId: ''
            }
        },
        props: ['indexCode', 'indexName', 'tradeDateStart', 'tradeDateEnd', 'showTypeList'],
        methods: {
            queryIndexPerform() {
                let requestParam = {
                    indexCode: this.indexCode,
                    tradeDateStart: this.tradeDateStart,
                    tradeDateEnd: this.tradeDateEnd
                }
                this.$http({
                    method: 'post',
                    url: '/stock-info/csi/indexPerform/list',
                    data: {
                        param: requestParam
                    }
                }).then((res) => {
                    let {code, result} = res.data;
                    if (code == 200) {
                        this.fillPeEchart(result, this.showTypeList);
                    }
                })
            },
            fillPeEchart(dataSource, showTypeList) {
                let myChart = echarts.init(document.getElementById(this.indexId));
                let dateList = dataSource.map((it) => {
                    return it.tradeDate;
                });
                let peList = dataSource.map((it) => {
                    return it.pe1;
                });
                let dpList = dataSource.map((it) => {
                    return it.dp1;
                });
                let closeList = dataSource.map((it) => {
                    return it.close;
                });
                // 绘制图表
                let option = {
                    legend: {},
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: dateList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: []

                };
                if (!showTypeList || showTypeList.length == 0) {
                    showTypeList = ['pe'];
                }
                let peSeries = {
                    name: '市盈率',
                    data: peList,
                    showSymbol: false,
                    type: 'line',
                    smooth: true,
                    markLine: {
                        symbol: 'none',
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                };

                let dpSeries = {
                    name: '股息率',
                    data: dpList,
                    showSymbol: false,
                    type: 'line',
                    smooth: true,
                    markLine: {
                        symbol: 'none',
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                };

                let closeSeries = {
                    name: '市值',
                    data: closeList,
                    showSymbol: false,
                    type: 'line',
                    smooth: true,
                    markLine: {
                        symbol: 'none',
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
                showTypeList.forEach((item) => {
                    switch (item) {
                        case 'pe':
                            option.series.push(peSeries);
                            break;
                        case 'dp':
                            option.series.push(dpSeries);
                            break;
                        case 'close':
                            option.series.push(closeSeries);
                            break;
                    }
                })

                myChart.setOption(option);
            }
        },
        mounted() {
            this.indexId = "index-pe-perform-" + this.indexCode;
            this.queryIndexPerform();
        },
        watch: {
            'tradeDateStart'() {
                this.queryIndexPerform();
            },
            'tradeDateEnd'() {
                this.queryIndexPerform();
            },
            'showTypeList'() {
                this.queryIndexPerform();
            }
        }
    }
</script>

<style scoped>
    .index-perform {
        height: 400px;
        border: 1px #c1c1c1 solid;
        margin: 10px 0;
        padding: 10px;
        display: flex;
        border-radius: 20px;
        background-color: white;
    }

    .index-perform-pe-desc {
        margin-left: 20px;
        min-width: 300px;
        height: 100%;
        text-align: left;
    }

    .index-perform-pe {
        height: 100%;
        width: 100%;
    }
</style>