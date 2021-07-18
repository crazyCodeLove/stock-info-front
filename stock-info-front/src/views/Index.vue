<template>
    <div>
        <el-container>
            <el-header style="font-size: 16px">
                <Nav/>
            </el-header>
            <div v-if="path == '/index' || path =='/index/'">
                <home-index/>
            </div>
            <div>
                <router-view/>
            </div>
        </el-container>
    </div>
</template>

<script>
    import Nav from "./home/Nav";
    import HomeIndex from "./home/HomeIndex";

    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        data() {
            return {
                path: ''
            }
        },
        components: {
            Nav,
            HomeIndex
        },
        created() {
            this.path = this.$route.path;
        },
        computed: {
            routePath() {
                return this.$route.path;
            }
        },
        watch: {
            routePath(val) {
                this.path = val;
            }
        }
    }
</script>

<style scoped>
    .el-header {
        padding: 0;
        box-sizing: border-box;
        flex-shrink: 0;
    }

    .el-main {
        display: block;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
        box-sizing: border-box;
    }
</style>
