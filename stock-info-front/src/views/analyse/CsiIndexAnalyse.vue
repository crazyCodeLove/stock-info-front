<template>
    <div>
        <div class="index-form">
            <el-form :inline="true" :model="csiForm" label-width="100px">
                <el-form-item label="指数代码">
                    <el-select v-model="csiForm.indexCode" multiple filterable clearable>
                        <el-option v-for="item in indexInfoList" :key="item.indexCode" :label="item.indexName"
                                   :value="item.indexCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                            v-model="csiForm.tradeDateStart" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                            v-model="csiForm.tradeDateEnd" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="显示类型">
                    <el-select v-model="csiForm.showTypeList" multiple filterable clearable>
                        <el-option v-for="item in showTypeList" :key="item.code" :label="item.desc"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-left: 20px">
                    <el-button type="primary" @click="queryIndexPerform" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <index-display v-for="item in indexDisplayList" :key="item.indexCode" :indexCode="item.indexCode"
                       :indexName="item.indexName" :tradeDateStart="item.tradeDateStart"
                       :tradeDateEnd="item.tradeDateEnd" :showTypeList="item.showTypeList"/>
    </div>
</template>

<script>
    import IndexDisplay from "./DisplayCard/IndexDisplay";

    export default {
        name: "CsiAnalyse",
        components: {IndexDisplay},
        data() {
            return {
                csiForm: {
                    indexCode: [],
                    tradeDateStart: '',
                    tradeDateEnd: '',
                    showTypeList: []
                },
                indexInfoList: [],
                indexDisplayList: [],
                indexInfoMap: {},
                showTypeList: [
                    {
                        code: 'pe',
                        desc: '市盈率'
                    },
                    {
                        code: 'dp',
                        desc: '股息率'
                    },
                    {
                        code: 'close',
                        desc: '市值'
                    }
                ]
            }
        },
        methods: {
            queryIndexPerform() {
                this.indexDisplayList = [];
                if (this.csiForm.indexCode.length == 0 || !this.csiForm.tradeDateStart) {
                    return;
                }
                this.csiForm.indexCode.forEach((item) => {
                    let requestParam = {
                        indexCode: item,
                        indexName: this.indexInfoMap[item],
                        tradeDateStart: this.csiForm.tradeDateStart,
                        tradeDateEnd: this.csiForm.tradeDateEnd,
                        showTypeList: this.csiForm.showTypeList
                    }
                    this.indexDisplayList.push(requestParam);
                });
            },
            queryIndexInfoList() {
                this.$http({
                    method: 'get',
                    url: '/stock-info/csi/indexInfo/list'
                }).then((res) => {
                    let {code, result} = res.data;
                    if (code == 200) {
                        this.indexInfoList = result;
                        result.forEach((item) => {
                            this.indexInfoMap[item.indexCode] = item.indexName;
                        })
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

</style>