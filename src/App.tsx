import React, { useEffect } from 'react';
import './App.css';
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowEntry, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { Absence, AbsenceStatus, Member } from './types';
import { useGetAbsencesQuery, useGetMembersQuery } from './api-slice';
import { getAbsenceStatus } from './shared';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BasicDateRangePicker from './BasicDateRangePicker';
import { AbsenceStatusIcon } from './AbsenceStatusIcon';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const { data: absences, isFetching, isSuccess } = useGetAbsencesQuery()
  const { data: members, isFetching: isFetchingMembers } = useGetMembersQuery()

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'period', headerName: 'Period', width: 180 },
    { field: 'memberNote', headerName: 'Member Note', width: 200 },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params: GridRenderCellParams<any, any, any>) => <AbsenceStatusIcon status={params.value} /> },
    { field: 'admitterNote', headerName: 'Admitter Note', width: 200 },
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


  // const filteredRows = rows.map((row: GridRowEntry) => {
  //   if(row.)
  // })

  const onPeriodChange = (value: any) => {
    if (value.length === 0) return


    console.log(value[0].$d)
    console.log(value[1].$d)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <h1>Absence Manager</h1>
        <BasicDateRangePicker onChange={onPeriodChange} />
        <div className='datagrid'>
          {isFetching || isFetchingMembers ? <p>Loading...</p> : null}
          <DataGrid
            className='datagrid'
            rows={rows}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
