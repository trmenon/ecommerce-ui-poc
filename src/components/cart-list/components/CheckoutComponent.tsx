// CheckoutComponent contains an IconButton
// OnClick displays modal for checkout
// Modal is rendered in steps
// Step 1 for confirming items in cart
// Step 2 for making payment
// Step2: Payment is rendered as a MVP UI

import React, {useState} from "react";

// legacy Imports
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';


// Icon Imports
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';

// Types
import { TransactionItemProps, StepProps } from "../../../models/types";
import { Stack } from "@mui/material";
interface CheckoutComponentProps {
    cartItemsList: TransactionItemProps[];
}

const steps: StepProps[] = [
    {key: 'confirm-key', value: 'Confirm cart items', step: 0},
    {key: 'payment-key', value: 'Make Payment', step: 1},
];

export const CheckoutComponent: React.FC<CheckoutComponentProps> = ({
    cartItemsList
})=> {

    // States
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<number>(0);

    // State handlers
    const openModal = ()=> setOpen(true);
    const closeModal = ()=> setOpen(false);

    // Event Handlers

    // Renderer
    return(
        <React.Fragment>
            <Button 
                variant="text"
                color={'secondary'}
                fullWidth
                endIcon={<ShoppingCartCheckoutOutlinedIcon/>}
                onClick={openModal}
            >
                Checkout
            </Button>

            <Dialog
                open={open}
                onClose={closeModal}
                PaperProps={{
                    style: {
                        boxShadow: 'none',
                        width: '75vw',
                        padding: 0,
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Checkout"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            `Total: ${cartItemsList.reduce((
                                initial: number,
                                accumulator: TransactionItemProps
                            )=> {
                                return initial + accumulator?.net_price
                            }, 0)}`
                        }
                    </DialogContentText>
                    <Stepper activeStep={step} alternativeLabel sx={{width: '100%'}}>
                        {
                            steps.map((step_item: StepProps)=> {
                                return(
                                    <Step key={step_item?.key}>
                                        <StepLabel>{step_item?.value}</StepLabel>
                                    </Step>
                                )
                            })
                        }
                    </Stepper>
                    <Box
                        sx={{
                            width: '100%',
                            height: '50vh',
                            overflow: 'scroll', 
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {display: 'none'},
                        }}
                    >
                        {
                            step === 0?
                                <List sx={{ width: '100%',mt: '8px'}}>
                                    {
                                        cartItemsList.map((element: TransactionItemProps)=> {
                                            return(
                                                <ListItem
                                                    divider
                                                    key={`checkout-item-${element?.item?.id}`}
                                                >
                                                     <ListItemAvatar>
                                                        <Avatar 
                                                            src={element?.item?.imageURL}
                                                            sx={{ width: 24, height: 24 }}
                                                        /> 
                                                    </ListItemAvatar>
                                                    <ListItemText 
                                                        primary={element?.item?.name} 
                                                        secondary={element?.item?.type} 
                                                    />
                                                    <ListItemText 
                                                        primary={element?.quantity} 
                                                    />
                                                    <ListItemText 
                                                        primary={element?.unit_price} 
                                                    />
                                                    <ListItemText 
                                                        primary={element?.net_price} 
                                                    />
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                                :
                                <Stack spacing = {'12px'} sx={{mt:'16px'}}>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Card Number" 
                                        variant="outlined" 
                                    />
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Name on Card" 
                                        variant="outlined" 
                                    />
                                    <TextField 
                                        id="outlined-basic" 
                                        label="CVV" 
                                        variant="outlined" 
                                    />
                                </Stack>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={()=> {
                            if(step === 0) {
                                closeModal()
                            }
                            if(step === 1) {
                                setStep(0)
                            }
                        }}
                    >
                        {step === 0? 'Cancel': 'Back'}
                    </Button>
                    <Button 
                        onClick={()=> {
                            if(step === 0) {
                                setStep(1)
                            }
                            if(step === 1) {
                                closeModal()
                            }
                        }}
                    >
                        {step === 0? 'Next': 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}