import SellerMaster from '@/layouts/SellerMaster'
import React, { useEffect, useState } from 'react'
import service from '../../../../service'
import { EquipmentType } from '@/types/EquipmentType'
import { Label, TextInput } from 'flowbite-react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Blockquote from '@tiptap/extension-blockquote'
import { SimpleEditor } from '@/components/SimpleEditor'

export default function add() {
    const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([])
    const [selectedEquipmentType, setSelectedEquipmentType] = useState<number | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([])
    const [desc, setDesc] = useState('')

    const editor = useEditor({
        extensions: [
            StarterKit,
            Blockquote
        ],
        content: '',
    })

    const getEquipmentTypes = () => {
        service.get("/mstc-admin/equipment-types").then(response => {
            setEquipmentTypes(response.data.equipmentTypes)
        })
    }

    const handleEquipmentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value);
        setSelectedEquipmentType(selectedId);

        const selectedEquipment = equipmentTypes.find(equipment => equipment.id === selectedId);
        setCategories(selectedEquipment?.categories ?? []);
    };

    useEffect(() => {
        getEquipmentTypes()
    }, [])


    return (
        <SellerMaster title='Add Product'>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="equipmentType" className="block text-sm font-medium">
                        Equipment Type
                    </Label>
                    <select
                        id="equipmentType"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        onChange={handleEquipmentTypeChange}
                    >
                        <option value="">Select Equipment Type</option>
                        {equipmentTypes.map(equipment => (
                            <option key={equipment.id} value={equipment.id}>
                                {equipment.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <Label htmlFor="categories" className="block text-sm font-medium">
                        Categories
                    </Label>
                    <select
                        id="categories"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        disabled={!categories.length}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {[category.level1, category.level2, category.level3, category.level4, category.level5].join(" | ")}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <br />
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor='brand'>Brand Name</Label>
                    <TextInput id='brand' color='primary' placeholder='Brand Name' />
                </div>
                <div>
                    <Label htmlFor='model'>Model</Label>
                    <TextInput id='model' color='primary' placeholder='Model name or number' />
                </div>
                <div>
                    <Label htmlFor='yt'>Youtube Link</Label>
                    <TextInput id='yt' color='primary' placeholder='Youtube Link for product promotional video' />
                </div>
            </div>
            <br />
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <Label>Description</Label>
                    <SimpleEditor />
                </div>
                <div>
                    <Label>Specification</Label>
                    <SimpleEditor />
                </div>
            </div>
            <br />
            <div>
                <Label htmlFor="images">Upload Images</Label>
                <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    onChange={(event) => {
                        const files = event.target.files;
                        if (files) {
                            const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
                            setPreviewImages([...previewImages, ...fileArray]);
                        }
                    }}
                />
                <div className="mt-4 grid grid-cols-5 gap-4">
                    {previewImages.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Preview ${index + 1}`}
                            className="w-auto h-96 object-cover rounded-md shadow-md"
                        />
                    ))}
                </div>
            </div>
        </SellerMaster>
    )
}
