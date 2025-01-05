import { UPLOAD_URL, USERS_URL } from "../constants";
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
        }),

        uploadPdf: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data
            })
        })
    })
});


export const { useAllLanguagesQuery, useGetSpecificLangQuery, useDeleteLangMutation, useUploadPdfMutation} = languageApiSlice;
