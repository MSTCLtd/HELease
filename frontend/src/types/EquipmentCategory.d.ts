export interface EquipmentCategory {
    id?: number | null;
    equipmentTypeId: number;
    level1: string;
    level2?: string | null;
    level3?: string | null;
    level4?: string | null;
    level5?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
};