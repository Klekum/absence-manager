import { Fade, Grow } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router";
import { useGetMembersQuery } from "../api-slice";
import { Member } from "../types";
import './MemberDetail.css';

export const MemberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: members, isFetching: isFetchingMembers } = useGetMembersQuery()
  if (isFetchingMembers) return <div>Loading...</div>

  const member = members?.payload?.find((member: Member) => member.userId === parseInt(id || '0'));

  return <Fade in={!!member}>
    <Box className="member-detail">
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Grow in={!!member}
          style={{ transformOrigin: '0 0 0' }}
        >
          <Box
            sx={{
              marginRight: 2,
              width: 200,
              height: 200,
              backgroundImage: 'url(' + member?.image + ')',
              backgroundSize: 'cover',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
        </Grow>
        <Box>
          <p className="filter-title">Member Details</p>
          <h1>{member?.name}</h1>
        </Box>
      </Box>
    </Box>

  </Fade>
}