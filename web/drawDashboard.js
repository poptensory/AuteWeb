var host = "http://192.168.2.37";
var port = "8080";


// alert(11121);
//
// $.ajax(
//     {
//         url:host+port+"/hbase/test",
//         success:function (d) {
//             alert(d);
//         }
//     }
// );



// function getHotAPData(){
//     var res;
//     $.ajax({
//         url:"http://192.168.2.37:8080/hbase/getHotAP",
//         type:"get",
//         async:false,
//         success:function (data) {
//             // alert(data);
//             res = data;
//         }
//     });
//     return res;
// }



// 绘制内部热点IP的饼图

setInnerHotIP();
function setInnerHotIP() {

    // alert(23333);
    // var data = getHotAPData();
    // alert(data[1].ip);


     var data = [
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



    var pieChartCanvas = $('#innerHotIPPieChart').get(0).getContext('2d');

    var pieChart       = new Chart(pieChartCanvas);
    var colors = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];

    var highlights = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    var PieData = new Array();

    var max_size = -1;
    for (var i=0;i<data.length;i++){
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

    // var PieData        = [
    //     {
    //         value    : 700,
    //         color    : '#f56954',
    //         highlight: '#f56954',
    //         label    : 'Chrome'
    //     },
    //     {
    //         value    : 500,
    //         color    : '#00a65a',
    //         highlight: '#00a65a',
    //         label    : 'IE'
    //     },
    //     {
    //         value    : 400,
    //         color    : '#f39c12',
    //         highlight: '#f39c12',
    //         label    : 'FireFox'
    //     },
    //     {
    //         value    : 600,
    //         color    : '#00c0ef',
    //         highlight: '#00c0ef',
    //         label    : 'Safari'
    //     },
    //     {
    //         value    : 300,
    //         color    : '#3c8dbc',
    //         highlight: '#3c8dbc',
    //         label    : 'Opera'
    //     },
    //     {
    //         value    : 100,
    //         color    : '#d2d6de',
    //         highlight: '#d2d6de',
    //         label    : 'Navigator'
    //     }
    // ];

    var pieOptions     = {
        // Boolean - Whether we should show a stroke on each segment
        segmentShowStroke    : true,
        // String - The colour of each segment stroke
        segmentStrokeColor   : '#fff',
        // Number - The width of each segment stroke
        segmentStrokeWidth   : 1,
        // Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        // Number - Amount of animation steps
        animationSteps       : 100,
        // String - Animation easing effect
        animationEasing      : 'easeOutBounce',
        // Boolean - Whether we animate the rotation of the Doughnut
        animateRotate        : true,
        // Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale         : false,
        // Boolean - whether to make the chart responsive to window resizing
        responsive           : true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio  : false,
        // String - A legend template
        legendTemplate       : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        // String - A tooltip template
        tooltipTemplate      : '<%=label%>/<%=value %>'
    };
    // Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);
    // -----------------
    // - END PIE CHART -
    // -----------------


    // 进度条
    for(var i=0;i<data.length;i++){
        var progressBar = '<div class="progress-group" style="height: 25px">\n' +
            '                    <span class="progress-text"><a href="lineChart.html"  opt="timeLine" name="'+data[i].ip+'">'+data[i].ip+'</a></span>\n' +
            '                    <span class="progress-number"><b>'+data[i].pk_size+'</b>/'+max_size+'</span>\n' +
            '                    <div class="progress sm" style="height: 5px;">\n' +
            '                      <div class="progress-bar progress-bar-aqua" style="width: '+100*data[i].pk_size/max_size+'%; background-color: '+colors[i]+'"></div>\n' +
            '                    </div>\n' +
            '                  </div>';
        $("#innerHotIPProgressBar").append(progressBar);
    }
}


// 绘制热点AP的饼图
setHotAP();
function setHotAP() {

    var data = [
        {"ap":'hsd-wd11-323', 'pk_num': 881, 'pk_size': 179720444},
        {"ap":'hsd-ed02-632', 'pk_num': 432, 'pk_size': 131007617},
        {"ap":'hsd-ed01-424', 'pk_num': 253, 'pk_size': 129550073},
        {"ap":'hsd-ed02-321', 'pk_num': 214, 'pk_size': 129008834},
        {"ap":'hsd-xld04-634', 'pk_num': 172, 'pk_size': 117940386},
        {"ap":'hsd-ed01-314', 'pk_num': 178, 'pk_size': 114208055},
        {"ap":'hsd-ed02-314', 'pk_num': 129, 'pk_size': 109072890},
        {"ap":'hsd-wd05-313', 'pk_num': 122, 'pk_size': 107395729},
        {"ap":'hsd-wd01-401', 'pk_num': 121, 'pk_size': 96803927},
        {"ap":'hsd-xld01-636', 'pk_num': 109, 'pk_size': 91306367},
        {"ap":'hsd-wd05-119', 'pk_num': 109, 'pk_size': 90505867},
        {"ap":'hsd-xld01-525', 'pk_num': 109, 'pk_size': 90327463},
        {"ap":'hsd-wd11-215', 'pk_num': 109, 'pk_size': 87054201},
        {"ap":'hsd-ed01-313', 'pk_num': 109, 'pk_size': 86679579},
        {"ap":'hsd-xld01-530', 'pk_num': 109, 'pk_size': 79207423},
        {"ap":'hsd-ed08-512', 'pk_num': 109, 'pk_size': 77332595},
        {"ap":'hsd-xld08-207', 'pk_num': 109, 'pk_size': 73653717},
        {"ap":'hsd-ed02-101', 'pk_num': 109, 'pk_size': 71664292},
        {"ap":'hsd-wd05-106', 'pk_num': 109, 'pk_size': 71551725},
        {"ap":'hsd-ed02-119', 'pk_num': 109, 'pk_size': 69707430},
    ];

    var pieChartCanvas = $('#hotAPPieChart').get(0).getContext('2d');

    var pieChart       = new Chart(pieChartCanvas);
    var colors = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];

    var highlights = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    var PieData = new Array();

    var max_size = -1;
    for (var i=0;i<data.length;i++){
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

    // var PieData        = [
    //     {
    //         value    : 700,
    //         color    : '#f56954',
    //         highlight: '#f56954',
    //         label    : 'Chrome'
    //     },
    //     {
    //         value    : 500,
    //         color    : '#00a65a',
    //         highlight: '#00a65a',
    //         label    : 'IE'
    //     },
    //     {
    //         value    : 400,
    //         color    : '#f39c12',
    //         highlight: '#f39c12',
    //         label    : 'FireFox'
    //     },
    //     {
    //         value    : 600,
    //         color    : '#00c0ef',
    //         highlight: '#00c0ef',
    //         label    : 'Safari'
    //     },
    //     {
    //         value    : 300,
    //         color    : '#3c8dbc',
    //         highlight: '#3c8dbc',
    //         label    : 'Opera'
    //     },
    //     {
    //         value    : 100,
    //         color    : '#d2d6de',
    //         highlight: '#d2d6de',
    //         label    : 'Navigator'
    //     }
    // ];

    var pieOptions     = {
        // Boolean - Whether we should show a stroke on each segment
        segmentShowStroke    : true,
        // String - The colour of each segment stroke
        segmentStrokeColor   : '#fff',
        // Number - The width of each segment stroke
        segmentStrokeWidth   : 1,
        // Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        // Number - Amount of animation steps
        animationSteps       : 100,
        // String - Animation easing effect
        animationEasing      : 'easeOutBounce',
        // Boolean - Whether we animate the rotation of the Doughnut
        animateRotate        : true,
        // Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale         : false,
        // Boolean - whether to make the chart responsive to window resizing
        responsive           : true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio  : false,
        // String - A legend template
        legendTemplate       : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        // String - A tooltip template
        tooltipTemplate      : '<%=label%>/<%=value %>'
    };
    // Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);
    // -----------------
    // - END PIE CHART -
    // -----------------


    // 进度条
    for(var i=0;i<data.length;i++){
        var progressBar = '<div class="progress-group" style="height: 25px">\n' +
            '                    <span class="progress-text"><a href="lineChart.html"  opt="timeLine" name="'+data[i].ap+'">'+data[i].ap+'</a></span>\n' +
            '                    <span class="progress-number"><b>'+data[i].pk_size+'</b>/'+max_size+'</span>\n' +
            '                    <div class="progress sm" style="height: 5px;">\n' +
            '                      <div class="progress-bar progress-bar-aqua" style="width: '+100*data[i].pk_size/max_size+'%; background-color: '+colors[i]+'"></div>\n' +
            '                    </div>\n' +
            '                  </div>';
        $("#hotAPProgressBar").append(progressBar);
    }
}


// 绘制外部热点IP的饼图
setOutterHotIP();
function setOutterHotIP() {

    var data = [
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

    var pieChartCanvas = $('#outterHotIPPieChart').get(0).getContext('2d');

    var pieChart       = new Chart(pieChartCanvas);
    var colors = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];

    var highlights = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
    var PieData = new Array();

    var max_size = -1;
    for (var i=0;i<data.length;i++){
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

    // var PieData        = [
    //     {
    //         value    : 700,
    //         color    : '#f56954',
    //         highlight: '#f56954',
    //         label    : 'Chrome'
    //     },
    //     {
    //         value    : 500,
    //         color    : '#00a65a',
    //         highlight: '#00a65a',
    //         label    : 'IE'
    //     },
    //     {
    //         value    : 400,
    //         color    : '#f39c12',
    //         highlight: '#f39c12',
    //         label    : 'FireFox'
    //     },
    //     {
    //         value    : 600,
    //         color    : '#00c0ef',
    //         highlight: '#00c0ef',
    //         label    : 'Safari'
    //     },
    //     {
    //         value    : 300,
    //         color    : '#3c8dbc',
    //         highlight: '#3c8dbc',
    //         label    : 'Opera'
    //     },
    //     {
    //         value    : 100,
    //         color    : '#d2d6de',
    //         highlight: '#d2d6de',
    //         label    : 'Navigator'
    //     }
    // ];

    var pieOptions     = {
        // Boolean - Whether we should show a stroke on each segment
        segmentShowStroke    : true,
        // String - The colour of each segment stroke
        segmentStrokeColor   : '#fff',
        // Number - The width of each segment stroke
        segmentStrokeWidth   : 1,
        // Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        // Number - Amount of animation steps
        animationSteps       : 100,
        // String - Animation easing effect
        animationEasing      : 'easeOutBounce',
        // Boolean - Whether we animate the rotation of the Doughnut
        animateRotate        : true,
        // Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale         : false,
        // Boolean - whether to make the chart responsive to window resizing
        responsive           : true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio  : false,
        // String - A legend template
        legendTemplate       : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        // String - A tooltip template
        tooltipTemplate      : '<%=label%>/<%=value %>'
    };
    // Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);
    // -----------------
    // - END PIE CHART -
    // -----------------


    // 进度条
    for(var i=0;i<data.length;i++){
        var progressBar = '<div class="progress-group" style="height: 25px">\n' +
            '                    <span class="progress-text"><a href="lineChart.html" opt="timeLine" name='+data[i].ip+'>'+data[i].ip+'</a></span>\n' +
            '                    <span class="progress-number"><b>'+data[i].pk_size+'</b>/'+max_size+'</span>\n' +
            '                    <div class="progress sm" style="height: 5px;">\n' +
            '                      <div class="progress-bar progress-bar-aqua" style="width: '+100*data[i].pk_size/max_size+'%; background-color: '+colors[i]+'"></div>\n' +
            '                    </div>\n' +
            '                  </div>';
        $("#outterHotIPProgressBar").append(progressBar);
    }
}

showCampusTraffic();

function showCampusTraffic() {
    // -----------------------
    // - MONTHLY SALES CHART -
    // -----------------------

    // Get context with jQuery - using jQuery's .get() method.
    var campusTrafficChartCanvas = $('#campusTrafficChart').get(0).getContext('2d');
    // This will get the first returned node in the jQuery collection.
    var campusTrafficChart       = new Chart(campusTrafficChartCanvas);


    var data = [18, 13, 10, 5, 5, 3, 4.5, 5, 8, 10, 13, 15, 18, 15, 10, 8, 7.5, 9.9, 15, 18, 18.8, 19.5, 22.5, 25, 20];

    var campusTrafficChartData = {

        labels  : ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        datasets: [
            // {
            //     label               : 'Electronics',
            //     fillColor           : 'rgb(210, 214, 222)',
            //     strokeColor         : 'rgb(210, 214, 222)',
            //     pointColor          : 'rgb(210, 214, 222)',
            //     pointStrokeColor    : '#c1c7d1',
            //     pointHighlightFill  : '#fff',
            //     pointHighlightStroke: 'rgb(220,220,220)',
            //     data                : [65, 59, 80, 81, 56, 55, 40]
            // },
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

    var campusTrafficChartOptions = {
        // Boolean - If we should show the scale at all
        showScale               : true,
        // Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines      : false,
        // String - Colour of the grid lines
        scaleGridLineColor      : 'rgba(0,0,0,.05)',
        // Number - Width of the grid lines
        scaleGridLineWidth      : 1,
        // Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        // Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines  : true,
        // Boolean - Whether the line is curved between points
        bezierCurve             : true,
        // Number - Tension of the bezier curve between points
        bezierCurveTension      : 0.3,
        // Boolean - Whether to show a dot for each point
        pointDot                : false,
        // Number - Radius of each point dot in pixels
        pointDotRadius          : 4,
        // Number - Pixel width of point dot stroke
        pointDotStrokeWidth     : 1,
        // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,
        // Boolean - Whether to show a stroke for datasets
        datasetStroke           : true,
        // Number - Pixel width of dataset stroke
        datasetStrokeWidth      : 2,
        // Boolean - Whether to fill the dataset with a color
        datasetFill             : true,
        // String - A legend template
        legendTemplate          : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].lineColor%>\'></span><%=datasets[i].label%></li><%}%></ul>',
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio     : true,
        // Boolean - whether to make the chart responsive to window resizing
        responsive              : true
    };

    // Create the line chart
    campusTrafficChart.Line(campusTrafficChartData, campusTrafficChartOptions);

    // ---------------------------
    // - END MONTHLY SALES CHART -
    // ---------------------------
}

setListener();
function setListener() {
    $('a[opt="timeLine"]').click('on', function () {
        $.cookie("timeLineName", $(this).attr("name"));
    });
}