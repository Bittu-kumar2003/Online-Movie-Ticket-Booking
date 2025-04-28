const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String }, // Movie poster or image URL
    releaseDate: { type: Date },
    genre: { type: String },
    actors: [{ name: String, role: String }], // List of actors and their roles
    director: { type: String }, // Director's name
    duration: { type: Number }, // Duration in minutes
    language: { type: String }, // Movie language
    trailerUrl: { type: String }, // Link to the trailer
    rating: { type: Number, min: 0, max: 10 }, // Movie rating out of 10
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);










// const mongoose = require('mongoose');

// const movieSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     imageUrl: { type: String },
//     releaseDate: { type: Date },
//     genre: { type: String },
// }, { timestamps: true });

// module.exports = mongoose.model('Movie', movieSchema);
