// Filter Component contains one compound textfield component with endIconProps as a Filter Icon button
// FilterIconButton is derived from HOC FilterButton
// On mounting, effects run to determine the values of gender and color currently present in the data
// onChangeSearchQuery: Callback that records current search-query
// mutateColorList: Callback that mutates ColorFilterList as per user desires
// mutateGenderList: Callback that mutates GenderFilterList as per user desires

import React, {useState, useEffect} from 'react';
import { FilterButton } from './components/FilterButton';

// Legacy Imports
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// Icon Imports
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';

// Models
import { ResponeDataProps, ListOptionProps } from '../../models/types';
interface FilterSectionProps {
    search: string;
    current_data: ResponeDataProps[];
    colorFilter: string[];
    genderFilter: string[];
    onChangeSearchQuery: (event: React.ChangeEvent<HTMLInputElement>)=> void;
    mutateColorList: (col: string)=> void;
    mutateGenderList: (gen: string)=> void; 
}

export const FilterSection: React.FC<FilterSectionProps> = ({
    search,
    current_data,
    colorFilter,
    genderFilter,
    onChangeSearchQuery,
    mutateColorList,
    mutateGenderList,
})=> {

    // States
    const [colorFilterOptions, setColorFilterOptions] = useState<ListOptionProps[]>([]);
    const [genderFilterOptions, setGenderFilterOptions] = useState<ListOptionProps[]>([]);

    // Effects
    useEffect(()=> {
        let current_color_options: ListOptionProps[] = [];
        let current_gender_options: ListOptionProps[] = [];
        current_data.forEach((data_item: ResponeDataProps)=> {
            if(current_color_options.filter((color_item: ListOptionProps)=> color_item?.value === data_item?.color).length === 0) {
                current_color_options.push({
                    key: `color-option${data_item?.color}-key`,
                    value: data_item?.color,
                    label: data_item?.color.toUpperCase()
                })
            }
            if(current_gender_options.filter((gender_item: ListOptionProps)=> gender_item?.value === data_item?.gender).length === 0) {
                current_gender_options.push({
                    key: `gender-option${data_item?.color}-key`,
                    value: data_item?.gender,
                    label: data_item?.gender.toUpperCase()
                })
            }
        });
        setColorFilterOptions(current_color_options);
        setGenderFilterOptions(current_gender_options);
    }, [current_data])

    // Event Handlers


    // Renderer
    return(
        <React.Fragment>
            <Stack 
                direction={'row'} 
                spacing={'12px'}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: {xs: '8px', sm: '16px', md: '24px', lg: '32px', xl: '40px'}
                }}
            >
                <TextField 
                    label="" 
                    variant="outlined"   
                    color='secondary'                   
                    value={search}
                    onChange={onChangeSearchQuery}
                    placeholder={'Search...'}
                    fullWidth
                    sx={{fieldset :{borderRadius: '28px',}}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TroubleshootOutlinedIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <FilterButton 
                                    color_options={colorFilterOptions}
                                    color={colorFilter}
                                    gender_options={genderFilterOptions}
                                    gender={genderFilter}
                                    handleColorClick={mutateColorList}
                                    handleGenderClick={mutateGenderList}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
        </React.Fragment>
    )
}