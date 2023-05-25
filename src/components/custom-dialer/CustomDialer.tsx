import React from "react";

// legacy Imports
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';

// Icon Imports
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

// Models
interface CustomDialerProps {
    value: number;
    maxValue: number;
    minValue: number;
    onUp: ()=> void;
    onDown: ()=> void;
}

export const CustomDialer: React.FC <CustomDialerProps> = ({
    value,
    maxValue,
    minValue,
    onUp,
    onDown
})=> {
    // event Handlers

    // rendrer
    return(
        <React.Fragment>
            <Stack direction={'row'} spacing={0}>
                <IconButton
                    color="secondary"
                    disabled={value<=minValue? true: false}
                    onClick={onDown}
                    size="small"
                >
                    <RemoveOutlinedIcon />
                </IconButton>
                <Box 
                    sx={{ 
                        backgroundColor: '#b5c9c5', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        px: '8px', 
                    }} 
                >
                    {value.toString()}
                </Box>
                <IconButton
                    color="secondary"
                    disabled={maxValue>0? false: true}
                    onClick={onUp}
                    size="small"
                >
                    <AddOutlinedIcon />
                </IconButton>
            </Stack>
        </React.Fragment>
    )
}