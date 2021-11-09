const { Heroes } = require("../validation");

const listHeroes = async () => {
  const results = await Heroes.find();
  return results;
};

const getHeroById = async (heroId) => {
  const result = await Heroes.findOne({ _id: heroId });
  return result;
};

const removeHero = async (heroId) => {
  const res = await Heroes.findOneAndDelete({ _id: heroId });
  return res;
};

const addHero = async (body) => {
  const result = await Heroes.create(body);
  return result;
};

const updateHero = async (heroId, body) => {
  const res = await Heroes.findOneAndUpdate(
    { _id: heroId },
    { ...body },
    { new: false }
  );
  return res;
};

const updateAvatar = async (heroId, avatar) => {
  return await Heroes.findOneAndUpdate({ _id: heroId }, { avatar });
};

module.exports = {
  listHeroes,
  getHeroById,
  removeHero,
  addHero,
  updateHero,
  updateAvatar,
};
