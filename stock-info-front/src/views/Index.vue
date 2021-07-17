<template>
    <div>
        <el-container>
            <el-header style="font-size: 16px">
                <Nav/>
            </el-header>
            <p>
                <router-view/>
            </p>
        </el-container>
    </div>
</template>

<script>
    import Nav from "./home/Nav";

    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        components: {
            Nav
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
