import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  const buildChartData = (data ,casesType) => {
    let charData = []
    let lastDataPoint
    
    for(let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x : date ,
                y : data[casesType][date] - lastDataPoint  // to get new cases we substract last date cases                 
            }
          charData.push(newDataPoint) 
        }
        lastDataPoint = data[casesType][date]
    }

    return charData
}
  

function LineGraph({casesType}) {

    const [data , setData] = useState({})

    //https://disease.sh/v3/covid-19/historical/all?lastdays=120
    //all data last 3 months
    useEffect(() => {
        
        const fetchData = async() => {
        await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            let chartData = buildChartData(data , casesType)
           // console.log(chartData)
            setData(chartData)
            
        })
    }

    fetchData()

    } ,[casesType] )

    return (
        <div>
            {data?.length > 0 && (<Line
          data={{
            datasets: [
              {
                backgroundColor:`${casesType != 'recovered' ? 'rgba(204, 16, 52, 0.5)' : 'rgba(0, 230, 64, 0.5)'}`,
                borderColor: `${casesType != 'recovered' ? 'rgba(204, 16, 52, 1)' : 'rgba(0, 230, 64, 1)'}`,
                data: data,
              },
            ],
          }}
          options={options}
        />)}
        </div>
    )
}

export default LineGraph
