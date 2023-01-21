import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Member, Absence } from './types'

interface MembersState {
  members: Member[]
}
interface AbsencesState {
  absences: Absence[]
}

const initialMembersState: MembersState = {
  members: [],
}
const initialAbsencesState: AbsencesState = {
  absences: [],
}

const memberSlice = createSlice({
  name: 'member',
  initialState: initialMembersState,
  reducers: {
    setMembers(state, action: PayloadAction<Member[]>) {
      state.members = action.payload
    }
  }
})

const absenceSlice = createSlice({
  name: 'absence',
  initialState: initialAbsencesState,
  reducers: {
    setAbsences(state, action: PayloadAction<Absence[]>) {
      state.absences = action.payload
    }
  }
})

export const { setMembers } = memberSlice.actions
export const { setAbsences } = absenceSlice.actions

export const reducers = {
  memberReducer: memberSlice.reducer,
  absenceReducer: absenceSlice.reducer,
}
