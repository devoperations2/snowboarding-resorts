const mongoose = require('mongoose');
// Optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    content: {
      type: String,
      match: /.{5,}/
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    userName: String,
    userAvatar: String
  }, {
    // createdAt & updatedAt properties
    timestamps: true
  });
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
    photo: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
});
module.exports = mongoose.model('Resort', resortSchema);