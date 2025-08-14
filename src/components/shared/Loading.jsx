import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularLoader() {
    return (
        <Box
            sx={{
                height: 100,
                width: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
            }}
        >
            <CircularProgress sx={{ color: '#3B235D' }} />
        </Box>
    );
}
