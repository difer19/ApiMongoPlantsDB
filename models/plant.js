const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    scientificName: String,
    genus: String,
    family: String,
    scientificNameFull: String,
    state: Number,
    commonNames: [String],
    images: [
        {
            organ: String,
            author: String,
            license: String,
            url: String
        }
    ],
    information: {
        data: [
            {
                key: String,
                value: String
            }
        ],
        description: String,
        link: String
    }
});

const Plant = mongoose.model('Plant', PlantSchema, 'plant');

module.exports = { Plant };