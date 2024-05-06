import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Diagram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            financeData: [],
            chartData: [],
            income: 0,
            expense: 0
        };
    }

    componentDidMount() {
        this.fetchFinanceData();
    }

    fetchFinanceData() {
        fetch('http://localhost:8000/finance/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ financeData: data });
                this.processChartData(data);
            })
            .catch(error => console.error('Error fetching finance data:', error));
    }

    processChartData(data) {
        const filteredData = data.filter(item => {
            return item.date >= this.props.startDate && item.date <= this.props.endDate;
        });

        let income = 0;
        let expense = 0;

        const categoryExpenses = {};

        filteredData.forEach(item => {
            if (item.type === 'income') {
                income += item.amount;
            } else if (item.type === 'expense' && item.categoryId) {

                if (categoryExpenses[item.categoryId]) {
                    categoryExpenses[item.categoryId] += item.amount;
                } else {
                    categoryExpenses[item.categoryId] = item.amount;
                }
                expense += item.amount;
            }
        });

        const chartData = Object.keys(categoryExpenses).map(categoryId => ({
            name: categoryId,
            y: categoryExpenses[categoryId]
        }));

        this.setState({ chartData, income, expense });
    }

    componentDidUpdate(prevProps) {
        if (this.props.startDate !== prevProps.startDate || this.props.endDate !== prevProps.endDate) {
            this.processChartData(this.state.financeData);
        }
    }

    render() {
        const balance = this.state.income - this.state.expense;

        const options = {
            animationEnabled: true,
            subtitles: [{
                text: "Your balance: " + balance + " Kč",
                verticalAlign: "center",
                fontSize: 24,
            }],
            height: 650,
            data: [{
                type: "doughnut",
                yValueFormatString: "#,###'Kč'",
                dataPoints: this.state.chartData
            }]
        };

        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default Diagram;
