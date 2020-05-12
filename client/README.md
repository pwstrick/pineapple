## 菠萝监控系统的前端部分

后台的界面结构采用了之前封装过的[Matrix](https://github.com/pwstrick/grape-skin)，组件库使用了目前流行的[Ant Design](https://ant.design/components/button-cn/)。

### 1）项目管理
首先建立一个项目，然后才能分析该项目的性能和错误。

![创建项目](https://github.com/pwstrick/pineapple/blob/master/client/public/img/ui/v1.0/1.png)

用弹框的形式来创建项目，使用了Ant Design的Model、Form等组件。

![项目弹框](https://github.com/pwstrick/pineapple/blob/master/client/public/img/ui/v1.0/2.png)

### 2）性能分析
在第一个折线图标签中的过滤条件包括项目、字段、日期等，性能指标按平均值呈现，可看到每个性能指标的趋势。

![性能折线图](https://github.com/pwstrick/pineapple/blob/master/client/public/img/ui/v1.0/3.png)

在第二个列表标签中，可以详细看到每条记录的信息，包括代理、网络等，便于在了解趋势的前提下，获悉更为细节的内容。

![性能列表](https://github.com/pwstrick/pineapple/blob/master/client/public/img/ui/v1.0/4.png)

点击异步请求那一列的某个单元格，可弹出具体的请求信息。

![ajax信息](https://github.com/pwstrick/pineapple/blob/master/client/public/img/ui/v1.0/5.png)

### 3）错误分析
有三个标签，第一个也是折线图，描绘的是某个时间的错误个数；第二个是错误列表，会给出具体的错误信息。

![错误列表](https://github.com/pwstrick/pineapple/blob/master/client/public/img/ui/v1.0/6.png)

第三个是饼图，饼图主要体现的是发生错误的浏览器分布情况，点击某一块可查看浏览器的具体版本。

![浏览器分布](https://github.com/pwstrick/pineapple/blob/master/client/public/img/ui/v1.0/7.png)