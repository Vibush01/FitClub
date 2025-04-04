const mongoose = require('mongoose');

       const macroLogSchema = new mongoose.Schema({
         userId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User',
           required: true,
         },
         date: {
           type: Date,
           required: true,
         },
         food: {
           type: String,
           required: true,
         },
         macros: {
           protein: Number,
           carbs: Number,
           fats: Number,
           calories: Number,
         },
       }, { timestamps: true });

       module.exports = mongoose.model('MacroLog', macroLogSchema);