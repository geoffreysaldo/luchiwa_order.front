import { Time } from "@angular/common";
import { Client } from "./client.interface";

export interface OrderInformation {
    client?: Client
    table?: number;
    cutlery: number;
    hour: Time;
}