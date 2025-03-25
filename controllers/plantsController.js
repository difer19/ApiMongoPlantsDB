const {Plant} = require('../models/plant');

const getAllPlants = async (_, res) => {
    try {
        const plantsList = await Plant.find();
        if (plantsList.length === 0) {
            return res.status(404).json({ message: 'No hay plantas en la base de datos' });
        }
        console.log('✅ Plantas encontradas en BD:', plantsList);
        return res.json(plantsList);
    }catch(error){
        console.error('❌ Error al obtener las plantas:', error);
        return res.status(500).json({ message: 'Error al obtener las plantas', error });
    }
};

const getPlantsByGenus = async (req, res) => {
    try{
        const {genus} = req.params;
        const regex = new RegExp(genus, 'i');

        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;
        console.log(`🔍 Página: ${page}, Límite: ${limit}, Saltar: ${skip}`);

        const plantsList = await Plant.find({genus : regex}).skip(skip).limit(limit);

        const total = await plantsList.length;
        console.log(`✅ Total: ${total}, Devueltos: ${plantsList.length}`);
    
        return res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            plantsList
        });
    }catch(error){
        console.error('❌ Error al obtener las plantas:', error);
        return res.status(500).json({ message: 'Error al obtener las plantas', error });
    }
};

const getPlantsByFamily = async (req, res) => {
    try {
        const { family } = req.params;
        const regex = new RegExp(family, 'i');
        console.log(`🔍 Buscando por familia (query): "${family}" | regex: ${regex}`);

        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;

        const filter = { family: regex };

        const plantsList = await Plant.find(filter).skip(skip).limit(limit);
        const total = await Plant.countDocuments(filter);

        console.log(`✅ Total encontrados: ${total}, Devueltos en esta página: ${plantsList.length}`);

        return res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            plantsList
        });
    } catch (error) {
        console.error('❌ Error al obtener las plantas por familia:', error);
        return res.status(500).json({ message: 'Error al obtener las plantas por familia', error });
    }
};

const searchPlantsByNames = async (req, res) => {
    try{
        const {query} = req.params;
        const regex = new RegExp(query, 'i');

        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;
        console.log(`🔍 Página: ${page}, Límite: ${limit}, Saltar: ${skip}`);

        const plantsList = await Plant.find({
            $or: [
                { scientificName: regex },
                { commonNames: { $elemMatch: { $regex: regex } } }
            ]
        }).skip(skip).limit(limit);

        const total = await plantsList.length;
        console.log(`✅ Total: ${total}, Devueltos: ${plantsList.length}`);
    
        return res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            plantsList
        });
    }catch(error){
        console.error('❌ Error al obtener las plantas:', error);
        return res.status(500).json({ message: 'Error al obtener las plantas', error });
    }
};

const getPaginatedPlants = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;
        console.log(`🔍 Página: ${page}, Límite: ${limit}, Saltar: ${skip}`);

        const plants = await Plant.find()
            .skip(skip)
            .limit(limit);

        const total = await Plant.countDocuments();

        console.log(`✅ Total: ${total}, Devueltos: ${plants.length}`);

        return res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            plants
        });
    } catch (error) {
        console.error('❌ Error en paginación:', error);
        return res.status(500).json({ message: 'Error en paginación', error });
    }
}



const addPlant = async (req, res) => {
    try {
        const newPlant = new Plant(req.body);
        const result = await newPlant.save();
        console.log('✅ Planta guardada en BD:', result);
        return res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return console.error('❌ Error al guardar la planta:', error);
    }
};

module.exports = {
    getAllPlants, 
    addPlant, 
    getPlantsByGenus, 
    getPlantsByFamily, 
    searchPlantsByNames, 
    getPaginatedPlants
};