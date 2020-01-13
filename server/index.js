const express = require("express");
const app = express();
const Car =require( './monggoose/config')


const cors = require("cors");
const port = 4000;

app.use(cors());
app.use(express.json());

let state = {
  cars: [
  //   {
  //     plateNumber: "1111111",
  //     model: 2001,
  //     issueDate: 1000000000000,
  //     status: "available",
  //     lastStatusChanged: 1000000001000
  //   },
  //   {
  //     plateNumber: "1111112",
  //     model: 2002,
  //     issueDate: 1111011010000,
  //     status: "inRepair",
  //     lastStatusChanged: 1011011010000
  //   },
  //   {
  //     plateNumber: "1111113",
  //     model: 2003,
  //     issueDate:1054191010000,
  //     status: "faulty",
  //     lastStatusChanged:1054191010000
  //   }
  ]
};
app.get("/api/cars", async(req, res) => {
  state.cars= await Car.find()
  console.log(state);
  
  res.send(state);
});
app.post("/api/cars",async (req, res) => {
  try {
    const paylod = req.body;
    // state = {
    //   ...state,
    //   cars: state.cars.concat({
    //     ...paylod,
    //     status: "available",
    //     lastStatusChanged: new Date().getTime()
    //   })
    // };
  const car =  new Car({
      ...paylod,
      issueDate:new Date(paylod.issueDate).getTime(),     
      lastStatusChanged:new Date().getTime()
    })
    console.log(paylod.issueDate);    
    await car.save(e=>console.log(e) )
    res.send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
app.patch("/api/cars",async (req, res) => {
  try {
    const {plateNumber,status} = req.body;
    // state = {
    //   ...state,
    //   cars: state.cars.map(car => {
    //     return car.plateNumber === plateNumber
    //       ? { ...car, status: status, lastStatusChanged: new Date().getTime() }
    //       : car;
    //   })
    // };
   let car= await Car.findOne({plateNumber})
   console.log(car);
   
  // car={...car,status, lastStatusChanged: new Date().getTime()}
   car.status=status;
   car.lastStatusChanged=parseInt(new Date().getTime())
  await car.save( )
   res.send()
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
app.listen(port, () => {
  console.log("Server started!");
});
