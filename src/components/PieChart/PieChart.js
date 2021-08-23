import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const createOptions = (infected, treated, recovered, deceased, lastUpdate) => {
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
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Số ca',
      colorByPoint: true,
      data: [
        {
          name: 'Đang điều trị',
          y: treated,
          sliced: true,
          selected: true
        },
        {
          name: 'Tử vong',
          y: deceased,
        },
        {
          name: 'Hồi phục',
          y: recovered,
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