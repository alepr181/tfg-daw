import { ResourceRef, Signal } from "@angular/core";
import { SupplierInterface } from "../../interfaces/supplier.interface";
import { SupplierPayloadCreateInterface, SupplierPayloadUpdateInterface } from "../../interfaces/supplier-payload.interface";
import { environment } from "../../../environments/environment";

export abstract class SupplierServiceAbstract {
readonly API_ENDPOINT = `${environment.apiUrl}/suppliers`;

abstract load(): ResourceRef<SupplierInterface[]>;

abstract add(
    supplierSignal: Signal<SupplierPayloadCreateInterface | undefined>
): ResourceRef<SupplierInterface | undefined>;

abstract update(
    supplierSignal: Signal<SupplierPayloadUpdateInterface | undefined>
): ResourceRef<SupplierInterface | undefined>;

abstract remove(
    supplierSignal: Signal<SupplierInterface | undefined>
): ResourceRef<SupplierInterface | undefined>;
}
