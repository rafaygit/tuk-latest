import { templateIntegrations, users} from "@prisma/client";

export class Template {
  id:number;                  
  name:string;
  description?:string|null;
  image?:string|null;
  integrations:templateIntegrations[];
  users:users[];
  createdAt:Date;              
  updatedAt:Date;        
}
