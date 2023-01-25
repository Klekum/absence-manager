import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import React from "react"
import { AbsenceType } from "../types"
import { FlexiBox } from "./FlexiBox"

interface PropDefs {
  onChange: (value: AbsenceType | null) => void
}

export const AbsenceTypeFilters = ({ onChange }: PropDefs) => {

  const [selections, setSelections] = React.useState<AbsenceType[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as AbsenceType
    const newSelections = [...selections]
    newSelections.includes(value) ? newSelections.splice(newSelections.indexOf(value), 1) : newSelections.push(value)
    setSelections(newSelections)
    onChange(newSelections.length === 1 ? newSelections[0] : null)
  }

  return <FlexiBox flexDirection="column" alignItems="center">
    <FormGroup onChange={handleChange} sx={{ display: 'flex', flexDirection: 'row' }}>
      <FlexiBox>
        <FormControlLabel value="vacation" control={<Checkbox />} label="Vacation" />
      </FlexiBox>
      <FlexiBox>
        <FormControlLabel value="sickness" control={<Checkbox />} label="Sick" />
      </FlexiBox>
    </FormGroup>
  </FlexiBox >
}