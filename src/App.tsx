import React, { useEffect } from 'react';
import './App.css';
import { DataGrid, GridColDef, GridRowEntry, GridValueGetterParams } from '@mui/x-data-grid';
import { Absence, Member } from './types';
import { useGetAbsencesQuery, useGetMembersQuery } from './api-slice';
import { getAbsenceStatus } from './shared';

function App() {
  const { data: absences, isFetching, isSuccess } = useGetAbsencesQuery()
  const { data: members, isFetching: isFetchingMembers } = useGetMembersQuery()

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'type', headerName: 'ToA', width: 100 },
    { field: 'period', headerName: 'Period', width: 180 },
    { field: 'memberNote', headerName: 'Member Note', width: 200 },
    { field: 'status', headerName: 'Status', width: 100 },
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Absence Manager</h1>
      </header>
      <div className='datagrid'>
        {isFetching || isFetchingMembers ? <p>Loading...</p> : null}
        <DataGrid
          className='datagrid'
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
}

export default App;
