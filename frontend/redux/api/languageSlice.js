import { BOOK_URL, UPLOAD_URL, USERS_URL } from "../constants";
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
        }),

        createBook: builder.mutation({
            query: (data) => ({
                url: `${BOOK_URL}/createpdf`,
                method: 'POST',
                body: data
                
            })
        }),

        getAllBooks: builder.query({
            query: () => ({
                url: `${BOOK_URL}`
            })
        }),

        getSpecificBook: builder.query({
            query: (bookId) => ({
                url: `${BOOK_URL}/${bookId}`
            })
        })
    })
});


export const { useAllLanguagesQuery, useGetSpecificLangQuery, 
    useDeleteLangMutation, useUploadPdfMutation, useCreateBookMutation, useGetAllBooksQuery, useGetSpecificBookQuery } = languageApiSlice;
