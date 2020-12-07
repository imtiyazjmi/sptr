const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter valid movie name'],
    unique: true
  },
  year: {
    type: Number,
    required: [true, 'Enter valid movie year'],
    minlength: [4, 'Pleas enter year in full'],
    validate : {
      validator : Number.isInteger,
      message   : props => `${props.value} is not an integer value`
    }
  },
  director: {
    type: String,
    required: [true, 'Enter valid director name']
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

movieSchema.path('name').validate(async (value) => {
  const movieCount = await mongoose.models.Movie.countDocuments({name: value });
  return !movieCount;
}, `Movie already exists`);

module.exports = mongoose.model('Movie', movieSchema);
