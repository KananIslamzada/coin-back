const Coins = require("../model/coin");
const path = require("path");

const uploadPhoto = async (file, name) => {
    const fileName = file.name
    const underscore = fileName.replace(/ /g, "_");
    const underscoreName = name.replace(/ /g, "_");
    const filePath = `./public/uploads/${underscoreName}_${underscore}`;
    await file.mv(filePath);
    return filePath.slice(1);
};


const postCoin = async (req, res) => {
    try {
        const { name, category, description, features } = req.body;
        const hostUrl = req.protocol + "://" + req.get("host");
        const { firstPhoto, secondPhoto } = req.files;

        const firstUrl = hostUrl + await uploadPhoto(firstPhoto, name);
        const secondUrl = hostUrl + await uploadPhoto(secondPhoto, name);

        const newCoin = new Coins({
            name,
            category,
            description,
            features: JSON.parse(features),
            photos: [firstUrl, secondUrl],
        });

        await newCoin.save();
        return res.status(200).json({
            message: "Saved Succesfully",
        });
    } catch (err) {
        return res.status(500).json(err);
    }
}


const getCategoryCoins = async (req, res) => {
    try {
        const { name } = req.params;
        const data = await Coins
            .find({ category: name })
            .select("description name photos id");
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({
            error: "server error",
        });
    }
}


const getCoin = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Coins.findById(id);
        res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({
            error: "server error",
        });
    }
};

const getCoins = async (req, res) => {
    try {
        const { name } = req.body;
        const data = await Coins.find({ name });
        if (data.length === 0) {
            const data = await Coins.find();
            return res.status(200).json(data);
        }
        return res.status(200).json(data);
    } catch (err) {
        console.log({ err })
        return res.status(500).json(err);
    }
};



module.exports = {
    postCoin,
    getCategoryCoins,
    getCoin,
    getCoins
}