import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

export async function getEvents(req, res, next) {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const events = await Event.find(filter).sort({ date: 1 });
    return res.json(events);
  } catch (error) {
    return next(error);
  }
}

export async function getEventById(req, res, next) {
  try {
    const { id } = req.params;

    // "yok" gibi bir deger CastError/500'e donusmesin.
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    return res.json(event);
  } catch (error) {
    return next(error);
  }
}

export async function createEvent(req, res, next) {
  try {
    const event = await Event.create(req.body ?? {});
    return res.status(201).json(event);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: { message: error.message } });
    }
    return next(error);
  }
}
