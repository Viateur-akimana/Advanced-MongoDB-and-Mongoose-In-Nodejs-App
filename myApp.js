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

const createAndSavePerson = (done) => {
   const viateur= new Person({name: "viateur", age: 84, favoriteFoods: ["meat", "chips"]});

  viateur.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
let arrayOfPeople =[
  {name:"olivier", age: 45, favoritesFoods: ["maize", "rice"]},
  {name:"rival", age: 34, favoritesFoods: ["milk", "water"]},
  {name:"gentil", age: 45, favoritesFoods: ["[potatoes", "posho"]}
]

const createManyPeople = (arrayOfPeople, done) => {
 Person.create(arrayOfPeople,(err, createdPeople)=> {
    if (err) return console.error(err);
    done(null, createdPeople)
  });
};
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.log(err);
      done(err);
      return;
    }
    console.log(data);
    done(null, data);
  });
};

// Usage
findPeopleByName("olivier", (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(results);
});


const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: {$all$: [food]}}, (err, data) => {
    if (err) {
      console.log(err);
      done(err);
      return;
    }
    console.log(data);
    done(null, data);
  });
};
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) {
      console.log(err);
      return done(err); // Pass the error to the callback
    }
    done(null, data);
  });
};

findPersonById("647993e7c194ea026157bf71", (err, data) => {
  if (err) {
    console.log("Error:", err);
    return;
  }
  console.log("Person found:", data);
});


const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

 Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 

person.favoriteFoods.push(foodToAdd);

 person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function(error, data) {
      if (error) {
        console.log(error);
        done(error);
        return;
      }
      done(null, data);
    });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
