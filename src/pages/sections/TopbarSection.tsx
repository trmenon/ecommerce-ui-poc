// TopBarSection renders as the top bar on the page
// It contains Brandname, wishlistComponent, cartListComponent
// BrandName is a normal typography element
// WishListComponent is an icon button, with menu to manage wishlist
// CartListComponent is an icon button, with menu to manage cart

import React from 'react';

// Legacy Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// HOC Imports
import { WishListComponent } from '../../components/wish-list/WishList';
import { CartListComponent } from '../../components/cart-list/CartListComponent';

// Types
import { ResponeDataProps, TransactionItemProps } from '../../models/types';
interface TopbarSectionProps {
    wishList: ResponeDataProps[];
    cartList: TransactionItemProps[];
    isPresentInCart: (item_id: number)=> boolean;
    addToCart: (item: ResponeDataProps)=> void;
    getCurrentStock: (item_id: number)=> number; 
    onIncrease: (id: number)=> void;
    onDecrease: (id: number)=> void;
}

export const TopbarSection: React.FC<TopbarSectionProps> = ({
    wishList,
    cartList,
    isPresentInCart,
    addToCart,
    getCurrentStock,
    onIncrease,
    onDecrease,
})=> {

    // Event Handlers

    // Renderer
    return(
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar 
                    position="fixed"
                    elevation={0} 
                    sx={{width: '100vw', backgroundColor: '#f7f4f4'}}
                >
                    <Toolbar 
                        sx={{
                            display: 'flex', 
                            alignitems: 'center', 
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography 
                            component="div" 
                            sx={{ 
                                flexGrow: 1, 
                                color: '#565360', 
                                fontWeight: 700, 
                                fontSize: '32px' 
                            }}
                        >
                            TeeRex Store
                        </Typography>
                        <Stack direction={'row'} spacing={'8px'}>
                            <WishListComponent 
                                data={wishList}                                
                                isAddedToCart={isPresentInCart}
                                addToCart={addToCart}
                            />
                            <CartListComponent 
                                data = {cartList}
                                getCurrentStock = {getCurrentStock}
                                onIncrease = {onIncrease}
                                onDecrease = {onDecrease}
                            />
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    )
}