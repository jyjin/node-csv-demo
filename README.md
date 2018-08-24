# READ ME
本例主要演示大数据csv的读取及异步存储

其中通过设置csvStatic.length，来设置分片读取的长度。

共有两种方案，推荐方案二




#### 1.初始化项目环境

```
    npm install
```
#### 2.运行
```
    npm run start // 方案一效果

    npm run startv1 // 方案二效果
```

####  3.说明

##### 【方案一 】
`app.js`主要演示使用`fast-csv`包读取excel

- 分片读取
- 异步读取等待

> 实验结果：`该方法无法处理GBK编码的中文csv`

##### 【方案二】
`app-v1.js`主要演示`iconv-lite`解决字符编码问题
- 一次性读取csv
-  对csv分片
-  异步保存处理

> 实验结果：`效率较高，可行`

#### 4.技术关键词

- iconv-lite 一款编码转换的包
- fast-csv   一款支持异步读取csv的包
- processBar 自行编写的进度条组件


`create by - jyjin`

`2018.08.22`