let host = "http://192.168.1.146";
let port = ":8086";


// 获取内部热点IP
function getInnerHotIP(){
    let res = null;
    $.ajax({
        url:host+port+"/hbase/test/getInnerHotIP",
        type:"get",
        async:false,
        success:function (data) {
            res = data;
        }
    });
    return res;
}


// 绘制内部热点IP的饼图
drawInnerHotIP();
function drawInnerHotIP() {
    let data = getInnerHotIP();
    let pieChartCanvas = $('#innerHotIPPieChart').get(0).getContext('2d');
    let pieChart       = new Chart(pieChartCanvas);
    let colors = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    let highlights = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    let PieData = new Array();
    let max_size = -1;
    for (let i=0;i<data.length;i++){
        PieData[i] = {
            value    : data[i].pk_size,
            color    : colors[i],
            highlight: highlights[i],
            label    : data[i].ip
        };
        if(max_size<data[i].pk_size){
            max_size = data[i].pk_size;
        }
    }
    let pieOptions     = {
        // 每个块上显示信息
        segmentShowStroke    : true,
        // 块上信息的颜色
        segmentStrokeColor   : '#fff',
        // 每个块之间的间隔距离
        segmentStrokeWidth   : 1,
        // 1-扇形的宽度占总半径的比例, 如果是0就是饼图
        percentageInnerCutout: 50,
        // 载入饼图的时候动画的时间长短
        animationSteps       : 100,
        // 动画效果
        animationEasing      : 'easeOutBounce',
        // 动画是否旋转
        animateRotate        : true,
        // 是否从中心开始放大
        animateScale         : false,
        // 是否根据窗口大小改变自身的大小
        responsive           : true,
        // 是否保持横纵比例
        maintainAspectRatio  : false,
        // 设置图例
        // legendTemplate       : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (let i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        // 设置鼠标悬浮在块上的显示文字
        tooltipTemplate      : '<%=label%>/<%=value %>'
    };
    pieChart.Doughnut(PieData, pieOptions);

    // 进度条
    for(let i=0;i<data.length;i++){
        let progressBar = '<div class="progress-group" style="height: 25px">\n' +
            '<span class="progress-text"><a href="single.html"  opt="timeLine" name="'+data[i].ip+'">'+data[i].ip+'</a></span>\n' +
            '<span class="progress-number"><b>'+data[i].pk_size+'</b>/'+max_size+'</span>\n' +
            '<div class="progress sm" style="height: 5px;">\n' +
            '<div class="progress-bar progress-bar-aqua" style="width: '+100*data[i].pk_size/max_size+'%; background-color: '+colors[i]+'"></div>\n' +
            '</div>\n' +
            '</div>';
        $("#innerHotIPProgressBar").append(progressBar);
    }
}


// 获取热点AP
function getHotAPData(){
    let res = null;
    $.ajax({
        url:host+port+"/hbase/test/getHotAP",
        type:"get",
        async:false,
        success:function (data) {
            res = data;
        }
    });
    return res;
}


