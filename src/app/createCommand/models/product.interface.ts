export interface ProductInterface{
    _id: string,
    name: string,
    category: string,
    price: number
    tva: number,
}

export interface ProductBagInterface{
    product:ProductInterface,
    quantity: number
}
