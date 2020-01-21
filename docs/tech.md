# JavaScript基础
# node.js基础
## 系统软件包管理器
这里各个系统包管理器的思路大概都是：

检查软件包的依赖关系，找到该软件包依赖的所有软件包，得到所有依赖关系的信息文件
根据依赖关系的信息文件从软件源所指 的镜像站点中，下载相关软件包，解压软件包
解压后的软件包有两种内容：可执行文件和源程序
如果包中是源程序，还需要编译器将其编译成为可执行文件
根据可执行文件完成应用程序的安装和配置
参考：[apt-get原理解析、应用软件安装包常识、Linux下软件的安装与管理(四)][https://cloud.tencent.com/developer/article/1184743]
：https://www.jianshu.com/p/40fbe1bc8e2d

# npm
npm是一个包管理器。开发者使用npm命令从npm安装包、发布包，从而可以分享和复用代码。
普通开发者可能通过npm官网注册账号，进而发布自己的npm包。
## NPM原理
npm也是基本上也是这个思路。不同的是，基于nodejs的流行，npm大部分的安装包都是从npm自身的代码仓库进行下载安装的。npm有基于couchdb的数据库，详细记录了每个包的信息，包括作者、版本、依赖、授权信息等。它的一个很重要的作用就是：将开发者从繁琐的包管理工作（版本、依赖等）中解放出来，更加专注于功能的开发。

至此，可能对npm有一个大概的了解了，但是还有很多的不足，需要进一步的巩固。

总结
npm通过在自己的代码仓库中存储各个包、在自己的数据库中存储各个包的信息，然后通过npm的命令对包进行管理。

所谓的管理，就是基本的CRUD操作；npm包管理器，即可以通过npm进行创建、读取、更新以及删除包的操作。

所以npm的实质则是，通过npm命令去操作自己的数据库，并将操作的结果反馈给用户。

操作数据库这个过程涉及到依赖关系的查询。
反馈给用户这个过程涉及到编译、系统操作等。


## NPM运行 run
## 1、ERR引发的思考
创建好的 vue 项目直接执行 vue run dev 报错？运行 vue run serve 就可以启动...如下

npm run dev
npm ERR! missing script: dev

npm ERR! A complete log of this run can be found in:
npm ERR!     E:\nodejs\node_cache\_logs\2018-12-12T15_06_08_674Z-debug.log
## 2、dev build serve?
其实 npm run dev 或者是 npm run serve 等 npm run xxx 并不是一定要这么写。
npm run XXX是执行配置在 package.json 中的脚本，比如：

"scripts": {
　　"serve": "vue-cli-service serve",
　　"build": "vue-cli-service build",
　　"lint": "vue-cli-service lint"
},
npm run xxx 中的 xxx 可以理解为键值对的 key，实际上 run 的是在 package.json 里面 scripts 配置的 value；

比如，npm run serve 实际运行的是 vue-cli-service serve；

而放在 3.0 以前运行的则是 node build/dev-server.js 文件；

这时候我们再来看上边的问题是不是豁然了呢， scripts 中并没有配置 dev ，所以控制台报了 [ missing script: dev ] 的错误 ；

 

### 3、总结
npm run xxx，并不是你想运行就运行的，只有在 package.json scripts 配置了，你才能 run 的，所以不是所有的项目都能 npm run dev/build。

要了解这些命令做了什么，就要去scripts中看具体执行的是什么代码。

这里就像是一些命令的快捷方式，免去每次都要输入很长的的命令（比如 serve 那行）

一般项目都会有 build, dev, unit 等，所以起名，最起码要从名字上基本能看出来是干什么的。

### 4、npm参考资料
> http://www.ruanyifeng.com/blog/2016/01/npm-install.html