import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Member, Absence } from './types'

const memberSlice = createSlice({
  name: 'member',
  initialState: [] as Member[],
  reducers: {
    setMembers(state, action: PayloadAction<Member[]>) {
      state = action.payload
    }
  }
})

const absenceSlice = createSlice({
  name: 'absence',
  initialState: [] as Absence[],
  reducers: {
    setAbsences(state, action: PayloadAction<Absence[]>) {
      state = action.payload
    }
  }
})

export const { setMembers } = memberSlice.actions
export const { setAbsences } = absenceSlice.actions

export const reducers = {
  memberReducer: memberSlice.reducer,
  absenceReducer: absenceSlice.reducer,
}
