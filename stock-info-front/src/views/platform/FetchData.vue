<template>
    <div>
        <div class="main-content">
            <el-button type="primary" round @click="downloadCsiData" icon="el-icon-download">下载 CSI 数据并落库</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FetchCSIData",
        methods: {
            downloadCsiData() {
                this.$http({
                    method: 'get',
                    url: '/stock-info/csi/index/download'
                }).then((res) => {
                    let {code, result} = res.data;
                    if (code == 200) {
                        console.log(result)
                        this.$notify({
                            title: '成功',
                            message: '下载数据成功',
                            type: 'success'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .main-content {
        margin: 20px 0;
        border: 2px solid gray;
        padding: 10px;
        border-radius: 10px;
        min-height: 600px;
    }
</style>