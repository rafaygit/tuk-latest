import { users, uiKits} from "@prisma/client";
export class License {
  id:number;     
  name:string;
  price:number;
  description?:string|null;
  users:users[];
  uiKits:uiKits[];
  createdAt:Date;
  updatedAt:Date;
}
