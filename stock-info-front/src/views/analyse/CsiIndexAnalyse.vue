<template>
    <div>
        <div class="index-form">
            <el-form :inline="true" :model="csiForm" label-width="100px">
                <el-form-item label="指数代码">
                    <el-select v-model="csiForm.indexCode" filterable clearable>
                        <el-option v-for="item in indexInfoList" :key="item.indexCode" :label="item.indexName"
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
        <index-display v-for="item in indexDisplayList" :key="item.indexCode" :indexCode="item.indexCode"
                       :tradeDateStart="item.tradeDateStart" :tradeDateEnd="item.tradeDateEnd"/>
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
                    indexCode: '',
                    tradeDateStart: '',
                    tradeDateEnd: ''
                },
                indexInfoList: [],
                indexDisplayList: []
            }
        },
        methods: {
            queryIndexPerform() {
                let requestParam = {
                    indexCode: this.csiForm.indexCode,
                    tradeDateStart: this.csiForm.tradeDateStart,
                    tradeDateEnd: this.csiForm.tradeDateEnd
                }
                this.indexDisplayList = [];
                this.indexDisplayList.push(requestParam);
            },
            queryIndexInfoList() {
                this.$http({
                    method: 'get',
                    url: '/stock-info/csi/indexInfo/list'
                }).then((res) => {
                    let {code, result} = res.data;
                    if (code == 200) {
                        this.indexInfoList = result;
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