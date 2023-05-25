import React from 'react';

// Legacy Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { purple } from '@mui/material/colors';

// Icon Imports
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

// Models
import { ItemcardProps, ResponeDataProps } from '../../models/types';

export const ItemCard: React.FC<ItemcardProps> = ({
    id,
    imageURL,
    name,
    type,
    price,
    currency,
    color,
    gender,
    quantity,
    addedToWishList,
    addedToCart,
    addToWishList,
    addToCart,
})=> {
    // Event Handlers
    const handleClickWishlistBtn = (item: ResponeDataProps)=> addToWishList(item);
    const handleAddToCartBtn = (item: ResponeDataProps)=> addToCart(item);

    // renderer
    return(
        <React.Fragment>
            <Card sx={{ width: '100%', borderRadius: '8px' }}>
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: purple[500] }}><LocalMallOutlinedIcon/></Avatar>}
                    action={
                        <Tooltip title={`${addedToWishList? 'Remove from': 'Add to'} wishlist`}>
                            <IconButton 
                                sx={{
                                    color: addedToWishList? '#f90000':'#cecece',
                                    '&: hover': {
                                        backgroundColor: addedToWishList? '#e3c6c4':'#e5e1e1'
                                    }
                                }}
                                onClick={()=> handleClickWishlistBtn({
                                    id, 
                                    imageURL,
                                    name, 
                                    type, 
                                    price, 
                                    currency, 
                                    color, 
                                    gender,
                                    quantity,
                                })}
                            >
                                <FavoriteOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    title={name}
                    subheader={type}
                />
                <CardMedia
                    component="img"
                    height="140"
                    image={imageURL}
                    alt="Paella dish"
                />
                <CardContent>
                    <Stack spacing={'8px'}>
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{textAlign: 'left'}}
                        >
                            {`${quantity} left in stock`}
                        </Typography>
                        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                            <Chip 
                                label={`${currency}.${price}/-`}
                                variant="outlined"
                                color='primary' 
                            />
                            <Chip 
                                label={color}
                                variant="outlined"
                                color='primary' 
                            />
                            <Chip 
                                label={gender}
                                variant="outlined"
                                color='primary' 
                            />
                        </Box>                        
                    </Stack>
                </CardContent>
                <CardActions disableSpacing>
                    <Button 
                        variant="text"
                        disabled={addedToCart? true: quantity<1? true: false}
                        color='secondary'
                        startIcon={<AddShoppingCartOutlinedIcon />}
                        onClick = {()=> handleAddToCartBtn({
                            id, 
                            imageURL,
                            name, 
                            type, 
                            price, 
                            currency, 
                            color, 
                            gender,
                            quantity,
                        })}
                    >
                        Add to cart
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}