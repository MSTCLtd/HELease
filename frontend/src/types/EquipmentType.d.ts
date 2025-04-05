import { EquipmentCategory } from "./EquipmentCategory";

export interface EquipmentType {
    id?: number;
    systemId?: string;
    name: string;
    code: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    categories?: EquipmentCategory[];
};