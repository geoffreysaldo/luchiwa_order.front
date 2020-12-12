import { Mode } from "./mode.model";
import { ProductBagInterface } from "./product.interface";
import { Client } from "./client.interface";

export interface Order {
    _id? : string;
    mode: Mode;
    hour: string;
    client?: Client;
    products: ProductBagInterface[]
    cutlery: number;
    table?: number;
    total: number;
    totalHT: number;
}
