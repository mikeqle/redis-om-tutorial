import { Router } from "express";
import { personRepository } from "../om/person.js";

export const router = Router();

export const hello = "router-hello";

// Create a person
router.post("/", async (req, res) => {
  const person = await personRepository.createAndSave(req.body);

  // The line below will expire the entityId after 120 seconds
  // await personRepository.expire(person.entityId, 120);
  res.send(person);
});

// Read a person
router.get("/:id", async (req, res) => {
  const person = await personRepository.fetch(req.params.id);
  res.send(person);
});

// Update a person
router.put("/:id", async (req, res) => {
  const person = await personRepository.fetch(req.params.id);
  person.firstName = req.body.firstName ?? null;
  person.lastName = req.body.lastName ?? null;
  person.age = req.body.age ?? null;
  person.verified = req.body.verified ?? null;
  person.location = req.body.location ?? null;
  person.updatedLocation = req.body.updatedLocation ?? null;
  person.skills = req.body.skills ?? null;
  person.personalStatement = req.body.personalStatement ?? null;

  await personRepository.save(person);

  res.send(person);
});

// Delete a person
router.delete("/:id", async (req, res) => {
  await personRepository.remove(req.params.id);
  res.send({ entityId: req.params.id });
});
