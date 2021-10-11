import mongoose from "mongoose";
import { Score } from "./score.js";

const { Schema } = mongoose;
const required = true;
const personSchema = new Schema({
  name: { required, type: String },
  scores: [{ type: Schema.Types.ObjectId, ref: "scores" }],
});

personSchema.pre("remove", (next) => {
  console.log("Before remove");
  next();
  0;
});

personSchema.post("remove", async (doc, next) => {
  console.log("After remove");
  await Score.deleteMany({ person: doc._id });
  next();
});

const Person = mongoose.model("persons", personSchema);

export { personSchema, Person };
