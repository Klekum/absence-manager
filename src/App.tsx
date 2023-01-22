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
import { Absence, Member } from './types';
import { MemberDetail } from './MemberDetail';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const { id } = useParams<{ id: string }>();

  const { data: absences, isFetching, isSuccess } = useGetAbsencesQuery()
  const { data: members, isFetching: isFetchingMembers } = useGetMembersQuery()

  const columns: GridColDef[] = [
    {
      field: 'name', headerName: 'Name', width: 160, renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return <Link to={`member/${params.row.userId}`}>{params.value}</Link>
      }
    },
    { field: 'type', headerName: 'Type', width: 100, renderCell: (params: GridRenderCellParams<any, any, any>) => <StatusIcon status={params.value} /> },
    { field: 'period', headerName: 'Period', width: 180 },
    { field: 'memberNote', headerName: 'Member Note', width: 200 },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params: GridRenderCellParams<any, any, any>) => <StatusIcon status={params.value} /> },
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


  const filteredRows = rows.filter((row: Absence) => {
    if (!id) return true
    return row.userId === parseInt(id)
  })

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
        <Outlet />
        <BasicDateRangePicker onChange={onPeriodChange} />
        <div className='datagrid'>
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
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
