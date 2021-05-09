import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Bar} from "react-chartjs-2";

const NetworkChartComponent = () => {

    const [alarmFrequencyData, setAlarmFrequencyData] = useState([]);
    const [alarmData, setAlarmData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);


    let alarmDatalables = [];
    let alarmDataValue = [];
    Object.keys(alarmData).forEach(v => {
        alarmDatalables.push(v);
        alarmDataValue.push(alarmData[v]);
    })

    const backgroundColor = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
    ]
    const borderColor = [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
    ]
    const alarm_chart_data = {
        labels: alarmDatalables,
        datasets: [
            {
                label: "Node alarm count",
                fill: false,
                lineTension: 0.1,
                backgroundColor: backgroundColor[0],
                borderColor: borderColor[0],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: alarmDataValue
            }
        ]
    };


    let alarmFrequencyDatalables = [];
    let alarmFrequencyDataValue = [];
    Object.keys(alarmFrequencyData).forEach(v => {
        alarmFrequencyDatalables.push(v);
        alarmFrequencyDataValue.push(alarmFrequencyData[v]);
    })

    const alarmFrequency_chart_data = {
        labels: alarmFrequencyDatalables,
        datasets: [
            {
                label: "Frequent alarms",
                fill: false,
                lineTension: 0.1,
                backgroundColor: backgroundColor[1],
                borderColor: borderColor[1],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: alarmFrequencyDataValue
            }
        ]
    };

    let hourlyDatalables = [];
    let hourlyDataValue = [];
    Object.keys(hourlyData).forEach(v => {
        hourlyDatalables.push(v);
        hourlyDataValue.push(hourlyData[v]);
    })

    const hourlyData_chart_data = {
        labels: hourlyDatalables,
        datasets: [
            {
                label: "ERA015 alarm per hour",
                fill: false,
                lineTension: 0.1,
                backgroundColor: backgroundColor[2],
                borderColor: borderColor[2],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: hourlyDataValue
            }
        ]
    };

    useEffect(
        () => {
            axios.get(`http://localhost:9091/consume/message`)
                .then(res => {
                    const network_data = res.data;
                    if(network_data?.alarmFrequencyData)
                        setAlarmFrequencyData(network_data.alarmFrequencyData);
                    if(network_data?.nodeAlarmData)
                        setAlarmData(network_data.nodeAlarmData);
                    if(network_data.alarmData)
                      setHourlyData(network_data.alarmData);
                })
        },
        []
    )
    return (
        <ul>
            <div>
                <h2>Frequent alarms</h2>
                <Bar useRef="chart" data={alarm_chart_data}   options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "labelString"
                            }
                        }]
                    }
                }}/>
            </div>
            <div>
                <h2>Nodes and alarms</h2>
                <Bar useRef="chart" data={alarmFrequency_chart_data}/>
            </div>
            <div>
                <h2>ERA015 alarm per hour</h2>
                <Bar useRef="chart" data={hourlyData_chart_data}/>
            </div>
        </ul>
    )

}
export default NetworkChartComponent
