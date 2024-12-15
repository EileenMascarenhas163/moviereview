import { apiSlice } from "./apiSilce";

const MOVIES_URL = "http://localhost:5000/api/movies";
const RMOVIES_URL = "http://localhost:5000/api/reviews/review";
export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.mutation({
      query: () => ({
        url: `${MOVIES_URL}`,
        method: "GET",
      }),
    }),
    getOneMovie: builder.mutation({
      query: ({ id }) => ({
        url: `${MOVIES_URL}/${id}`,
        method: "GET",
      }),
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MOVIES_URL}/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllMoviesMutation,
  useGetOneMovieMutation,
  usePostReviewMutation,
} = movieApiSlice;
