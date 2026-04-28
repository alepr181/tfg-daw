import { ResourceRef } from "@angular/core";
import { environment } from "../../../environments/environment";
import { CategoryInterface } from "../../interfaces/category.interface";

export abstract class CategoryServiceAbstract {
readonly API_ENDPOINT = `${environment.apiUrl}/categories`;

    abstract load(): ResourceRef<CategoryInterface[]>;

}


