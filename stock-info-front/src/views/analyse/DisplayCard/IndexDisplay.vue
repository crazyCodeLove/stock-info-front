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
        props: ['indexCode', 'indexName', 'tradeDateStart', 'tradeDateEnd'],
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
                        this.fillPeEchart(result);
                    }
                })
            },
            fillPeEchart(dataSource) {
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
                // 绘制图表
                let option = {
                    legend: {},
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: dateList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '市盈率',
                            data: peList,
                            showSymbol: false,
                            type: 'line',
                            smooth: true,
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '股息率',
                            data: dpList,
                            showSymbol: false,
                            type: 'line',
                            smooth: true,
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                    ]

                };
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