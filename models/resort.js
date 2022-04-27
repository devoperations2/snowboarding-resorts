const mongoose = require('mongoose');
// Optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const resortSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  terrain: {
      type: String,
      default: 'all mountain',
      enum: ['all mountain', 'freestyle', 'alpine', 'backcountry']  
      
  },
   location: {
      type: String,
      required: true 
   },

   elevation: {
      type: Number,
      required: true,
   },
   description: {
       type: String,
       required: true 
   },
   user: {
       type: Schema.Types.ObjectId, 
       ref: 'User', 
       required: true
    },
})
module.exports = mongoose.model('Resort', resortSchema);