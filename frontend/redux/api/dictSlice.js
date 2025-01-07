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
        }),

        deleteWord: builder.mutation({
            query: (dictId) => ({
                url: `${DICT_URL}/${dictId}`,
                method: 'DELETE'
            })
        })
    })
});



export const { useCreateWordMutation, useGetAllWordsQuery , useDeleteWordMutation} = dictApiSlice;
