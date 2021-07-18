<template>
    <div>
        <div class="index-form">
            <el-form :inline="true" :model="csiForm" label-width="100px">
                <el-form-item label="指数代码">
                    <el-select v-model="csiForm.indexCode" filterable clearable>
                        <el-option v-for="item in indexList" :key="item.indexCode" :label="item.indexName"
                                   :value="item.indexCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                            v-model="csiForm.tradeDateStart" type="date" placeholder="选择开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                            v-model="csiForm.tradeDateEnd" type="date" placeholder="选择结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="margin-left: 20px">
                    <el-button type="primary" @click="queryIndexPerform" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="index-perform" id="index-perform">
            <div id="index-perform-pe" class="index-perform-pe">

            </div>

        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'

    export default {
        name: "CsiAnalyse",
        data() {
            return {
                csiForm: {
                    indexCode: '',
                    tradeDateStart: '',
                    tradeDateEnd: ''
                },
                indexList: [],
                indexDataSet: []
            }
        },
        methods: {
            queryIndexPerform() {
                let requestParam = {
                    indexCode: this.csiForm.indexCode,
                    tradeDateStart: this.csiForm.tradeDateStart,
                    tradeDateEnd: this.csiForm.tradeDateEnd
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
                        this.indexDataSet = result;
                        this.fillPeEchart(result);
                    }
                })
            },
            fillPeEchart(dataSource) {
                let myChart = echarts.init(document.getElementById('index-perform-pe'));
                // 绘制图表
                let option = {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        dimensions: [
                            'id',
                            'indexCode',
                            'indexName',
                            'tradeDate',
                            'open',
                            'upDownRate',
                            'pe1',
                            'dp1'
                        ],
                        source: dataSource
                    },
                    xAxis: {type: 'category'},
                    yAxis: {type: 'value'},
                    series: {
                        encode: {x: 3, y: 6},
                        type: 'line',
                        smooth: true
                    }

                };
                myChart.setOption(option);

            },
            queryIndexInfoList() {
                this.$http({
                    method: 'get',
                    url: '/stock-info/csi/indexInfo/list'
                }).then((res) => {
                    let {code, result} = res.data;
                    if (code == 200) {
                        this.indexList = result;
                    }

                })
            }
        },
        created() {
            this.queryIndexInfoList();
        }
    }
</script>

<style scoped>
    .index-form {
        margin: 20px 0;
        vertical-align: middle;
    }

    .index-perform {
        height: 400px;
        border: 1px #000 solid;
        padding: 10px;
        display: flex;
        border-radius: 10px;
        background-color: #F6F6F6;
    }

    .index-perform-pe {
        height: 100%;
        width: 100%;
    }

</style>