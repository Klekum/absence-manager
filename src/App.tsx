import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { faCalendarCheck, faHospital, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useGetAbsencesQuery, useGetMembersQuery } from './api-slice';
import './App.css';
import { AbsenceTypeFilters } from './components/AbsenceStatusFilters';
import BasicDateRangePicker from './components/BasicDateRangePicker';
import { CustomNoRowsOverlay } from './components/CustomNoRowsOverlay';
import { FlexiBox } from './components/FlexiBox';
import { ICSExporter } from './components/ICSExporter';
import { StatusIcon } from './components/StatusIcon';
import { getAbsenceStatus } from './shared';
import { Absence, AbsenceType, IcsEvent, Member } from './types';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: [
      'Source Sans Pro',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const { id } = useParams<{ id: string }>();
  const [periodFilter, setPeriodFilter] = React.useState<DateRange<Dayjs>>([
    dayjs('2020-12-01'),
    dayjs('2021-12-31'),
  ])
  const [absenceFilter, setAbsenceFilter] = React.useState<AbsenceType | null>(null)
  const { data: absences, isFetching, isSuccess, isError } = useGetAbsencesQuery()
  const { data: members, isFetching: isFetchingMembers } = useGetMembersQuery()

  const columns: GridColDef[] = [
    {
      field: 'name', headerName: 'Name', width: 160, flex: 1, renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <Link to={`/member/${params.row.userId}`}>{params.value}</Link>
      }
    },
    { field: 'type', headerName: 'Type', width: 100, flex: 1, renderCell: (params: GridRenderCellParams<any, any, any>) => <StatusIcon status={params.value} /> },
    { field: 'period', headerName: 'Period', flex: 2, width: 180 },
    { field: 'memberNote', headerName: 'Member Note', flex: 2, width: 200 },
    { field: 'status', headerName: 'Status', width: 100, flex: 1, renderCell: (params: GridRenderCellParams<any, any, any>) => <StatusIcon status={params.value} /> },
    { field: 'admitterNote', headerName: 'Admitter Note', flex: 2, width: 200 },
    {
      field: 'icalExport', headerName: 'iCal Export', width: 70, flex: 1, renderCell: (params: GridRenderCellParams<any, any, any>) => {
        if (!params.value) return ''
        const { row } = params
        const user = members?.payload.find((member: Member) => member.userId === row.userId)
        const event: IcsEvent = {
          start: new Date(row.startDate),
          end: new Date(row.endDate),
          title: `${row.type} - ${user?.name}`,
          description: `${row.type} for ${user?.name}\nAdmitter Note: ${row.admitterNote}\nMember Note: ${row.memberNote}`,
        }
        return <ICSExporter event={event} >
          <FontAwesomeIcon icon={faCalendarPlus} />
        </ICSExporter>
      }
    }
  ]

  const rows = isSuccess && absences.payload.length ? absences.payload.map((absence: Absence) => {
    const member = members?.payload?.find((member: Member) => member.userId === absence.userId)
    const period = `${absence.startDate} - ${absence.endDate}`
    const gridRow: any = {
      ...absence,
      name: member?.name,
      status: getAbsenceStatus(absence),
      period,
      icalExport: !!absence.confirmedAt
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

  const sickDays = filteredRows.filter((row: Absence) => row.type === 'sickness').length
  const vacationDays = filteredRows.filter((row: Absence) => row.type === 'vacation').length

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className='App-header'>
        <h1>
          <Link to="/">
            <FontAwesomeIcon icon={faCalendarCheck} />
            &nbsp;
            Absence Manager
          </Link>
        </h1>
      </div>
      <div className='App-contents'>
        {isError && <Alert severity='error'>Data could not be loaded. Please try again later.</Alert>}

        <Outlet />

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='filters'>
          <FlexiBox>
            <strong>{filteredRows.length}</strong> &nbsp;/&nbsp;
            <FontAwesomeIcon icon={faSun} />&nbsp;{vacationDays}&nbsp;/&nbsp;
            <FontAwesomeIcon icon={faHospital} />&nbsp;{sickDays}
          </FlexiBox>

          <FlexiBox>
            <Box sx={{ borderRight: 1, marginRight: '2vw', marginLeft: '2vw', borderColor: 'grey.400' }}>
              <AbsenceTypeFilters onChange={setAbsenceFilter} />
            </Box>
            <BasicDateRangePicker onChange={onPeriodChange} defaultValue={periodFilter} />
          </FlexiBox>
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
      <div className='App-footer'>
        <p>?? 2023</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
