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
    // import Cookies from 'js-cookie'
    export default {
        name: "BreadCrumb",
        methods: {
            logout() {
                sessionStorage.removeItem("username");
                // Cookies.remove('token');
                this.$router.push("/login");
            }
        }
    }
</script>

<style scoped>

</style>