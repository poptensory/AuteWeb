let serverAddress = getServerAddress();

$("#title").html($.cookie("timeLineName"));
$("#titleLine").html($.cookie("timeLineName")+"的流量基于时间的变化曲线");


// 时间戳日期转换
Date.prototype.format = function(format) {
    let date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};


// 时间戳转化成日期
function formattime(timestamp){
    let newDate = new Date();
    newDate.setTime(timestamp);
    return newDate.format('yyyy-MM-dd h:m:s');
}


// 设置日历格式
$('#datepicker').datepicker({
    autoclose: true,
    dateFormat: "yyyy-mm-dd",
    language: 'zh-CN',
    todayHighlight: true
});


// 初始化日历输入框
let now = Date.parse(new Date());
let t = formattime(now).substring(0,10);
$('#datepicker').datepicker('update',t );
$('#btnSearchLog').trigger('click'); //load logs


// 通过同步，返回请求的数据:[最热的20个内部IP]
function getInnerHotIP(){
    let res = null;
    $.ajax({
        url:serverAddress+"/hbase/test/getInnerHotIP",
        type:"get",
        async:false,
        success:function (data) {
            res = data;
        }
    });
    return res;
}

// 绘制第一个饼图
drawPie1();
function drawPie1() {
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
}


// 绘制热点AP的饼图
drawPie2();
function drawPie2() {

    let data = getInnerHotIP();

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
}


// 绘制外部热点IP的饼图
drawPie3();
function drawPie3() {

    let data =getInnerHotIP();

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
}


// 绘制流量变化曲线图
drawTrafficTimeLine();
function drawTrafficTimeLine() {

    // 此处传入id, 获取 图线的 第0个对象
    let campusTrafficChartCanvas = $('#singleTrafficChart').get(0).getContext('2d');
    let campusTrafficChart       = new Chart(campusTrafficChartCanvas);

    // 准备数据
    let data = [18, 13, 10, 5, 5, 3, 4.5, 5, 8, 10, 13, 15, 18, 15, 10, 8, 7.5, 9.9, 15, 18, 18.8, 19.5, 22.5, 25, 20];
    let xLabel = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    // 设置数据和一些配置
    let campusTrafficChartData = {
        labels  : xLabel,
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

