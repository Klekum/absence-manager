import { Box } from "@mui/system";
import { useParams } from "react-router";
import { useGetMembersQuery } from "./api-slice";
import { Member } from "./types";

export const MemberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: members, isFetching: isFetchingMembers } = useGetMembersQuery()

  if (isFetchingMembers) return <div>Loading...</div>

  const member = members?.payload?.find((member: Member) => member.userId === parseInt(id || '0'));

  return <>
    <p className="filter-title">Member Details</p>

    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>

      <Box
        sx={{
          marginRight: 2,
          width: 200,
          height: 200,
          backgroundImage: 'url(' + member?.image + ')',
          backgroundSize: 'cover',
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
      <Box>
        <h1>{member?.name}</h1>
      </Box>
    </Box>
  </>
}