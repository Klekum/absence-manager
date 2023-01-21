import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Absence, ApiResult, Member } from './types'

export const apiSlice =  createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1/' }),
  endpoints: (builder) => ({
    getMembers: builder.query<ApiResult<Member[]>, number|void>({
      query: () => 'members',
    }),
    getAbsences: builder.query<ApiResult<Absence[]>, number|void>({
      query: () => 'absences',
    }),
  }),
})

export const { useGetAbsencesQuery, useGetMembersQuery } = apiSlice
