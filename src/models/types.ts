export interface ResponeDataProps {
    id: number;
    imageURL: string;
    name: string;
    type: string;
    price: number
    currency: string
    color: string;
    gender: string;
    quantity: number;
}

export interface ItemcardProps extends ResponeDataProps {
    addedToWishList: boolean;
    addedToCart: boolean;
    addToWishList: (item: ResponeDataProps)=> void;
    addToCart: (item: ResponeDataProps)=> void;
}

export interface TransactionItemProps {
    item: ResponeDataProps;
    quantity: number;
    unit_price: number;
    net_price: number;
}

export interface CartManageComponent {
    data: TransactionItemProps[];
    getCurrentStock: (item_id: number)=> number; 
    onIncrease: (id: number)=> void;
    onDecrease: (id: number)=> void;
}

export interface ListOptionProps {
    key: string;
    value: string;
    label: string;
}

export interface StepProps {
    key: string;
    value: string;
    step: number;
}