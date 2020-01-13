const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/test',  {useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>
    console.log("we're connected!")    
);

const carSchema=  new Schema({
    plateNumber: {
        type:String,
        required: true,
        trim: true,
        unique: true        
    },
    model: {
        type:Number,
        required: true,
        trim: true       
    },
    issueDate:{
        type:Number,
        required: true          
    },
    status:{type: String,
        default:'available'},
    lastStatusChanged: Number  
})
const Car=mongoose.model('Car',carSchema)

module.exports= Car