// 绘制热点AP的饼图 和 进度条
drawHotAP();
function drawHotAP() {
    let data = getHotAPData();
    let pieChartCanvas = $('#hotAPPieChart').get(0).getContext('2d');
    let pieChart       = new Chart(pieChartCanvas);
    let colors = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    let highlights = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    let PieData = new Array();
    let max_size = -1;
    for (let i=0;i<data.length;i++){
        PieData[i] = {
            value    : data[i].pk_size,
            color    : colors[i],
            highlight: highlights[i],
            label    : data[i].ap
        };
        if(max_size<data[i].pk_size){
            max_size = data[i].pk_size;
        }
    }
    let pieOptions     = {
        // 每个块上显示信息
        segmentShowStroke    : true,
        // 块上信息的颜色
        segmentStrokeColor   : '#fff',
        // 每个块之间的间隔距离
        segmentStrokeWidth   : 1,
        // 1-扇形的宽度占总半径的比例, 如果是0就是饼图
        percentageInnerCutout: 50,
        // 载入饼图的时候动画的时间长短
        animationSteps       : 100,
        // 动画效果
        animationEasing      : 'easeOutBounce',
        // 动画是否旋转
        animateRotate        : true,
        // 是否从中心开始放大
        animateScale         : false,
        // 是否根据窗口大小改变自身的大小
        responsive           : true,
        // 是否保持横纵比例
        maintainAspectRatio  : false,
        // 设置图例
        // legendTemplate       : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (let i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        // 设置鼠标悬浮在块上的显示文字
        tooltipTemplate      : '<%=label%>/<%=value %>'
    };
    pieChart.Doughnut(PieData, pieOptions);

    // 进度条
    for(let i=0;i<data.length;i++){
        let progressBar = '<div class="progress-group" style="height: 25px">\n' +
            '<span class="progress-text"><a href="single.html"  opt="timeLine" name="'+data[i].ap+'">'+data[i].ap+'</a></span>\n' +
            '<span class="progress-number"><b>'+data[i].pk_size+'</b>/'+max_size+'</span>\n' +
            '<div class="progress sm" style="height: 5px;">\n' +
            '<div class="progress-bar progress-bar-aqua" style="width: '+100*data[i].pk_size/max_size+'%; background-color: '+colors[i]+'"></div>\n' +
            '</div>\n' +
            '</div>';
        $("#hotAPProgressBar").append(progressBar);
    }
}


// 绘制外部热点IP的饼图和进度条
setOutterHotIP();
function setOutterHotIP() {
    let data = [
        {"ip":'10.12.12.23', 'pk_num': 881, 'pk_size': 1802132},
        {"ip":'10.12.13.5', 'pk_num': 432, 'pk_size': 1552132},
        {"ip":'10.12.12.15', 'pk_num': 253, 'pk_size': 1452132},
        {"ip":'10.0.13.9', 'pk_num': 214, 'pk_size': 1302132},
        {"ip":'10.12.1.24', 'pk_num': 172, 'pk_size': 1220132},
        {"ip":'10.8.0.5', 'pk_num': 178, 'pk_size': 1152132},
        {"ip":'10.2.3.5', 'pk_num': 129, 'pk_size': 1052132},
        {"ip":'10.12.13.155', 'pk_num': 122, 'pk_size': 991132},
        {"ip":'10.12.13.52', 'pk_num': 121, 'pk_size': 894132},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 702132},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 621322},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 521323},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 421327},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 321321},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 221324},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 121327},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 111329},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 102132},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 92132},
        {"ip":'10.12.1.89', 'pk_num': 109, 'pk_size': 52132},
    ];

    let pieChartCanvas = $('#outterHotIPPieChart').get(0).getContext('2d');
    let pieChart       = new Chart(pieChartCanvas);
    let colors = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    let highlights = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    let PieData = new Array();
    let max_size = -1;
    for (let i=0;i<data.length;i++){
        PieData[i] = {
            value    : data[i].pk_size,
            color    : colors[i],
            highlight: highlights[i],
            label    : data[i].ip
        };
        if(max_size<data[i].pk_size){
            max_size = data[i].pk_size;
        }
    }
    let pieOptions     = {
        // 每个块上显示信息
        segmentShowStroke    : true,
        // 块上信息的颜色
        segmentStrokeColor   : '#fff',
        // 每个块之间的间隔距离
        segmentStrokeWidth   : 1,
        // 1-扇形的宽度占总半径的比例, 如果是0就是饼图
        percentageInnerCutout: 50,
        // 载入饼图的时候动画的时间长短
        animationSteps       : 100,
        // 动画效果
        animationEasing      : 'easeOutBounce',
        // 动画是否旋转
        animateRotate        : true,
        // 是否从中心开始放大
        animateScale         : false,
        // 是否根据窗口大小改变自身的大小
        responsive           : true,
        // 是否保持横纵比例
        maintainAspectRatio  : false,
        // 设置图例
        // legendTemplate       : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (let i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        // 设置鼠标悬浮在块上的显示文字
        tooltipTemplate      : '<%=label%>/<%=value %>'
    };
    pieChart.Doughnut(PieData, pieOptions);

    // 进度条
    for(let i=0;i<data.length;i++){
        let progressBar = '<div class="progress-group" style="height: 25px">\n' +
            '<span class="progress-text"><a href="single.html" opt="timeLine" name='+data[i].ip+'>'+data[i].ip+'</a></span>\n' +
            '<span class="progress-number"><b>'+data[i].pk_size+'</b>/'+max_size+'</span>\n' +
            '<div class="progress sm" style="height: 5px;">\n' +
            '<div class="progress-bar progress-bar-aqua" style="width: '+100*data[i].pk_size/max_size+'%; background-color: '+colors[i]+'"></div>\n' +
            '</div>\n' +
            '</div>';
        $("#outterHotIPProgressBar").append(progressBar);
    }
}


