import React from "react";
import CarsStatusNumber from "./components/cars-status-number";
import AddCar from "./components/add-car";
import CarList from "./components/car-list";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from 'axios'

class App extends React.Component {
  //props={cars:[]};
  state={
    error: null,
      isLoading: false,
      data: []
  }
  props;
  countCarsByStatus =(status, isToday = false) => {
    return isToday
      ? this.props.cars.filter(
          car =>
            car.status === status &&
            car.lastStatusChanged.toDateString() === new Date().toDateString()
        ).length
      : this.props.cars.filter(car => car.status === status).length;
  };
 async componentDidMount() {  
  
   axios('http://localhost:4000/api/cars')
   .then((response)=>{
     console.log(response);     
const cars=response.data.cars.map(
  car=>({...car,
    issueDate:new Date(car.issueDate),
    lastStatusChanged:new Date(car.lastStatusChanged)
  })
)
this.props.updateState(cars)
this.setState(()=>({data:{ cars},isLoading:true}))
   }).catch((error)=>{
     console.log(error);
     
    this.setState(()=>({error,isLoading:true}))
   })

  }
  render() {
    const { error, isLoading, cars } = this.state;
    if (error) {
      console.log(error);      
      return <div>Error: {error.message}</div>;
    } else if (!isLoading) {
      return <div>Loading...</div>;
    } else {
    return (
      <div style={{ height: "20vh" }}>
        <CarsStatusNumber
          status={{ status: "available" }}
          countCarsByStatus={ this.countCarsByStatus("available")}
        />
        <CarsStatusNumber
          status={{ status: "faulty" }}
          countCarsByStatus={this.countCarsByStatus("faulty")}
        />
        <CarsStatusNumber
          status={{ status: "inRepair" }}
          countCarsByStatus={this.countCarsByStatus("inRepair")}
        />
        <CarsStatusNumber
          status={{ status: "available", isToday: true }}
          countCarsByStatus={this.countCarsByStatus("available", true)}
        />
        <CarsStatusNumber
          status={{ status: "faulty", isToday: true }}
          countCarsByStatus={this.countCarsByStatus("faulty", true)}
        />
        <div>
          <CarList
            cars={this.props.cars}
            changeStatus={this.props.changeStatus}
          />
        </div>
        <div>
          <AddCar carsPlates={this.props.cars.map(car=>car.plateNumber)}
           addCar={this.props.addCar} />
        </div>
      </div>
    );}
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateState:(cars)=>dispatch({type:'SET_STATE',paylod:cars}),
    addCar: newCar => {dispatch({ type: "Add_CAR", paylod: newCar })},
    changeStatus: (status, plateNumber) =>
      dispatch({ type: "CHANGE_STATUS", paylod: { status, plateNumber } })

  };
};
const mapStateToProps = ({cars}) => ({cars})

export default connect(mapStateToProps, mapDispatchToProps)(App);
