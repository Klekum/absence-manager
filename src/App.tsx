import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { DataGrid, GridColDef, GridRowEntry, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from './hooks';
import { setAbsences, setMembers } from './slices';
import { Absence, Member } from './types';
import { useGetAbsencesQuery, useGetMembersQuery } from './api-slice';

function App() {
  const { data: absences, isFetching } = useGetAbsencesQuery()
  const { data: members, isFetching: isFetchingMembers } = useGetMembersQuery()

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'type', headerName: 'ToA', width: 70 },
    { field: 'period', headerName: 'Period', width: 130 },
    { field: 'memberNote', headerName: 'Member Note', width: 200 },
    { field: 'status', headerName: 'Status', width: 70 },
    { field: 'admitterNote', headerName: 'Admitter Note', width: 200 },
  ]

  const rows = absences && Array.isArray(absences) ? absences.map((absence: Absence, index: number) => {
    const member = members?.find((member: Member) => member.id === absence.userId)
    const period = `${absence.startDate} - ${absence.endDate}`
    const gridRow: any = {
      ...absence,
      name: member?.name,
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
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default App;
