import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  students: { type: Number, default: 0 },
  description: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: String, required: true },
  icon: { type: String, default: "📘" },
  instructor: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: Number, default: 0 },
  topics: [String],
  prerequisites: [String],
  descriptionLong: String,
});

export default mongoose.model("Course", courseSchema);
