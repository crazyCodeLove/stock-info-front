<template>
    <div>
        <el-row>
            <el-col :offset="22" :span="2">
                <el-button type="primary" @click="logout">退出</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "BreadCrumb",
        methods: {
            logout() {
                this.$http({
                    method: 'post',
                    url: '/stock-info/logout'
                }).then(() => {
                    sessionStorage.removeItem("username");
                    sessionStorage.removeItem('token');
                    this.$notify({
                        title: '成功',
                        message: '登出成功',
                        type: 'success'
                    });

                    this.$router.push("/login");

                })
            }
        }
    }
</script>

<style scoped>

</style>