import { Schema, model } from 'mongoose';

const movieSchema = new Schema(
  {
    director: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['film', 'serial'],
      default: 'film',
    },
  },
  {
    versionKey: false,
    timestamps: true, // тераба додати
  },
);

const Movie = model('movie', movieSchema);
export default Movie;