// 绘制热点域名的饼图和进度条
setHotDomainName();
function setHotDomainName() {

    let data = [
        {"ip":'https://www.baidu.com', 'pk_num': 881, 'pk_size': 1802132},
        {"ip":'https://www.tmall.com', 'pk_num': 432, 'pk_size': 1552132},
        {"ip":'https://www.taobao.com', 'pk_num': 253, 'pk_size': 1452132},
        {"ip":'https://www.souhu.com', 'pk_num': 253, 'pk_size': 1452132},
        {"ip":'https://www.jd.com', 'pk_num': 214, 'pk_size': 1302132},
        {"ip":'https://www.weibo.com', 'pk_num': 172, 'pk_size': 1220132},
        {"ip":'https://www.sina.com.cn', 'pk_num': 178, 'pk_size': 1152132},
        {"ip":'https://www.360.cn', 'pk_num': 129, 'pk_size': 1052132},
        {"ip":'https://www.csdn.net', 'pk_num': 122, 'pk_size': 991132},
        {"ip":'https://www.alipay.com', 'pk_num': 121, 'pk_size': 894132},
        {"ip":'https://www.bilibili.com', 'pk_num': 109, 'pk_size': 702132},
        {"ip":'https://www.xinhuanet.com', 'pk_num': 109, 'pk_size': 621322},
        {"ip":'https://www.babytree.com', 'pk_num': 109, 'pk_size': 521323},
        {"ip":'https://www.soso.com', 'pk_num': 109, 'pk_size': 421327},
        {"ip":'https://www.163.com', 'pk_num': 109, 'pk_size': 321321},
        {"ip":'https://www.zhihu.com', 'pk_num': 109, 'pk_size': 221324},
        {"ip":'https://www.tianya.cn', 'pk_num': 109, 'pk_size': 121327},
        {"ip":'https://www.hao123.com', 'pk_num': 109, 'pk_size': 111329},
        {"ip":'https://www.so.com', 'pk_num': 109, 'pk_size': 102132},
        {"ip":'https://www.iqiyi.com', 'pk_num': 109, 'pk_size': 92132},
    ];

    let pieChartCanvas = $('#hotDomainNamePieChart').get(0).getContext('2d');
    let pieChart = new Chart(pieChartCanvas);
    let colors = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    let highlights = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    let PieData = new Array();

    let max_size = -1;
    for (let i=0;i<data.length;i++){
        PieData[i] = {
            value    : data[i].pk_size,
            color    : colors[i],
            highlight: highlights[i],
            label    : data[i].ip
        };
        if(max_size<data[i].pk_size){
            max_size = data[i].pk_size;
        }
    }
    let pieOptions     = {
        // 每个块上显示信息
        segmentShowStroke    : true,
        // 块上信息的颜色
        segmentStrokeColor   : '#fff',
        // 每个块之间的间隔距离
        segmentStrokeWidth   : 1,
        // 1-扇形的宽度占总半径的比例, 如果是0就是饼图
        percentageInnerCutout: 50,
        // 载入饼图的时候动画的时间长短
        animationSteps       : 100,
        // 动画效果
        animationEasing      : 'easeOutBounce',
        // 动画是否旋转
        animateRotate        : true,
        // 是否从中心开始放大
        animateScale         : false,
        // 是否根据窗口大小改变自身的大小
        responsive           : true,
        // 是否保持横纵比例
        maintainAspectRatio  : false,
        // 设置图例
        // legendTemplate       : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (let i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        // 设置鼠标悬浮在块上的显示文字
        tooltipTemplate      : '<%=label%>/<%=value %>'
    };
    pieChart.Doughnut(PieData, pieOptions);

    // 进度条
    for(let i=0;i<data.length;i++){
        let progressBar = '<div class="progress-group" style="height: 25px">\n' +
            '<span class="progress-text"><a href="single.html" opt="timeLine" name='+data[i].ip+'>'+data[i].ip+'</a></span>\n' +
            '<span class="progress-number"><b>'+data[i].pk_size+'</b>/'+max_size+'</span>\n' +
            '<div class="progress sm" style="height: 5px;">\n' +
            '<div class="progress-bar progress-bar-aqua" style="width: '+100*data[i].pk_size/max_size+'%; background-color: '+colors[i]+'"></div>\n' +
            '</div>\n' +
            '</div>';
        $("#hotDomainNameProgressBar").append(progressBar);
    }
}


