const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  program_name: { type: String, required: true },
  program_code: { type: String, required: true, unique: true },
  department_id: {
    type: Schema.Types.ObjectId,
    ref: "Departments",
    required: true,
  },
  degree_level: {
    type: String,
    enum: [
      "Certificate",
      "Diploma",
      "Associate",
      "Bachelor",
      "Master",
      "Doctorate",
    ],
    required: true,
  },
  total_credits: { type: Number, required: true },
  duration_years: { type: Number, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Programs", ProgramSchema);
