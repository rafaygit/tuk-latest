import { IntegrationTypes} from "@prisma/client";
export class TemplateIntegration {
  id:number;             
  type:IntegrationTypes;
  markup:string;
  codeJS?:string|null;
  templateId:number;
  createdAt:Date;
  updatedAt:Date;
}
