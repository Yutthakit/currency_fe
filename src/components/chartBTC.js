import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Modal, Button, InputNumber } from "antd";
import Axios from '../config/axios.setup'

export default class chartBTC extends Component {

  state = {
    sell: null,
    visible: false,
    name: '',
    price: 0,
    investPerUnit: 0,
    amount: 0,
    type: '',
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
            label: "current",
            fill: false,
            lineTension: 0.3,
            backgroundColor: "rgba(255,255,255,1)",
            borderColor: "rgba(255, 255, 255,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.5,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,0)",
            pointBackgroundColor: "rgba(75,192,192,1)",
            pointBorderWidth: 1.5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,0)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 111]
        }
      ]}
  };

  componentDidMount() {
    this.getDateAndPrice()

    this.timer = setInterval(() => {
      this.getDateAndPrice()
    }, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getDateAndPrice() {
    Axios.get('/static/history/btc', {
      user: localStorage.getItem('ACCESS_TOKEN')
    }).then((result) => {
      this.getData(result.data)
    }).catch((err) => {
      console.log(err)
    });
  }

  buyCurrency() {
    const {
      investPerUnit,
      name,
      price,
      amount
    } = this.state

    Axios.post('/buy-currency', {
      value_invest: amount,
      value_per_unit: investPerUnit,
      currency_name: name,
      currency_price_purchase: price,
    }).then(() => {
      Axios.get('/profile', {
        user: localStorage.getItem('ACCESS_TOKEN')
      })
        .then((result) => {
          window.location=`/${result.data.Balance}`
        }).catch((err) => {
          console.log(err);
        });
    }).catch((err) => {
      console.log(err)
    });
  }

  sellCurrency() {
    const {
      investPerUnit,
      name,
      price,
    } = this.state
    Axios.post('/sell-currency', {
      value_per_unit: investPerUnit,
      currency_name: name,
      currency_price_sell: price,
    }).then((result) => {
      Axios.get('/profile', {
        user: localStorage.getItem('ACCESS_TOKEN')
      })
        .then((result) => {
          window.location=`/${result.data.Balance}`
        }).catch((err) => {
          console.log(err);
        });
    }).catch((err) => {
      console.log(err);
    });
  }

  getData = (data) => {
    if (data) {
      this.setState({
        sell: data.has_invest,
        amount: data.price[9],
        data: { 
          labels : data.date,
          datasets:[
            {
              label: "current",
              fill: false,
              lineTension: 0.3,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.5,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,0)",
              pointBackgroundColor: "rgba(75,192,192,1)",
              pointBorderWidth: 1.5,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: data.price
            }
          ]
        }
      })
    }
  }

  showModal = (type) => {
    this.setState({
      visible: true,
      name: 'BTC',
      price: this.state.data.datasets[0].data[9],
      type: type
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
    const {
      type
    } = this.state
    console.log(    type
      )
    if (type === 'buy') {
      this.buyCurrency()
    } else if (type === 'sell') {
      this.sellCurrency()
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (value) => {
    this.setState({
      investPerUnit: value,
      amount: value * this.state.price
    })
  }

  render() {
    return (
      <div>
        <h2 style={{ color: '#fff' }}>BTC</h2>
        <Line
          ref="chart"
          data={this.state.data}
        />
        <Button type="primary" onClick={() => this.showModal('buy')}>
            Buy
        </Button>
        <Button disabled={this.state.sell ? false : true} type="primary" onClick={() => this.showModal('sell')}>
            Sell
        </Button>
        <Modal
          title={this.state.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Current Price : { this.state.price }</p>
          <p>Value Investment/Divestment : <InputNumber price={this.state.price} min={0.01} max={1000} defaultValue={1} onChange={this.onChange} /> </p>
          <p>Amount : { this.state.amount  }</p>
        </Modal>
      </div>
    );
  }


}