const dotenv = require("dotenv");
require('dotenv').config();
const mongoose= require("mongoose");
mongoose.connect('mongodb+srv://Viateur:akimana123viateur@cluster0.y73hwfu.mongodb.net/freecodecamp?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((req,res)=>{
  console.log("connected to the database successfully");
})
.catch((req,res)=>{
  console.log("not connected")
})
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);
//saving in the database
const createAndSavePerson = (done) => {
   const viateur= new Person({name: "viateur", age: 84, favoriteFoods: ["meat", "chips"]});

  viateur.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });



exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
