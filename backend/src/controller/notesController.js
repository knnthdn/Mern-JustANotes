import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";
import Notes from "../model/noteModel.js";

const getAllUserNotes = catchAsync(async (req, res, next) => {
  const notes = await Notes.find({ notesFrom: req.user._id });

  res.status(200).json({
    status: "success",
    data: {
      notes,
    },
  });
});

const newNotes = catchAsync(async (req, res, next) => {
  if (!req.user)
    return next(
      new AppError(
        "You don have permission to perform this action! Please login or sign up first"
      )
    );

  const newNotes = await Notes.create({
    notesFrom: req.user._id,
    title: req.body.title,
    content: req.body.content,
    notesPreference: req.body.notesPreference,
  });

  res.status(201).json({
    status: "Success",
    notes: newNotes,
  });
});

const editNotes = catchAsync(async (req, res, next) => {
  const update = {
    title: req.body.title,
    content: req.body.content,
  };

  const notes = await Notes.findByIdAndUpdate(req.params.notesId, update, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      notes: notes,
    },
  });
});

const deleteNotes = catchAsync(async (req, res, next) => {
  const notesIds = req.body.map((items) => items);

  const notes = await Notes.deleteMany({ _id: { $in: notesIds } });

  res.status(200).json({ status: "success", notes });
});

const recycleyMany = catchAsync(async (req, res, next) => {
  const notesIds = req.body.map((items) => items);

  const notes = await Notes.updateMany(
    { _id: { $in: notesIds } },
    { isRecycled: true }
  );

  res.status(200).json({ status: "success", notes });
});

const restoreNotes = catchAsync(async (req, res, next) => {
  const notesIds = req.body.map((items) => items);

  const notes = await Notes.updateMany(
    { _id: { $in: notesIds } },
    { isRecycled: false }
  );

  res.status(200).json({ status: "success", notes });
});

const toggleNotesPref = catchAsync(async (req, res, next) => {
  const currentPref = await Notes.findById(req.body._id);

  const updatePref = {
    notesPreference: {
      ...currentPref.notesPreference,
      ...req.body.notesPreference,
    },
  };

  const notesPref = await Notes.findByIdAndUpdate(currentPref._id, updatePref, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "succeess",
    notes: notesPref,
  });
});

export default {
  newNotes,
  editNotes,
  deleteNotes,
  getAllUserNotes,
  recycleyMany,
  toggleNotesPref,
  restoreNotes,
};
