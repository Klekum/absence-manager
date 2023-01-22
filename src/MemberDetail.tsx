import { Box } from "@mui/system";
import { useParams } from "react-router";
import { useGetMembersQuery } from "./api-slice";
import { Member } from "./types";

export const MemberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: members, isFetching: isFetchingMembers } = useGetMembersQuery()

  if (isFetchingMembers) return <div>Loading...</div>

  const member = members?.payload?.find((member: Member) => member.userId === parseInt(id || '0'));

  return <div>
    <h1>{member?.name}</h1>
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundImage: 'url(' + member?.image + ')',
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  </div>
}