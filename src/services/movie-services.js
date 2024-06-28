import Movie from '../db/models/Movie.js';
import calcPaginationData from '../utils/calcPaginationData.js';
export const getMovies = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;
  const items = await Movie.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await Movie.countDocuments(); // колличестов документов

  const { totalPages, hasNextPage, hasPrevPage } = calcPaginationData({
    total: totalItems,
    perPage,
    page,
  });
  return {
    items,
    totalItems,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};
export const getMovieById = (id) => Movie.findById(id); //throw new Error()

export const adddMOvie = (data) => Movie.create(data);
// export const upsertMovie = (filter, data, options = {}) =>
//   Movie.findOneAndUpdate(filter, data, {
//     new: true,
//     includeResultMetadata: true,
//     ...options,
//   });

export const upsertMovie = async (filter, data, options = {}) => {
  const result = await Movie.findOneAndUpdate(filter, data, {
    // new: true, // верни обновленній об'єкт
    // runValidators: true, //для испльзования валидатора во время обновления
    includeResultMetadata: true, //додає нові властивості в Postman
    ...options,
  });
  if (!result || !result.value) return null;
  // const isNew = data.lastErrorIject
  const isNew = Boolean(result?.lastErrorObject?.upserted);
  return {
    data: result.value,
    isNew,
  };
};

export const deleteMovie = (filter) => Movie.findOneAndDelete(filter);
