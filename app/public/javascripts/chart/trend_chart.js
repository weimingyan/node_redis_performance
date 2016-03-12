function drawChart() {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(function() {
    var mu_chart = new google.visualization.LineChart(document.getElementById('memory_usage'));
    var mu_data = new google.visualization.DataTable();
    var mu_options = {title: 'Redis Memory Usage Chart',
                    hAxis: {
                      title: 'Time(second)',
                      format: 'HH:mm',
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
    mu_data.addColumn('date');
    mu_data.addColumn('number');
    var current_seconds = new Date().getTime();
    for(var i = 1; i<61; i++) {
      mu_data.addRow([new Date(current_seconds + (60*i*1000)), Math.random()*1000]);
    }
    mu_chart.draw(mu_data, mu_options);
    var _fetch_mu_date = function() {
      //mu_data.addRow([15, 33]);
      mu_chart.draw(mu_data, mu_options);
    };
    var _update_zone = function() {
      var current = new Date().getTime();

      mu_options.hAxis.viewWindow.min = new Date(current-(60*60*1000));
      mu_options.hAxis.viewWindow.max = new Date(current+(60*30*1000));
      mu_chart.draw(mu_data, mu_options);
    };
    var _update_data = function() {
      // get data 
      mu_data.addRow([new Date(), Math.random()*1000]);
      mu_chart.draw(mu_data, mu_options);
    }
    _fetch_mu_date();
  });
}
