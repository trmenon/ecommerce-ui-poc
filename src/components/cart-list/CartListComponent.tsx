// CartList Component lists all the cart items
// Rendered with an icon button, onClick displaying cart as menu
// Menu Footer contains checkout button rendered only when cart contains items
// It functions as a view and manage component
// Decreasing quantity below 1, will automatically remove item from the cart
// Increasing only upto available stock is possible

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
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';

// HOC Imports
import { CustomDialer } from "../custom-dialer/CustomDialer";
import { CheckoutComponent } from "./components";

// Icon Imports
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// Models
import { CartManageComponent, TransactionItemProps } from "../../models/types";


export const CartListComponent: React.FC<CartManageComponent> = ({
    data,
    getCurrentStock,
    onIncrease,
    onDecrease,
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
    const handleIncrement = (id: number)=> onIncrease(id);
    const handleDecrement = (id: number)=> onDecrease(id);

    // Renderer
    return(
        <React.Fragment>
            <Badge
                anchorOrigin={{horizontal: 'right', vertical: 'top'}} 
                badgeContent={data.length.toString()} 
                color="info"
                overlap="circular"
            >
                <IconButton
                    color="secondary"
                    aria-label="open drawer"
                    onClick={handleOpen}
                    edge="start"
                >
                    <ShoppingCartOutlinedIcon />
                </IconButton>
            </Badge>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        width: '320px',
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
                        <MenuItem key={`wish_list_menu_item_empty_key`}>
                            <Avatar><ListItemIcon/></Avatar> 
                            {'Your cart is empty'}
                        </MenuItem>
                        :
                        data.map((data_item: TransactionItemProps)=> {
                            return(                                
                                <ListItem
                                    key={`cart_list_menu_item_${data_item?.item?.id}_key`}
                                    secondaryAction={
                                        <CustomDialer
                                            value={data_item?.quantity}
                                            minValue={0}
                                            maxValue={getCurrentStock(data_item?.item?.id)}
                                            onUp={()=> handleIncrement(data_item?.item?.id)}
                                            onDown={()=> handleDecrement(data_item?.item?.id)}
                                        />
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar 
                                            src={data_item?.item?.imageURL}
                                            sx={{ width: 14, height: 14 }}
                                        /> 
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={data_item?.item?.name}
                                        secondary={`${data_item?.item?.currency} ${data_item?.net_price}`}
                                    />
                                </ListItem>
                            )
                        })
                }
                <Divider/>
                <MenuItem 
                    key={`proceed_button_key`} 
                    sx={{mt: '12px', display: data?.length === 0? 'none': 'block'}}
                >
                    <CheckoutComponent 
                        cartItemsList={data}
                    />
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}