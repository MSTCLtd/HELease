export interface EquipmentCategory {
    id: number;
    equipmentTypeId: number;
    level1: string;
    level2: string | null;
    level3: string | null;
    level4: string | null;
    level5: string | null;
    createdAt: string;
    updatedAt: string;
};