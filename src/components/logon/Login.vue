<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">ECP后台管理系统登录</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="account" placeholder="用户名" clearable @on-blur="verifyAccount"/>
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"/>
                <p class="error">{{pwdError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登录</Button>
            <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
        </div>
    </div>
</template>

<script>
import qs from 'qs'

export default {
    name: 'login',
    data() {
        return {
            account: 'luoyq',
            pwd: '123456',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {},
        }
    },
    created() {
        this.bg.backgroundImage = 'url(' + require('../../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    methods: {
        verifyAccount() {
            if (this.account == '') {
                this.accountError = '请输入账号'
            } else {
                this.accountError = ''
            }
        },
        verifyPwd() {
            if (this.pwd == '') {
                this.pwdError = '请输入密码'
            } else {
                this.pwdError = ''
            }
        },
        register() {

        },
        forgetPwd() {

        },
        submit() {
            // debugger
            this.isShowLoading = true
            const data = { username: this.account, password: this.pwd }
            this.$axios.post('/oauth/auth', qs.stringify(data))
            .then(response => {
                console.log(response)
                this.isShowLoading = false
                // 登陆成功 设置用户信息（TODO：目前设置为我自己的github头像，实际生产根据实际情况使用）
                localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/19337417?s=400&amp')
                localStorage.setItem('userName', this.account)
                // 登陆成功 假设这里是后台返回的 token
                if (response.data == null || response.data == undefined) {
                    localStorage.setItem('token', response.access_token)
                } else {
                    localStorage.setItem('token', response.data.access_token)
                }
                this.$router.push({ path: this.redirect || '/' })
            }).catch(error => {
                console.log(error)
                this.pwdError = '用户名或密码错误'
                this.isShowLoading = false
            })
        },
    },
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>
