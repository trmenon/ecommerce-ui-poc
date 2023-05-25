// BoardSection renders the items as per selected filters onto a board
// data: Current Renderable Data
// wishList: All items in wish list
// cartList: All items in cart
// addToWishList: callback to add to wishlist
// addToCart: callback to add to cart

import React from "react";

// Legacy Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

// HOC Imports
import { ItemCard } from "../../components/item-card/ItemCard";

// Icon Imports

// Types
import { ResponeDataProps, TransactionItemProps } from "../../models/types";
interface BoardSectionProps {
    data: ResponeDataProps[];
    wishList: ResponeDataProps[];
    cartList: TransactionItemProps[];
    addToWishList: (item: ResponeDataProps)=> void;
    addToCart: (item: ResponeDataProps)=> void;
}

export const BoardSection: React.FC<BoardSectionProps> = ({
    data,
    wishList,
    cartList,
    addToWishList,
    addToCart,
})=> {

    // Event Handlers

    // Renderer
    return(
        <React.Fragment>
            <Box
                sx={{
                    p: {xs: '8px', sm: '16px', md: '24px', lg: '32px', xl: '40px'},
                    height: `calc(100vh - 196px)`,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '24px',
                        backgroundColor: '#f7f4f4', 
                        overflow: 'scroll', 
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {display: 'none'},
                    }}
                >
                    <Grid container spacing={0} sx={{width: '100%', padding: '24px',}}>
                        {
                            data.length === 0?
                                <Grid 
                                    key={'empty-board-key'}
                                    item 
                                    xs={12}
                                    sx={{p: 4}}
                                >
                                    <Alert severity="info">No items to show</Alert>
                                </Grid>
                                :
                                data.map((element: ResponeDataProps)=> {
                                    return(
                                        <Grid 
                                            key={element?.id}
                                            item 
                                            xs={12}
                                            sm={10}
                                            md={4}
                                            lg={3}
                                            xl={2}
                                            sx={{p: 4}}
                                        >
                                            <ItemCard                                                
                                                id={element?.id}
                                                imageURL={element?.imageURL}
                                                name={element?.name}
                                                type={element?.type}
                                                price={element?.price}
                                                currency={element?.currency}
                                                color={element?.color}
                                                gender={element?.gender}
                                                quantity={element?.quantity}
                                                addedToWishList={
                                                    wishList.filter((wish_list_item: ResponeDataProps)=>
                                                        wish_list_item?.id === element?.id
                                                    ).length === 0? false: true
                                                }
                                                addedToCart={
                                                    cartList.filter((cart_list_item: TransactionItemProps)=>
                                                        cart_list_item?.item?.id === element?.id
                                                    ).length === 0? false: true
                                                }
                                                addToWishList={addToWishList}
                                                addToCart={addToCart}
                                            />
                                        </Grid>
                                    )
                                })
                        }
                    </Grid>
                </Paper>
            </Box>
        </React.Fragment>
    )
}