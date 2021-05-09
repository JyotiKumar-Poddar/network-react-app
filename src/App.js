import './App.css';
import NetworkChartComponent from './NetworkChartComponent'
import React from "react";
import Card from "react-bootstrap/Card";


function App() {
    return (
        <div className="App">
            <Card style={{ width: '100rem' }}>
                <Card.Body>
                    <NetworkChartComponent/>
                </Card.Body>
            </Card>
        </div>
    );
}

export default App;
