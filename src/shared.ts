import { Absence, AbsenceStatus } from "./types";

export const getAbsenceStatus = (absence: Absence): AbsenceStatus => {
  if(absence.confirmedAt) {
    return "confirmed"
  }
  if(absence.rejectedAt) {
    return "rejected"
  }
  return "requested"
}
