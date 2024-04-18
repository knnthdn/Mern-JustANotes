import express from "express";

import notesController from "../controller/notesController.js";
import authController from "../controller/authController.js";

const router = express.Router();

router.use(authController.protect);

router.get("/mynotes", notesController.getAllUserNotes);
router.post("/newnotes", notesController.newNotes);
router.patch("/editnotes/:notesId", notesController.editNotes);
router.delete("/deletenotes/", notesController.deleteNotes);
router.patch("/recyclemany", notesController.recycleyMany);
router.patch("/restorenotes", notesController.restoreNotes);
router.patch("/togglepreference", notesController.toggleNotesPref);

export default router;
