import { TicketTypes, TicketStatuses,conversations} from "@prisma/client";
export class Ticket {
    id:number;             
    subject:string;
    type:TicketTypes;
    status:TicketStatuses;
    description?:string|null;
    requesterId:number;
    conversations:conversations[];
    createdAt:Date;      
    updatedAt:Date; 
}
