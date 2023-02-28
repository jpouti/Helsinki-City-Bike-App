import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type ErrorMessageProps = {
    error: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return (
        <Box id='error-message' sx={{ p: 2 }}>
            <Typography color={'red'} variant='h5'>{error}</Typography>
        </Box>
    )
}

export default ErrorMessage