import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowEntry } from '@mui/x-data-grid';
import { Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { useGetAbsencesQuery, useGetMembersQuery } from './api-slice';
import './App.css';
import BasicDateRangePicker from './BasicDateRangePicker';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { getAbsenceStatus } from './shared';
import { StatusIcon } from './StatusIcon';
import { Absence, AbsenceType, Member } from './types';
import React from 'react';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AbsenceTypeFilters } from './AbsenceStatusFilters';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarDays, faFilter } from '@fortawesome/free-solid-svg-icons';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: [
      'Source Sans Pro',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


function App() {
  const { id } = useParams<{ id: string }>();
  const [periodFilter, setPeriodFilter] = React.useState<DateRange<Dayjs>>([
    dayjs('2011-01-01'),
    dayjs('2021-12-31'),
  ])
  const [absenceFilter, setAbsenceFilter] = React.useState<AbsenceType | null>(null)
  const { data: absences, isFetching, isSuccess } = useGetAbsencesQuery()
  const { data: members, isFetching: isFetchingMembers } = useGetMembersQuery()

  const columns: GridColDef[] = [
    {
      field: 'name', headerName: 'Name', width: 160, flex: 1, renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <Link to={`member/${params.row.userId}`}>{params.value}</Link>
      }
    },
    { field: 'type', headerName: 'Type', width: 100, flex: 1, renderCell: (params: GridRenderCellParams<any, any, any>) => <StatusIcon status={params.value} /> },
    { field: 'period', headerName: 'Period', flex: 2, width: 180 },
    { field: 'memberNote', headerName: 'Member Note', flex: 2, width: 200 },
    { field: 'status', headerName: 'Status', width: 100, flex: 1, renderCell: (params: GridRenderCellParams<any, any, any>) => <StatusIcon status={params.value} /> },
    { field: 'admitterNote', headerName: 'Admitter Note', flex: 2, width: 200 },
  ]

  const rows = isSuccess && absences.payload.length ? absences.payload.map((absence: Absence) => {
    const member = members?.payload?.find((member: Member) => member.userId === absence.userId)
    const period = `${absence.startDate} - ${absence.endDate}`
    const gridRow: any = {
      ...absence,
      name: member?.name,
      status: getAbsenceStatus(absence),
      period,
    }
    return gridRow
  }) : []

  const filteredRows = rows.filter((row: Absence) => {
    if (periodFilter.length > 0) {
      const startDate = dayjs(row.startDate)
      const endDate = dayjs(row.endDate)
      if (periodFilter[0] && startDate < periodFilter[0]) return false
      if (periodFilter[1] && endDate > periodFilter[1]) return false
    }
    if (absenceFilter && absenceFilter !== row.type) return false
    if (!id) return true
    return row.userId === parseInt(id)
  })

  const onPeriodChange = (value: any) => {
    if (value.length === 0) return
    const newPeriod: DateRange<Dayjs> = [null, null]
    if (value[0]?.$d) newPeriod[0] = value[0].$d
    if (value[1]?.$d) newPeriod[1] = value[1].$d
    setPeriodFilter(newPeriod)
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className='App-header'>
        <h1>
          <FontAwesomeIcon icon={faCalendarCheck} />
          &nbsp;
          Absence Manager
        </h1>
      </div>
      <div className='App-contents'>

        <Outlet />
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <AbsenceTypeFilters onChange={setAbsenceFilter} />
          <BasicDateRangePicker onChange={onPeriodChange} defaultValue={periodFilter} />
        </Box>
        <Box className='datagrid'>
          {isFetching || isFetchingMembers ? <p>Loading...</p> : null}
          <DataGrid
            className='datagrid'
            rows={filteredRows}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            isRowSelectable={() => false}
          />
        </Box>
      </div>

    </ThemeProvider>
  );
}

export default App;
