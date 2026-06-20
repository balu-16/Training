import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = Router();

// POST a contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const saved = await ContactMessage.create({ name, email, subject, message });
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

export default router;
