import { categories, components} from "@prisma/client";

export class Category {
  id: number;
  name: string;
  image?:string|null
  uiKitId: number;
  parentId?: number | null;
  subCategories?: categories[];
  components?: components[];
  createdAt: Date;
  updatedAt: Date;
}