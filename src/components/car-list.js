import React from "react";
import {Table} from 'react-bootstrap'
const carList = props => {
  const statusOptions = ["available", "inRepair", "faulty"];
  const onChangeStatus = event => {
    console.log(event.target.value, event.target.name);

    props.changeStatus(event.target.value, event.target.name);
    console.log(props.cars);
  };

 let cars = props.cars.map(car=>{
   const duplicate={...car}
   return{...duplicate}})
 
 cars=cars.map(car => {
    return {      
      plateNumber: car.plateNumber,
      model: car.model,
      status: car.status,
      issueDate: car.issueDate.toString().slice(4, 15),
      ChangeStatus: (
        <select name={car.plateNumber} onChange={onChangeStatus}>
          <option value={car.status}>{car.status}</option>
          {statusOptions.map(
            status =>
              status !== car.status && <option value={status}>{status}</option>
          )}
        </select>
      )
    };
  });

  const carsDetailsCol = [
    "plate number",
    "model",
    "status",
    "issueDate",   
    "change status"
  ];
  return (
    <div>
     <Table striped bordered hover>
  <thead>
 
        <tr>
          {carsDetailsCol.map(col => (
            <th>{col}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {cars.map(car => (
          <tr>
            {Object.keys(car).map(carDetail => (
              <td>{car[carDetail]}</td>
            ))}{" "}
          </tr>
        ))}
       </tbody>
</Table>
    </div>
  );
};
export default carList;
