import express from "express";
import config from "./config.js";
import connect from "./database.js";
import { Person } from "./models/person.js";
import { Score } from "./models/score.js";

const app = express();
config(app);
await connect();
// seed ?

const person = new Person({ name: "Mario" });
person.save();

const x = await Person.findOne({});
// x.select("__v");

const score = new Score({
  total: 98,
  date: new Date(),
  person: x._id,
});
await score.save();
person.scores.push(score);
await person.save();

const queryTwo = Person.findOne({})
  .populate("scores", "total date -_id")
  .select("-__v");
console.log(await queryTwo.exec());
// console.log("This is our query: ", queryTwo);

console.log(score._id);

await person.remove();
0;
// Check the data from the database

// Example if a query
// const query = Person.findById(person._id);
// query.populate("scores", "total");
// query.select("name");
// const result = await query.exec();
// console.log(result);

// Find some scores
const query = Score.find({});
// query.gt("total", 98); // Top scores greater than 98
// query.lt("total", 10); // Low scores less than 10
query.gte("total", 10); // gtw = greater than equal
query.lte("total", 90); // lte = less than equal
// query.where("_id").in(["6163f0c037331f33811a438a"]);
query.sort({ total: "asc" }); // sorting in descending order
query.limit(10);
query.skip(20); // show 10 per page, page 3
query.select("total");
console.log(await query.exec());

const check = await Person.findById(person._id)
  .populate("scores")
  .select("-__v");
console.log("Person: ", check);

const checkScore = await Score.findById(score._id);
console.log("Score: ", checkScore);
