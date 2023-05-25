// Main Component: Serves as the main controller component 
// It contains state handlers, utilities and refiner functions
// Sectioned into TopBar, FilterSection, BoardSection
// TopBar renders Brand, WishList IconButtonComponent, Cart IconButtonComponent
// FilterSection renders the searchfield for searching with filters
// BoardSection renders the list of items in a board in card format

import React, {useState, useEffect} from "react";
import axios from 'axios';
import { constants } from "../constants/constants";
import { ResponeDataProps, TransactionItemProps } from "../models/types";
import { FilterSection, BoardSection, TopbarSection } from "./sections";

// legacy Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


export const MainComponent: React.FC = ()=> {
    // States
    const [search, setSearch] = useState('');
    const [data, setData] = useState<ResponeDataProps[]>([]);
    const [render, setRender] = useState<ResponeDataProps[]>([]);
    const [wishList, setWishList] = useState<ResponeDataProps[]>([]);
    const [cart, setCart] = useState<TransactionItemProps[]>([]);
    const [genderFilter, setGenderFilter] = useState<string[]>([]);
    const [colorFilter, setColorFilter] = useState<string[]>([]);

    // Effects
    useEffect(()=> {fetchData();},[]);
    useEffect(()=> {
        let current_render: ResponeDataProps[] = data;
        if(search.length > 0) {
            const regEx_string = `^${search}`;
            const regexp = new RegExp(regEx_string);
            current_render =  data.filter((data_item: ResponeDataProps)=> 
                regexp.test(data_item.name)
            );            
        }
        if(colorFilter.length > 0) {
            current_render = current_render.filter((element: ResponeDataProps)=>{
                return colorFilter.includes(element?.color)
            })
        }
        if(genderFilter.length > 0) {
            current_render = current_render.filter((element: ResponeDataProps)=>{
                return genderFilter.includes(element?.gender)
            })
        }
        setRender(current_render);
    }, [search, colorFilter, genderFilter]);
    useEffect(()=> {setRender(data)}, [data]);

    // State handlers
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=> setSearch(e.target.value);

    // API Call
    const fetchData = ()=> {
        try{
            axios.get(constants['base_url'])
            .then((response: any)=> {
                if(
                    response &&
                    response?.status === 200 &&
                    response?.data && 
                    Array.isArray(response?.data)
                ) {
                    setData(response?.data)
                }
            }).catch((error)=> {
                console.log(error);
            })
        }catch(err) {
            console.log(err);
        }
    }

    // Event Handlers
    const handleAddToWishList = (item: ResponeDataProps)=> {
        const item_index = wishList.findIndex((wish_list_item: ResponeDataProps)=> item?.id === wish_list_item.id);
        if(item_index>=0) {
            const updated_wish_list = wishList.filter((fil_wish_list: ResponeDataProps)=> fil_wish_list.id !== item?.id);
            setWishList(updated_wish_list);
        }else {
            setWishList([...wishList, item]);
        }
    }
    const handleAddToCart = (item: ResponeDataProps)=> {
        const item_index = cart.findIndex((cart_item: TransactionItemProps)=> item?.id === cart_item.item.id);
        if(item_index>=0) {
            const updated_cart_list = cart.filter((fil_cart_list: TransactionItemProps)=> fil_cart_list.item.id !== item?.id);
            setCart(updated_cart_list);
            const updated_render_list = render.map((render_item: ResponeDataProps)=> {
                if(render_item?.id === item?.id) {
                    return {
                        ...render_item,
                        quantity: render_item?.quantity + item?.quantity
                    }
                }else {
                    return render_item
                }
            });
            setRender(updated_render_list); 
        }else {
            setCart([
                ...cart, 
                {
                    item: item,
                    quantity: 1,
                    unit_price: item?.price,
                    net_price: item?.price
                }
            ]);
            const update_render_list = render.map((render_item: ResponeDataProps)=> {
                if(render_item?.id === item?.id) {
                    return {
                        ...render_item,
                        quantity: render_item?.quantity - 1
                    }
                }else {
                    return render_item
                }
            })
            setRender(update_render_list); 
        }
    }
    const isPresentInCart = (id: number)=> {
        if(cart.filter((item: TransactionItemProps)=> item?.item?.id === id).length > 0) {
            return true;
        }
        return false;
    }
    const incrementCartItem = (id: number)=> {
        const updated_cart = cart.map((element: TransactionItemProps)=> {
            if(element?.item?.id === id) {
                return {
                    ...element,
                    quantity: element?.quantity + 1,
                    net_price: (element?.quantity+1)*element?.unit_price
                }
            }else {
                return element;
            }
        });
        setCart(updated_cart);
        const updated_render_data = render.map((render_element: ResponeDataProps)=> {
            if(render_element?.id === id) {
                return{
                    ...render_element,
                    quantity: render_element?.quantity-1
                }
            }else{
                return render_element;
            }
        })
        setRender(updated_render_data)
    }
    const decrementCartItem = (id: number)=> {
        if(cart.find((item: TransactionItemProps)=> item.item.id === id)?.quantity === 1) {
            removeFromCart(id);
        }else{
            const updated_cart = cart.map((element: TransactionItemProps)=> {
                if(element?.item?.id === id) {
                    return {
                        ...element,
                        quantity: element?.quantity - 1,
                        net_price: (element?.quantity-1)*element?.unit_price
                    }
                }else {
                    return element;
                }
            });
            setCart(updated_cart);
            const updated_render_data = render.map((render_element: ResponeDataProps)=> {
                if(render_element?.id === id) {
                    return{
                        ...render_element,
                        quantity: render_element?.quantity+1
                    }
                }else{
                    return render_element;
                }
            })
            setRender(updated_render_data)
        }
    }
    const removeFromCart = (id: number)=> {
        const updated_cart = cart.filter((item: TransactionItemProps)=> item.item.id !== id);
        const updated_render_data = render.map((element: ResponeDataProps)=> {
            if(element?.id === id) {
                return {
                    ...element,
                    quantity: element?.quantity+1
                }
            }else {
                return element;
            }
        });
        setCart(updated_cart);
        setRender(updated_render_data);
    }
    const getCurrentStockByItemId = (id: number)=> {
        const req_item = render.find((item: ResponeDataProps)=> item?.id === id);
        return req_item?.quantity || 0
    }
    const handleColorlistMutation = (col: string)=> {
        if(colorFilter.includes(col)) {
            const updated_color_filter_list = colorFilter.filter((element: string)=> {
                return element !== col
            });
            setColorFilter(updated_color_filter_list);
        }else {
            setColorFilter([...colorFilter, col]);
        }
    }
    const handleGenderlistMutation = (gen: string)=> {
        if(genderFilter.includes(gen)) {
            const updated_gender_filter_list = genderFilter.filter((element: string)=> {
                return element !== gen
            });
            setGenderFilter(updated_gender_filter_list);
        }else {
            setGenderFilter([...genderFilter, gen]);
        }
    }

    // Renderer
    return(
        <React.Fragment>
            <TopbarSection 
                wishList={wishList}
                cartList={cart}
                isPresentInCart={isPresentInCart}
                addToCart={handleAddToCart}
                getCurrentStock = {getCurrentStockByItemId}
                onIncrease = {incrementCartItem}
                onDecrease = {decrementCartItem}
            />
            <Box sx={{mt: '72px',backgroundColor: '#FFF',width: '100%',}}>
                <Stack spacing={'4px'}>
                    <FilterSection 
                        search={search}
                        current_data={data}
                        colorFilter={colorFilter}
                        genderFilter={genderFilter}
                        onChangeSearchQuery={handleSearchChange}
                        mutateColorList={handleColorlistMutation}
                        mutateGenderList={handleGenderlistMutation}
                    />    
                    <BoardSection 
                        data = {render}
                        wishList = {wishList}
                        cartList = {cart}
                        addToWishList = {handleAddToWishList}
                        addToCart = {handleAddToCart}
                    />
                </Stack>
            </Box>
        </React.Fragment>
    )
}