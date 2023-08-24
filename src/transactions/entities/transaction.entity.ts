import { PaymentGatewayProvider,users,transactionMetas,templates,licenses} from "@prisma/client";

export class Transaction {
  id:number
  method:PaymentGatewayProvider
  paidStatus:Boolean                
  amount:number
  users:users                  
  userId:number
  transactionMetas:transactionMetas[]
  templates:templates[]
  licenses:licenses[]
  createdAt:Date;      
  updatedAt:Date;
}
