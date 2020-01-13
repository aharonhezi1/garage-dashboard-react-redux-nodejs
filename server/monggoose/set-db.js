const Car =require( './config')
const  mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test',  {useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true});

let state = {
    cars: [
      {
        plateNumber: "1111111",
        model: 2001,
        issueDate: 1000000000000,
        lastStatusChanged: 1000000001000
      },
      {
        plateNumber: "1111112",
        model: 2002,
        issueDate: 1111011010000,
        status: "inRepair",
        lastStatusChanged: 1011011010000
      },
      {
        plateNumber: "1111113",
        model: 2003,
        issueDate:1054191010000,
        status: "faulty",
        lastStatusChanged:1054191010000
      }
    ]
  };
// state.forEach(car => {
// new Car(car).save(e=>
//     console.log('car: '+car.plateNumber,e)
//     ) 
// });
//Car.remove({}, ()=>console.log('remove'));
Car.insertMany(state.cars,e=>
    console.log(e)
)