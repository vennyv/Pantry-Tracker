import {Box} from '@mui/material'
import {Stack} from '@mui/material'
import {Typography} from '@mui/material'


const item = ['tomato', 'potato', 'onion', 'garlic', 'ginger', 'carrot', 'cucumber', 'kale', ]

export default function Home() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box width = "800px" height="100px" bgcolor="#ADD8E6" display={'flex'} justifyContent={'center'} alignItems={'center'} border = {'1px solid #333'}
      >
        <Typography
          variant="h3"
          color="white"
          textAlign="center"
          fontWeight="bold"
        >
          Pantry Items
        </Typography>
      </Box>
      <Stack width = "800px" height="300px" spacing={2} overflow={'auto'}  >
        {item.map((item, i) => (
          <Box
            key={i}
            width="100%"
            height="100px"
            bgcolor="primary.main"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h3"
              color="white"
              textAlign="center"
              // fontWeight="bold"
            >
              {
                // Capitalize the first letter of the item
                item.charAt(0).toUpperCase() + item.slice(1)
              }
            </Typography>
              
            
          </Box>
        ))}
        </Stack>
    </Box>
  );
}