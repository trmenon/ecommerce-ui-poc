// WishList Component lists all he wishlist items
// Rendered with an icon button, onClick displaying WishList as menu
// It functions as a view and adding wishlist directly to cart

import React, {useState} from "react";

// Legacy Imports
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';

// Icon Imports
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

// Models
import { ResponeDataProps } from "../../models/types";
interface WishListprops {
    data: ResponeDataProps[];
    isAddedToCart: (item_id: number)=> boolean; 
    addToCart: (item: ResponeDataProps)=> void;
}

export const WishListComponent: React.FC<WishListprops> = ({
    data,
    isAddedToCart,
    addToCart,
})=> {
    // States
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // State Handlers
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const handleClose = ()=> {
        setAnchorEl(null);
        setOpen(false);
    }

    // Event Handlers
    const handleItemClick = (item: ResponeDataProps)=> addToCart(item);

    // Renderer
    return(
        <React.Fragment>
            <IconButton
                color="error"
                aria-label="open drawer"
                onClick={handleOpen}
                edge="start"
            >
                <FavoriteOutlinedIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    data.length === 0?
                            <MenuItem 
                                key={`wish_list_menu_item_empty_key`}
                                divider
                            >
                                <Avatar><ListItemIcon/></Avatar> 
                                {'You have not added anything'}
                            </MenuItem>
                            :
                            data.map((data_item: ResponeDataProps)=> {
                                return (
                                    <MenuItem 
                                        key={`wish_list_menu_item_${data_item?.id}_key`}
                                        divider
                                    >
                                        <ListItem
                                            secondaryAction={
                                                <IconButton 
                                                    edge="end" 
                                                    disabled={isAddedToCart(data_item?.id)? true: false}
                                                    onClick={()=> handleItemClick(data_item)}
                                                >
                                                    <AddShoppingCartOutlinedIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar 
                                                    src={data_item?.imageURL}
                                                    sx={{ width: 24, height: 24 }}
                                                /> 
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={data_item?.name}
                                                secondary={data_item?.type}
                                            />
                                        </ListItem>
                                </MenuItem>
                                )
                            })
                }
            </Menu>
        </React.Fragment>
    )
}