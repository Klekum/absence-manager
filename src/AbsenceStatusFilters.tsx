import React from "react"
import { Radio, FormControlLabel, RadioGroup, Box, Typography, Checkbox, FormGroup } from "@mui/material"
import { AbsenceType } from "./types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHospital, faPlane } from "@fortawesome/free-solid-svg-icons"
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

  return <FlexiBox flexDirection="column" alignItems="flex-start" >
    <p className="filter-title">Absence Type</p>

    <FormGroup onChange={handleChange} sx={{ display: 'flex', flexDirection: 'row' }}>
      <FlexiBox>
        <FontAwesomeIcon icon={faHospital} />&nbsp;
        <FormControlLabel value="sickness" control={<Checkbox />} label="Sick" />
      </FlexiBox>
      <FlexiBox>
        <FontAwesomeIcon icon={faPlane} />&nbsp;
        <FormControlLabel value="vacation" control={<Checkbox />} label="Vacation" />
      </FlexiBox>
    </FormGroup>
  </FlexiBox >
}