// 绘制全校流量关于时间变化的曲线
drawCampusTrafficTimeLine();
function drawCampusTrafficTimeLine() {
    let campusTrafficChartCanvas = $('#campusTrafficChart').get(0).getContext('2d');
    let campusTrafficChart       = new Chart(campusTrafficChartCanvas);
    let data = [18, 13, 10, 5, 5, 3, 4.5, 5, 8, 10, 13, 15, 18, 15, 10, 8, 7.5, 9.9, 15, 18, 18.8, 19.5, 22.5, 25, 20];
    let campusTrafficChartData = {
        labels  : ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        datasets: [
            {
                label               : 'Digital Goods',
                fillColor           : 'rgba(60,141,188,0.9)',
                strokeColor         : 'rgba(60,141,188,0.8)',
                pointColor          : '#3b8bba',
                pointStrokeColor    : 'rgba(60,141,188,1)',
                pointHighlightFill  : '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data                : data
            }
        ]
    };

    let campusTrafficChartOptions = {
        // 是否显示横纵轴
        showScale               : true,
        // 是否显示网格
        scaleShowGridLines      : true,
        // 网格线条的颜色
        scaleGridLineColor      : 'rgba(0,0,0,.05)',
        // 网格的宽度
        scaleGridLineWidth      : 1,
        // 是否显示水平线(X轴除外)
        scaleShowHorizontalLines: true,
        // 是否显示垂直线(Y轴除外)
        scaleShowVerticalLines  : true,
        // 点之间的线是否为平滑的曲线
        bezierCurve             : false,
        // 点之间曲线的贝塞尔曲线的张力
        bezierCurveTension      : 0.3,
        // 是否在图中将点显示出来
        pointDot                : false,
        // 点的大小(px)
        pointDotRadius          : 4,
        // 点描边的像素宽度
        pointDotStrokeWidth     : 1,
        // 为了在绘制点之外进行命中检测，需要在半径上添加额外的量
        pointHitDetectionRadius : 20,
        // 是否显示数据集的笔画
        datasetStroke           : true,
        // 数据集壁画的宽度(px)
        datasetStrokeWidth      : 2,
        // 是否用颜色填充曲线下方的面积
        datasetFill             : true,
        // 图例模板
        //legendTemplate          : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (let i=0; i<datasets.length; i++){%><li><span style=\'background-color: <%=datasets[i].lineColor%>\'></span><%=dataSets[i].label%></li><%}%></ul>',
        // 是否保持长宽比
        maintainAspectRatio     : true,
        // 是否根据窗口大小相应大小
        responsive              : true
    };
    campusTrafficChart.Line(campusTrafficChartData, campusTrafficChartOptions);
}


// 设置每个热点项的点击事件，链接已经设置，现在设置共享数据的cookie
setListener();
function setListener() {
    $('a[opt="timeLine"]').click('on', function () {
        $.cookie("timeLineName", $(this).attr("name"));
    });
}