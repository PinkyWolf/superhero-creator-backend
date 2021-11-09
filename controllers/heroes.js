const { HttpCode, ErrorMessages } = require("../helpers/constants");
const Heroes = require("../repositories/heroes");
const UploadAvatarService = require("../services/local-upload");

const getAll = async (req, res, next) => {
  try {
    const heroes = await Heroes.listContacts();
    res.json({ status: "success", code: HttpCode.OK, data: { heroes } });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const hero = await Heroes.getContactById(heroId);
    if (hero) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: { hero },
      });
    }
    return res.json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: ErrorMessages.NOT_FOUND,
    });
  } catch (error) {
    next(error);
  }
};

const addHero = async (req, res, next) => {
  const { nickname, superpowers, originDescription } = req.body;
  try {
    const heroes = await Heroes.addHero(req.body);
    if (!nickname || !superpowers || !originDescription) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "missing required name field",
      });
    }
    return res.json({
      status: "success",
      code: HttpCode.CREATED,
      data: { heroes },
    });
  } catch (error) {
    next(error);
  }
};

const removeHero = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const heroes = await Heroes.removeHero(heroId);
    if (heroes) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: { heroes },
      });
    }
    return res.json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: ErrorMessages.NOT_FOUND,
    });
  } catch (error) {
    next(error);
  }
};

const updateHero = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const hero = await Heroes.updateHero(heroId, req.body);
    if (!req.body) {
      return res.json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "missing fields",
      });
    } else if (hero) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: { hero },
      });
    }
    return res.json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: ErrorMessages.NOT_FOUND,
    });
  } catch (error) {
    next(error);
  }
};

const createAvatar = async (req, res, next) => {
  try {
    const id = req.body.id;
    const HEROES_AVATARS = process.env.HEROES_AVATARS;
    const uploads = new UploadAvatarService(HEROES_AVATARS);
    const avatarUrl = await uploads.saveAvatar({ heroId: id, file: req.file });
    await Heroes.updateAvatar(id, avatarUrl);
    res.json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addHero,
  removeHero,
  updateHero,
  createAvatar,
};
