const { User } = require('../validation/userSchema')

const findById = async (userId) => {
  const result = await User.findOne({_id: userId})
  return result
}

const findByEmail = async (email) => {
  const result = await User.findOne({email})
  return result
}

const create = async (body) => {
  const user = new User(body)
  return await user.save()
}

const updatetoken = async (userId, token) => {
   return await User.findOneAndUpdate({ _id: userId }, { token })
}

module.exports = {
  findById,
  findByEmail,
  create,
  updatetoken
}
