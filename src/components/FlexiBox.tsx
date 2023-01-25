import { Box } from "@mui/material"

interface PropDefs {
  children: React.ReactNode
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
  flexDirection?: 'row' | 'column'
  className?: string
}

export const FlexiBox = ({ children, justifyContent, alignItems = 'center', flexDirection = 'row', className = '' }: PropDefs) => {
  let sx: any = { display: 'flex', flexDirection }
  if (justifyContent) sx.justifyContent = justifyContent
  if (alignItems) sx.alignItems = alignItems

  return (
    <Box sx={sx} className={className}>
      {children}
    </Box>
  )
}