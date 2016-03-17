function drawChart() {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(function() {
    var mu_chart = new google.visualization.LineChart(document.getElementById('memory_usage'));
    var mu_data = new google.visualization.DataTable();
    var mu_options = {
                    title: 'Redis Memory Usage Chart',
                    hAxis: {
                      title: 'Time(second)',
                      //format: 'HH:mm:ss',
                      gridlines: {count: 15}
                    },
                    vAxis: {
                      title: 'Memory Usage(KB)',
                      gridlines: {color: 'none'},
                      minValue: 0
                    },
                    width:1200,
                    height: 500
                  };
    mu_data.addColumn('timeofday');
    mu_data.addColumn('number');
    //var current_seconds = new Date().getTime();
    //for(var i = 1; i<61; i++) {
    //  var date = new Date(current_seconds + (60*i*1000));
    //  mu_data.addRow([[date.getHours(),  date.getMinutes(), date.getSeconds()], Math.random()*1000]);
    //}
    //mu_chart.draw(mu_data, mu_options);

    var socket = io();  
    socket.on('mu_data_update', function(data){
      mu_data.addRow([[data.hours, data.minutes, data.seconds], data.value]);
      mu_chart.draw(mu_data, mu_options);
    });
    
    

    function _update_zone() {
      var current = new Date().getTime();

      mu_options.hAxis.viewWindow.min = new Date(current-(60*60*1000));
      mu_options.hAxis.viewWindow.max = new Date(current+(60*30*1000));
      mu_chart.draw(mu_data, mu_options);
    }
    function _update_data() {
     // get data 
      mu_data.addRow([new Date(), Math.random()*1000]);
      mu_chart.draw(mu_data, mu_options);
    }
    //_fetch_mu_date();
  });
}
