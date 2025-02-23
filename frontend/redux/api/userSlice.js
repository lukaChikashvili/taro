import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: () => (
                {
                    url: `${USERS_URL}/logout`,
                    method: 'POST'
                }
            )
           
        }),

        register: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}`,
              method: "POST",
              body: data
            })
        }),

        profile: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/profile`,
              method: "PUT",
              body: data
            })
        }),

        language: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/language`,
                method: "POST",
                body: data
            })
        })
    })
});



export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useLanguageMutation
  }  = userApiSlice;