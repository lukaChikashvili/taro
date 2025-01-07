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
        })
    })
});



export const { useCreateWordMutation } = dictApiSlice;
