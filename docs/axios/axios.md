# Axios

## 什么是 axios？

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。可以配合当前流利的Js框架整合使用，比如`vue`,`nuxjs`,`react`。

## 技术栈

前端：`vue`,`axios`

后端：`spring gateway `

## 安装 axios

使用 npm:

```javascript
$ npm install axios
```

使用 bower:

```js
$ bower install axios
```

使用 cdn:

```javascript
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## axios全局配置

### 前端配置

在main.js添加如下相关配置

```javascript
// 配置axios请求的地址
axios.defaults.baseURL = 'http://127.0.0.1:8765/'
// 设置请求超时时间
axios.defaults.timeout = 5000
// 配置POST默认请求类型，如果不配置，默认method=OPTIONS
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 是否允许跨域
axios.defaults.crossDomain = true
// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.withCredentials = true
// 设置请求头为 Authorization(已经加密处理)
axios.defaults.headers.common.Authorization = 'Basic ZGVtb19jbGllbnQ6MTIzNDU2'
// 赋值给vue
Vue.prototype.$axios = axios
```

### 后端配置

主要是`spring gateway`的跨域配置,否则请求会报403

```java
 /**
     * 配置跨域(如果不配置此相关参数,使用vue + axios发送POST请求时会出现403错误)
     * @return
     */
    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // cookie跨域
        config.setAllowCredentials(Boolean.TRUE);
        config.addAllowedMethod("*");
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        // 配置前端js允许访问的自定义响应头
        config.addExposedHeader("setToken");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(new PathPatternParser());
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }
```

## Axios发起POST

注意要安装qs包，使用以下命令安装

> npm install qs

```javascript
//构造请求参数  
const data = { username: 'luoyq', password: '123456' }
                this.$axios.post('/oauth/auth', 
                                 qs.stringify(data) //QS进行请求数据转换，否则后端无法收到请求参数
                                )
                .then(response => {
                    console.log(response)
                    // 登陆成功 设置用户信息
                    localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/19337417?s=400&amp')
                    localStorage.setItem('userName', 'roboslyq')
                    // 登陆成功 假设这里是后台返回的 token
                    localStorage.setItem('token', 'i_am_token')
                    this.$router.push({ path: this.redirect || '/' })
                }).catch(error => {
                    console.log(error)
                })
            } else {
                if (this.account !== 'admin') {
                    this.accountError = '账号为admin'
                }

                if (this.pwd !== 'admin') {
                    this.pwdError = '密码为admin'
                }
            }
            this.isShowLoading = false
        }
```

### 收到响应

```json
{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsdW95cSIsInNjb3BlIjpbImFsbCJdLCJwcm9qZWN0IjoiZWFzeS1jbG91ZC1wbGF0Zm9ybSIsImNvbXBhbnkiOiJ5eGprIiwiZXhwIjoxNTc5NjY0MjEwLCJhdXRob3JpdGllcyI6WyJhZG1pbiIsIlJPTEVfVVNFUiJdLCJqdGkiOiJhMjMyMzQxNC05MWE1LTRmMWMtOWFhNS04NzM2NzFhYjY4MDQiLCJjbGllbnRfaWQiOiJkZW1vX2NsaWVudCJ9.d6JP12koYRZd1RS6RVGIrkMuXLhgwUxBwbm1bJ0l-tVbH3Azd_YNH7dwyFDLOaty7B4PIgAMSODodnIawobVa0EOxrrBHx8D3Mf7Og6FBWqQuGLdgRs-hDf8UbAS3ooRlWF8lfufjKC13y-0FNTHHxx14aASY1FOilnSIi-gkHoZm4Fj6JzXIRpzt9bYHz3CxGeudHfBHUTTiBolUuVaHC_d--kEOfo8hFNScySXu6Gs-Wm_nursDa-7TOgPmDLKB4XX_sOAjJD64PEk077iidJt42akOD3QmUpMdpnanR85DDrSC26T9xgQrxtzBfbAeG6LRtGugcmRKDgV3OloDQ","token_type":"bearer","refresh_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsdW95cSIsInNjb3BlIjpbImFsbCJdLCJhdGkiOiJhMjMyMzQxNC05MWE1LTRmMWMtOWFhNS04NzM2NzFhYjY4MDQiLCJwcm9qZWN0IjoiZWFzeS1jbG91ZC1wbGF0Zm9ybSIsImNvbXBhbnkiOiJ5eGprIiwiZXhwIjoxNTgyMjQ5MDEwLCJhdXRob3JpdGllcyI6WyJhZG1pbiIsIlJPTEVfVVNFUiJdLCJqdGkiOiIyOGI2MzM2OS05NDhmLTQ2ZDItYjUzNC1hNzJlOTFkYzJmYzkiLCJjbGllbnRfaWQiOiJkZW1vX2NsaWVudCJ9.G42GV1TMBodbFGFT0puPeOVX62BrEWFKeAwLfif8wwlinAAXYSX3wXVu0rmOZK0mLD2w6IC9L32hQMhNX8iMGUGNS_dpA_jQgW_lxf_6dP6NR22c310DaYVTXigZXysADl2F6wWAurrKy2sEHE5QIMLNZvh6u1yQCg3rA3Q0ye1lVPD5Ntl2sOWOiga3-joW7iAxmJEBctijNrpUMmCOuYlZNa7O3yWghDPFXXs3VuN9gYNxoUj2kM1VqWwINatxPE2va1sAQGF8pYeVsO9gGR0uAcHyTQL51uI8AMmiuE-TQcKmcfQoXHC1mt7CFtmmJU4YT8hnLQdaNuWqwwpXlA","expires_in":7199,"scope":"all","project":"easy-cloud-platform","company":"yxjk","jti":"a2323414-91a5-4f1c-9aa5-873671ab6804"}
```



## 参考资料

[axios中文网](http://www.axios-js.com/zh-cn/docs/index.html)