const Experience = require("../models/Experience");

const addExperience = async(req, res) => {
    try{
        const { title, company, location, startDate, endDate, description } = req.body;
        const adminId = req.user.adminId;
        console.log("Admin id", adminId);

        if(!adminId){
            return res.status(401).json({message: "Unauthorizes"});
        }

        if(!title || !company || !startDate || !description || !location || !endDate){
            return res.status(400).json({ message: "All fields are required"});
        }
        const experience = new Experience({
            adminId,
            title,
            company,
            location,
            startDate,
            endDate,
            description
        })

        await experience.save();
        res.status(201).json({message: "Experience added successfully", experience})

    }catch(err){
        console.error("Error adding experience:", err);
        res.status(500).json({message: "Internal server error"});
    }
};


const getExperiences = async(req, res) => {
    try{
        // any one can view experiencess if experience have in database
        const experiences = await Experience.find().sort({ createdAt: -1});
        if(experiences.length === 0){
            return res.status(404).json({message: "No Experiences found Please add some experience"});
        }
        res.status(200).json({message: "Experiences fetched successfully", experiences});
    }catch(err){
        console.error("Error adding experience:", err);
        res.status(500).json({message: "Internal server error"});
    }
};

const updateExerience = async(req, res)=> {
    try{
        const {id} = req.params;
        const { title, company, location, startDate, endDate, description} = req.body;
        const adminId = req.user.adminId;
        if(!adminId){
            return res.status(401).json({message: "Unauthorizes"});
        }
        if(!title || !company || !startDate || !description || !location || !endDate){
            return res.status(400).json({message: "All fields are requires"});
        }
        const experience = await Experience.findOneAndUpdate(
            {_id: id, adminId: adminId},
            { title, company, location, startDate, endDate, description},
            { new: true }
        )
        if(!experience){
            return res.status(404).json({message: "Experience not found or you're not authorized to update it"});
        }
        res.status(200).json({message: "Experience updated successfully", experience});

    }catch(err){
        console.error("Error adding experience:", err);
        res.status(500).json({message: "Internal server error"});
    }
}

const deleteExperience = async(req, res)=> {
    try{
        const {id} = req.params;
        const adminId = req.user.adminId;
        if(!adminId){
            return res.status(401).json({message: "Unauthorizes"});
        }
        const experience = await Experience.findOneAndDelete({_id: id, adminId: adminId});
        if(!experience){
            return res.status(404).json({message: "Experience not found or you're not authorized to delete it"});
        }
        res.status(200).json({message: "Experience deleted successfully", experience});

    }catch(err){
        console.error("Error adding experience:", err);
        res.status(500).json({message: "Internal server error"});
    }
}


module.exports = {
    addExperience,
    getExperiences,
    updateExerience,
    deleteExperience
}