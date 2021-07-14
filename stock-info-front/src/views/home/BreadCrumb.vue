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
    import Cookies from 'js-cookie'

    export default {
        name: "BreadCrumb",
        methods: {
            logout() {
                let token = Cookies.get('token');
                this.$http({
                    method: 'post',
                    url: '/stock-info/logout',
                    data: {
                        param: {
                            token: token
                        }
                    }
                }).then(res => {
                    let {result, message} = res.data;
                    if (!result) {
                        this.$notify.error({
                            title: '错误',
                            message: message
                        });
                    } else {
                        sessionStorage.removeItem("username");
                        Cookies.remove('token');
                        this.$notify({
                            title: '成功',
                            message: '登出成功',
                            type: 'success'
                        });
                        sessionStorage.removeItem("username");
                        Cookies.remove('token');
                        this.$router.push("/login")
                    }

                })
            }
        }
    }
</script>

<style scoped>

</style>