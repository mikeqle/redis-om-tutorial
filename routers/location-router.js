import { Router } from "express";
import { personRepository } from "../om/person.js";
import { connection } from "../om/client.js";

export const router = Router();

router.patch("/:id/location/:lng,:lat", async (req, res) => {
  const id = req.params.id;
  const longitude = Number(req.params.lng);
  const latitude = Number(req.params.lat);

  const locationUpdated = new Date();

  const person = await personRepository.fetch(id);
  person.location = { longitude, latitude };
  person.locationUpdated = locationUpdated;

  // Save last location of person
  await personRepository.save(person);

  // adding location log to Redis Stream
  let keyName = `${person.keyName}:locationHistory`;
  console.log(keyName);
  console.log(person.location);

  const locationData = JSON.stringify(person.location)

  await connection.xAdd(keyName, "*", {locationData});
  
  // try {
    
  // } catch (error) {
  //   console.log(error);
  // }
  await connection.set("test", "test-hero")
  
  res.send({ id, locationUpdated, location: { longitude, latitude } });
});
