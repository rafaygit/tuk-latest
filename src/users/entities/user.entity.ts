import { UserRoles, licenses,templates,userMetas,tickets,conversations} from "@prisma/client";

export class User {
    id:number;             
    email:string;         
    firstName?:string|null;
    lastName?:string|null;
    password:string;
    role:UserRoles;       
    licenses?:licenses[];
    templates?:templates[];
    userMetas?:userMetas[];
    tickets?:tickets[];
    createdAt:Date;      
    updatedAt:Date;
    conversations?:conversations[];
}
