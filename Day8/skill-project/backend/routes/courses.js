import { Router } from "express";
import Course from "../models/Course.js";

const router = Router();

// GET all courses (with optional category filter)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== "all" ? { category } : {};
    const courses = await Course.find(filter).sort({ students: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// GET distinct categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Course.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET course stats
router.get("/stats", async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalStudents = await Course.aggregate([
      { $group: { _id: null, total: { $sum: "$students" } } },
    ]);
    const avgRating = await Course.aggregate([
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);
    res.json({
      totalCourses,
      totalStudents: totalStudents[0]?.total || 0,
      avgRating: avgRating[0]?.avg?.toFixed(1) || 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// GET single course by id
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

export default router;
