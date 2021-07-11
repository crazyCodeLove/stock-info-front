<template>
    <div>
        <!--<el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in lists" :key="item">
                <h1 style="font-size: 60px; margin-left: 200px">{{ item }}</h1>
            </el-carousel-item>
        </el-carousel>-->
        <el-carousel style="height: 300px">
            <el-carousel-item v-for="item in lists" :key="item">
                <h3 style="font-size: 60px; margin-left: 120px; color: #9f8603">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "NoticeLeftRight",
        props: ['lists'], // 父组件传入数据， 数组形式 [ "连雨不知春去"，"一晴方觉夏深"]

    }
</script>

<style scoped>
    .el-carousel__item {
        font-size: 60px;
        opacity: 0.8;
        padding: 0;
    }

</style>