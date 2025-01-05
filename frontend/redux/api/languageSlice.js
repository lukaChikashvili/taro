import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const languageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allLanguages: builder.query({
           query: () => `${USERS_URL}/language`
        }),

        getSpecificLang: builder.query({
            query: (langId) => ({
                url: `${USERS_URL}/language/${langId}`
            })
        }),

        deleteLang: builder.mutation({
            query: (langId) => ({
               url: `${USERS_URL}/language/${langId}`,
               method: 'DELETE'
            })
        })
    })
});


export const { useAllLanguagesQuery, useGetSpecificLangQuery, useDeleteLangMutation} = languageApiSlice;
