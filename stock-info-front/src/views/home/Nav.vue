<template>
    <div>
        <el-menu
                :default-active="activeIndex2"
                mode="horizontal"
                @select="handleSelect"
                background-color="#FFEFF3"
                text-color="#052643"
                active-text-color="#052643">
            <el-submenu index="platform">
                <template slot="title">我的工作台</template>
                <el-menu-item index="fetch-data">获取数据</el-menu-item>
            </el-submenu>
            <el-submenu index="data-analyse">
                <template slot="title">数据分析</template>
                <el-menu-item index="csi">CSI指数</el-menu-item>
                <el-menu-item index="option2">选项2</el-menu-item>
                <el-menu-item index="option3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="exchange">
                <template slot="title">交易</template>
                <el-menu-item index="fund">基金交易</el-menu-item>
                <el-menu-item index="stock">股票交易</el-menu-item>
            </el-submenu>
            <el-submenu index="5" style="float: right;">
                <template slot="title">{{user.username}}</template>
                <el-menu-item index="toIndex" @click="toIndex">返回主页</el-menu-item>
                <el-menu-item index="5-1">修改密码</el-menu-item>
                <el-menu-item index="logout" @click="logout">登出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                activeIndex2: '1',
                msgCenterDisabled: true,
                user: {}
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key == 'logout' || key == 'toIndex') {
                    return;
                }
                let targetPath = '/index';
                keyPath.forEach((it) => {
                    targetPath = targetPath + '/' + it;
                });
                if (this.$route.path != targetPath) {
                    this.$router.push(targetPath);
                }
            },
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
                        type: 'success',
                        duration: 1000
                    });
                    this.$router.push("/login");
                })
            },
            toIndex() {
                let target = '/index';
                if (target != this.$route.path) {
                    this.$router.push(target);
                }
            }
        },
        created() {
            let username = sessionStorage.getItem("username");
            this.user.username = username;

        }
    }
</script>

<style scoped>
    ::v-deep.el-menu--horizontal > .el-submenu .el-submenu__title {
        font-size: 16px;
        font-weight: bold;
    }

    .el-menu--horizontal .el-menu .el-menu-item {
        font-size: 16px;
    }

    .el-menu--horizontal .el-menu .el-submenu__title {
        font-size: 16px;
    }

</style>