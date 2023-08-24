import {componentIntegrations, IntegrationTypes,components} from "@prisma/client";

export class ComponentIntegration {
    id:number;
    type:IntegrationTypes;
    markup:string;
    codeJS?:string | null;
    componentId:number;
    createdAt: Date;
    updatedAt: Date;
}
