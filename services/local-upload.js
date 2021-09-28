const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')

const createFolder = require('../helpers/create-folder')

class UploadAvatarService {
    constructor(folderAvatars) {
        this.folderAvatars = folderAvatars
    }

    async transformAvatar(pathFile) {
        const pic = await jimp.read(pathFile)
        await pic.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(pathFile)
    }

    async saveAvatar({ userId, file }) {
        await this.transformAvatar(file.path)
        const folderWithAvatars = path.join(this.folderAvatars, userId)
        await createFolder(folderWithAvatars)
        await fs.rename(file.path, path.join(folderWithAvatars, file.filename))
        return path.join(userId, file.filename)
    }
}
module.exports = UploadAvatarService