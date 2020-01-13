import { createStore } from "redux";
import axios from 'axios'
let initCars =[]
export const carsUrl='http://localhost:4000/api/cars'
export const geStatefromServer= async ()=> {
  try {
    const response = await axios.get(carsUrl);
    console.log(response);
    
   return response.data;
  } catch (error) {
    console.error(error);
  }
}
const postNewCar=async (paylod)=>{
  try {
   let car= paylod
   car={...car,
    issueDate:new Date(car.issueDate),
    lastStatusChanged:new Date(car.lastStatusChanged)
  }
  
    const response = await axios.post(carsUrl,car);
    console.log(response);
    
   
  } catch (error) {
    console.error(error);
  }
}

const updateStatus=async (paylod)=>{
  try {
    let car= paylod
    car={...car,
     issueDate:new Date(car.issueDate),
     lastStatusChanged:new Date(car.lastStatusChanged)
   }
    const response = await axios.patch(carsUrl,paylod);
    console.log(response);
   
  } catch (error) {
    console.error(error);
  }
}

// [
//   {
//     plateNumber: '1111111',
//     model: 2001,
//     issueDate: new Date(1000000000000),
//     status: "available",
//     lastStatusChanged: new Date(1000000001000)
//   },
//   {
//     plateNumber: '1111112',
//     model: 2002,
//     issueDate: new Date(1111011010000),
//     status: "inRepair",
//     lastStatusChanged: new Date(1011011010000)
//   },
//   {
//     plateNumber: '1111113',
//     model: 2003,
//     issueDate: new Date(1054191010000),
//     status: "faulty",
//     lastStatusChanged: new Date()
//   }
// ];

let store = createStore((state = { cars: initCars }, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return {...state, cars:action.paylod}
    case "Add_CAR":
      postNewCar(action.paylod);
      return   {
        ...state,
        cars: state.cars.concat({
          ...action.paylod,
          status: "available",
          lastStatusChanged: new Date(),
          issueDate:new Date(action.paylod.issueDate)
        })
      }

    case "CHANGE_STATUS":
       updateStatus(action.paylod);
       return {
        ...state,
        cars: state.cars.map(car => {
          return car.plateNumber === action.paylod.plateNumber
            ? { ...car, status: action.paylod.status, lastStatusChanged: new Date() }
            : car;
        })
      };
 
    default:
      return state;
  }
});

export default store