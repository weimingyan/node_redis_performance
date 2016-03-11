function drawChart() {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(function() {
    var mu_chart = new google.visualization.ScatterChart(document.getElementById('memory_usage'));
    var mu_data = new google.visualization.DataTable();
    var mu_options = {title: 'Age of sugar maples vs. trunk diameter, in inches',
                    vAxis: {title: 'Memory Usage(KB)'},
                    hAxis: {title: 'Time(second)'}
                  };
    mu_data.addColumn('number', 'Diameter111');
    mu_data.addColumn('number', 'Age');
    mu_data.addRows([[8, 37], [4, 19.5], [11, 52], [4, 22], [3, 16.5], [6.5, 32.8], [14, 72]]);
    mu_chart.draw(mu_data, mu_options);
    var _fetch_mu_date = function() {
      mu_data.addRow([15, 33]);
      mu_chart.draw(mu_data, mu_options);
    };
    _fetch_mu_date();
  });
}
