// const logger = require("../utils/log");
const { logger } = require("database-connection-function-com")
const fs = require('fs').promises;
const path = require("path")

// module.exports.createDirectoryIfNotExists = async(name) => {
//     let directory = __dirname + `/./../${name}`;
//     let stat = null;
//     try {
//         stat = await fs.statSync(directory);
//         logger.info("Directory exists");
//     } catch (err) {
//         await fs.mkdirSync(directory);
//         console.log("Directory Created");
//     }
//     return directory;
// };

module.exports.createDirectoryIfNotExists = async (name) => {
    let directory = path.join(__dirname, `../${name}`);
    try {
        await fs.stat(directory);
        logger.info("Directory exists");
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(directory);
            console.log("Directory Created");
        } else {
            throw err;
        }
    }
    return directory;
};

module.exports.deleteImage = async (imageName) => {
    try {
        const directory = path.join(__dirname, './../images');
        console.log("d",directory);
        const imagePath = path.join(directory, imageName);
        console.log("imagePath",imagePath);
        await fs.unlink(imagePath);
        logger.info("Image deleted successfully");
        return true;
    } catch (err) {
        logger.error(`Error deleting image: ${err.toString()}`);
        return false;
    }
};
