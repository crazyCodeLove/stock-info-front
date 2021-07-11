<template>
    <div class="login-outer">
        <div class="login">
            <div>
                <h3 style="text-align: center">系统登录</h3>
            </div>
            <div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
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
                        <el-button style="width: 30%; margin-left: 20px" type="primary" @click="submitForm('loginForm')">登录</el-button>
                        <el-button style="width: 30%;margin-left: 20px" @click="resetForm('loginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
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
                    let {result} = res.data;
                    if (result == true) {
                        sessionStorage.setItem("username", username);
                        this.$router.push("/index")
                    } else {
                        console.log("账号密码不对");
                    }

                })

            }
        }
    }
</script>

<style>
    .login-outer{
        margin: 1px;
        padding: 4%;
    }
    .login {
        border-radius: 15px;
        background-clip: padding-box;
        margin:10% 60%;
        width: 25%;
        padding: 10px 20px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        background-color: white;
    }
</style>