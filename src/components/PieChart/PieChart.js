import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const createOptions = (infected, treated, recovered, deceased, lastUpdate) => {
  let modifiedTreated = parseFloat(((treated / infected) * 100).toFixed(1));
  let modifiedRecovered = parseFloat(((recovered / infected) * 100).toFixed(1));
  let modifiedDeceased = 100 - modifiedRecovered - modifiedTreated;

  return {
    chart: {
      type: 'pie'
    },
    title: {
      text: `Số liệu Covid-19 từ Bộ Y Tế - cập nhật ngày ${moment(lastUpdate).format('DD.MM.YYYY, h:mm a')}`
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            fontSize: 13
          }
        }
      }
    },
    series: [{
      name: 'Số ca',
      colorByPoint: true,
      data: [
        {
          name: 'Đang điều trị',
          y: modifiedTreated,
          sliced: true,
          selected: true
        },
        {
          name: 'Tử vong',
          y: modifiedDeceased,
        },
        {
          name: 'Hồi phục',
          y: modifiedRecovered,
        },
      ]
    }]
  };
}

const PieChart = ({ infected, treated, recovered, deceased, lastUpdate }) => {
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={createOptions(infected, treated, recovered, deceased, lastUpdate)}
      />
    </div>
  );
};

export default PieChart;