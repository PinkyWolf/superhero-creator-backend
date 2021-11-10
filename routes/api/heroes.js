const express = require("express");
const ctrl = require("../../controllers/heroes");
const {
  validationCreateContact,
  validationUpdateContact,
} = require("../../validation");
const upload = require("../../helpers/upload");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:heroId", ctrl.getById);

router.post("/", validationCreateContact, ctrl.addHero);

router.delete("/:heroId", ctrl.removeHero);

router.put("/:heroId", validationUpdateContact, ctrl.updateHero);

router.patch("/avatars", upload.single("avatar"), ctrl.createAvatar);

module.exports = router;
