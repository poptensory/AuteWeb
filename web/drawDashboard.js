// 绘制内部热点IP的饼图
setInnerHotIP();
function setInnerHotIP() {

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
            '                    <span class="progress-text"><a href="#">'+data[i].ip+'</a></span>\n' +
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
            '                    <span class="progress-text"><a href="#">'+data[i].ip+'</a></span>\n' +
            '                    <span class="progress-number"><b>'+data[i].pk_size+'</b>/'+max_size+'</span>\n' +
            '                    <div class="progress sm" style="height: 5px;">\n' +
            '                      <div class="progress-bar progress-bar-aqua" style="width: '+100*data[i].pk_size/max_size+'%; background-color: '+colors[i]+'"></div>\n' +
            '                    </div>\n' +
            '                  </div>';
        $("#hotAPProgressBar").append(progressBar);
    }
}


// 绘制内部热点IP的饼图
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
            '                    <span class="progress-text"><a href="#">'+data[i].ip+'</a></span>\n' +
            '                    <span class="progress-number"><b>'+data[i].pk_size+'</b>/'+max_size+'</span>\n' +
            '                    <div class="progress sm" style="height: 5px;">\n' +
            '                      <div class="progress-bar progress-bar-aqua" style="width: '+100*data[i].pk_size/max_size+'%; background-color: '+colors[i]+'"></div>\n' +
            '                    </div>\n' +
            '                  </div>';
        $("#outterHotIPProgressBar").append(progressBar);
    }
}
