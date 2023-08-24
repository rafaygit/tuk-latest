import { componentIntegrations, componentMetas} from "@prisma/client";

export class Component {
    id:number;
    name:string;
    description?:string|null
    image?:string|null
    categoryId?:number;
    componentIntegrations:componentIntegrations[];
    componentMetas:componentMetas[];
    createdAt:Date;           
    updatedAt:Date;    
}
