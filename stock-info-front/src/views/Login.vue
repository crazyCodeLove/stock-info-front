<template>
    <div>
        <el-row style="height: 240px">
            <NoticeLeftRight :lists="noticeList"/>
        </el-row>
        <el-row style="padding: 120px 0 120px 0" class="login-outer theam-background">
            <el-col :span="4" :offset="3">
                <el-image style="height: 360px" :src="loginLogo.path" :fit="loginLogo.fit"/>
            </el-col>
            <el-col :span="4" :offset="6">
                <div class="login-content">
                    <div>
                        <h3 style="text-align: center">系统登录</h3>
                    </div>
                    <div>
                        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px"
                                 class="demo-ruleForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="loginForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="loginForm.password" show-password></el-input>
                            </el-form-item>
                            <el-form-item label="记住我" prop="remembered">
                                <el-checkbox v-model="loginForm.remembered"></el-checkbox>
                            </el-form-item>
                            <el-form-item>
                                <el-button style="width: 30%;" type="primary"
                                           @click="submitForm('loginForm')">登录
                                </el-button>
                                <el-button style="width: 30%;margin-left: 20px" @click="resetForm('loginForm')">重置
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>

        </el-row>
    </div>
</template>


<script>
    import NoticeLeftRight from "../util/NoticeLeftRight";
    import EncryptUtil from "../util/EncryptUtil";

    export default {
        data() {
            return {
                noticeList: [
                    "好好学习，天天向上",
                    "时间就像海绵里的水，挤挤总是有的",
                    "终日忙碌的人，永远没有时间致富",

                ],
                loginLogo: {
                    path: require("../assets/goldenEgg.png"),
                    fit: 'scale-down'
                },
                loginForm: {
                    username: '',
                    password: '',
                    remembered: false
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                }
            };
        },
        components: {
            NoticeLeftRight
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        return this.login();

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            login() {
                let {username, password} = this.loginForm;
                password = EncryptUtil.sha256(password);
                username = EncryptUtil.sm2Encrypt(username);
                password = EncryptUtil.sm2Encrypt(password);
                this.$http({
                    method: 'post',
                    url: '/stock-info/login',
                    data: {
                        param: {
                            username: username,
                            password: password
                        }
                    }
                }).then(res => {
                    let {result, message} = res.data;
                    if (!result || !result.username) {
                        this.$notify.error({
                            title: '错误',
                            message: message
                        });
                    } else {
                        this.$notify({
                            title: '成功',
                            message: '登陆成功',
                            type: 'success'
                        });
                        sessionStorage.setItem("username", result.username);
                        sessionStorage.setItem("token", result.token);
                        this.$router.push("/index")
                    }

                })

            }
        }
    }
</script>

<style scoped>

    .login-outer {
        margin: 1px;
    }

    .login-content {
        border-radius: 15px;
        margin: 1px;
        padding: 4%;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #565656;
        background-color: white;
    }


</style>