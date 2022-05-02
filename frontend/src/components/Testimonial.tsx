import React from 'react';
import { Box, Typography } from '@mui/material';
import Star from '@mui/icons-material/StarRate';

type Props = {
  review: string;
};

export default function Testimonial({ review }: Props) {
  return (
    <Box
      m={4}
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box mt={2}>
        <Star sx={{ color: '#e8d317' }} />
        <Star sx={{ color: '#e8d317' }} />
        <Star sx={{ color: '#e8d317' }} />
        <Star sx={{ color: '#e8d317' }} />
      </Box>
      <Box maxWidth={400}>
        <Typography mx={4} my={2} sx={{ fontWeight: 500, fontSize: 14 }}>
          {review}
        </Typography>
        <Typography
          ml={4}
          mb={4}
          variant="subtitle1"
          sx={{ fontWeight: 'light' }}
        >
          Date: 15th July, 2022
        </Typography>
      </Box>
    </Box>
  );
}
