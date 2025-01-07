import { DICT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const dictApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createWord: builder.mutation({
            query: (data) => ({
                url: `${DICT_URL}`,
                method: 'POST',
                body: data
            })
        }),

        getAllWords: builder.query({
            query: () => ({
                url: `${DICT_URL}`
            })
        })
    })
});



export const { useCreateWordMutation, useGetAllWordsQuery } = dictApiSlice;
