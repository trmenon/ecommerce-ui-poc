// FilterButton is the HOC embedded into FilterSection Search textfield at the endicon
// Its uses an icon button upon clicking triggering filter drawer
// Drawer is sectioned into close-icon-button, color-filter-options, gender-filter-options[3 sections]
// color_options: List of all available colors as determined by the parent FilterSection-component
// color: Currently selected color passed down from the MainComponent
// gender_options: List of all available colors as determined by the parent FilterSection-component
// gender: Currently selected genders passed down from the MainComponent
// handleColorClick: Consumes mutateColorList callback
// handleGenderClick: Consumes mutateGenderList callback

import React, {useState} from 'react';

// legacy Imports
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

// Icon Imports
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

// Types
import { ListOptionProps } from '../../../models/types';
interface FilterButtonProps {
    color_options: ListOptionProps[];
    color: string[];
    gender_options: ListOptionProps[];
    gender: string[];
    handleColorClick: (col: string)=> any;
    handleGenderClick: (gen: string)=> any;
}

export const FilterButton: React.FC <FilterButtonProps> = ({
    color_options,
    color,
    gender_options,
    gender,
    handleColorClick,
    handleGenderClick,
})=> {

    // States
    const [open, setOpen] = useState(false);

    // State Handlers
    const handleOpen = () => setOpen(true);
    const handleClose = ()=> setOpen(false);

    // Event Handlers
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => handleColorClick(event.target.value);
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => handleGenderClick(event.target.value);
    

    // Renderer
    return(
        <React.Fragment>
            <Tooltip title="Try out some filters">
                <IconButton
                    color="secondary"
                    aria-label="open drawer"
                    onClick={handleOpen}
                    edge="start"
                >
                    <FilterListOutlinedIcon />
                </IconButton>
            </Tooltip>

            <Drawer
                anchor={'right'}
                open={open}
                onClose={handleClose}
            >
                <Stack 
                    spacing={'12px'}
                    divider={<Divider/>} 
                    sx={{width: '200px'}}
                >
                    <Box 
                        sx={{
                            px: '16px',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'flex-start'
                        }}
                    >
                        <IconButton
                            color="secondary"
                            onClick={handleClose}
                            edge="start"
                        >
                            <ChevronRightOutlinedIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{px: '16px',}}>
                        <Typography 
                            sx={{fontSize: '16px', color: '#2a2222', fontWeight: 600}}
                        >
                            {'Color'}
                        </Typography>
                        {
                            color_options.map((element: ListOptionProps)=> {
                                return(
                                    <Stack 
                                        key={element?.key} 
                                        direction={'row'} 
                                        spacing={'12px'}
                                        sx={{display: 'flex', alignItems: 'center'}}
                                    >
                                        <Checkbox
                                            size='small'
                                            color='secondary'
                                            value={element?.value}
                                            checked={color.includes(element?.value)}
                                            onChange={handleColorChange}
                                        />
                                        <Typography sx={{fontSize: '12px', color: '#544e4e'}}>
                                            {element?.label}
                                        </Typography>
                                    </Stack>
                                )
                            })
                        }
                    </Box>
                    <Box sx={{px: '16px',}}>
                        <Typography 
                            sx={{fontSize: '16px', color: '#2a2222', fontWeight: 600}}
                        >
                            {'Gender'}
                        </Typography>
                        {
                            gender_options.map((element: ListOptionProps)=> {
                                return(
                                    <Stack 
                                        key={element?.key} 
                                        direction={'row'} 
                                        spacing={'12px'}
                                        sx={{display: 'flex', alignItems: 'center'}}
                                    >
                                        <Checkbox
                                            size='small'
                                            color='secondary'
                                            value={element?.value}
                                            checked={gender.includes(element?.value)}
                                            onChange={handleGenderChange}
                                        />
                                        <Typography sx={{fontSize: '12px', color: '#544e4e'}}>
                                            {element?.label}
                                        </Typography>
                                    </Stack>
                                )
                            })
                        }
                    </Box>
                </Stack>
            </Drawer>
        </React.Fragment>
    )
}