import { licenses, categories} from "@prisma/client";

export class UiKit {
    id:number;          
  name:string;
  description?:string|null
  licenses:licenses[];
  categories:categories[];
  createdAt:Date;      
  updatedAt:Date;
}
