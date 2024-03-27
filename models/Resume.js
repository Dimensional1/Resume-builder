const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const resumeBuilder = new Schema({
    name: { type: String, required: true },
    expertise: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    about: { type: String, required: true },
    qualifications: { type: String, required: true },
    experiences: { type: String, required: true },
    address: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String, required: true },
    Education: { type: String, required: true },
    Skill1:String,
    Skill2:String,
    Skill3:String,
    Skill4:String,
    profileImage: { type: String, required: true }
});


// Define the model
const Profile = mongoose.model('Profile', resumeBuilder);

module.exports = Profile;

