export type Member = {
  crewId: number
  id: number
  image: string
  name: string
  userId: number
}

export type Absence = {
  admitterId?: number
  admitterNote: string
  confirmedAt: Date
  createdAt: Date
  crewId: number
  endDate: Date
  id: number
  memberNote: string
  rejectedAt?: Date
  startDate: Date
  type: AbsenceType
  userId: 2664
}

export type AbsenceType = "sickness" | "vacation"

export type ApiResult<T> = {
  message: string,
  payload: T,
}

