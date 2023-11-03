import mongoose from "mongoose";


const db1_Schema = new mongoose.Schema({
  _id: String,
  Year: Number,
  Industry_aggregation_NZSIOC: String,
  Industry_code_NZSIOC: String,
  Industry_name_NZSIOC: String,
  Units: String,
  Variable_code: String,
  Variable_name: String,
  Variable_category: String,
  Value: String,
  Industry_code_ANZSIC06: String,
});

const db1 = mongoose.model('db1', db1_Schema);

export default db1;

// in order to being able to use mongoDB in your nodejs app
// you shall have a model to gain access to interact with the database
// then you good to go