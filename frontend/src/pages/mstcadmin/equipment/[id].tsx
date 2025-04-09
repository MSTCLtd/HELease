import AdminMaster from '@/layouts/AdminMaster'
import React, { ChangeEvent, useEffect, useState } from 'react'
import service from '../../../../service'
import { useRouter } from 'next/router'
import { EquipmentType } from '@/types/EquipmentType'
import { Alert, Button, Card, Popover, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'
import _ from 'lodash'
import { HiDocumentRemove, HiXCircle } from 'react-icons/hi'
import { EquipmentCategory } from '@/types/EquipmentCategory'

export default function EquipmentID() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [equipment, setEquipment] = useState<EquipmentType | null>(null)
    const [updatedEquipment, setUpdatedEquipment] = useState<EquipmentType | null>(null)
    const [msg, setMsg] = useState('')
    const [showAddRow, setShowAddRow] = useState(false)
    const [newCat, setNewCat] = useState<EquipmentCategory | null>({ equipmentTypeId: parseInt(router.query.id as string) || 0, level1: '' })
    const [adding, setAdding] = useState(false)
    const [exporting, setExporting] = useState(false)
    const [importing, setImporting] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const loadEquipmentCat = () => {
        setLoading(true)
        service.get('/mstc-admin/equipment-types/' + router.query.id).then(response => {
            setEquipment(response.data.equipmentType)
            setUpdatedEquipment(response.data.equipmentType)
        }).finally(() => {
            setLoading(false)
        })
    }

    const updateEquipment = () => {
        setSaving(true)
        service.put("/mstc-admin/equipment-types/" + router.query.id, updatedEquipment).then(response => {
            setMsg(response.data.message)
            setTimeout(() => {
                setMsg('')
            }, 3000);
            loadEquipmentCat()
        }).finally(() => {
            setSaving(false)
        })
    }

    const addNewCat = () => {
        setAdding(true)
        service.post("/mstc-admin/equipment-types/" + router.query.id + "/categories", {
            level1: newCat?.level1,
            level2: newCat?.level2,
            level3: newCat?.level3,
            level4: newCat?.level4,
            level5: newCat?.level5
        }).then((response) => {
            setMsg(response.data.message)
            setShowAddRow(false)
            setTimeout(() => {
                setMsg('')
            }, 3000);
            loadEquipmentCat()
        }).finally(() => {
            setAdding(false)
        })
    }


    const deleteCategory = (id: number) => {
        service.delete("/mstc-admin/equipment-types/categories/" + id).then(response => {
            setMsg(response.data.message)
            loadEquipmentCat()
            setTimeout(() => {
                setMsg('')
            }, 3000);
        })
    }

    const exportCategories = () => {
        setExporting(true)
        service.get("/mstc-admin/equipment-types/" + router.query.id + "/export-categories", { responseType: 'blob' }).then(response => {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'categories.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        }).finally(() => {
            setExporting(false)
        })
    }

    const importCategories = () => {
        setImporting(true)
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx';
        input.onchange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                if (target.files[0]) {
                    const formData = new FormData()
                    formData.append('file', target.files[0]);
                    service.post("/mstc-admin/equipment-types/" + router.query.id + "/import-categories", formData).then(response => {
                        loadEquipmentCat()
                    }).catch(err => {
                        loadEquipmentCat()
                        console.log(err.response);
                    }).finally(() => {
                        setImporting(false)
                    })
                } else {
                    console.error("No file selected");
                    setImporting(false)
                }

            }
        };
        input.click();


    }

    useEffect(() => {
        loadEquipmentCat()
    }, [])


    return (
        <AdminMaster title={loading ? 'Loading...' : equipment?.code + ' - ' + equipment?.name}>
            <Card className='p-0 shadow-none'>
                <Table className='w-1/3'>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell><TextInput value={updatedEquipment?.name} onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedEquipment({ ...updatedEquipment, name: e.target.value } as EquipmentType)} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell><TextInput value={updatedEquipment?.code} onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedEquipment({ ...updatedEquipment, code: e.target.value } as EquipmentType)} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Active</TableCell>
                            <TableCell>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" name='isActive' className="sr-only peer" checked={updatedEquipment?.isActive} onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedEquipment({
                                        ...updatedEquipment,
                                        isActive: e.target.checked
                                    } as EquipmentType)} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                                </label>
                                {/* <input
                                    type="checkbox"
                                    checked={updatedEquipment?.isActive}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedEquipment({
                                        ...updatedEquipment,
                                        isActive: e.target.checked
                                    } as EquipmentType)}
                                /> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <div className='flex gap-2'>
                    <h3 className='dark:text-slate-400 font-bold text-lg grow'>Search filters (Categories)</h3>
                    <Button className='w-fit' color='primary' onClick={exportCategories} isProcessing={exporting}>Export Categories</Button>
                    <Button className='w-fit' color='secondary' onClick={importCategories} isProcessing={importing}>Import Categories</Button>
                </div>
                <Table striped>
                    <TableHead>
                        <TableHeadCell>Level 1</TableHeadCell>
                        <TableHeadCell>Level 2</TableHeadCell>
                        <TableHeadCell>Level 3</TableHeadCell>
                        <TableHeadCell>Level 4</TableHeadCell>
                        <TableHeadCell>Level 5</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {equipment?.categories?.map(cat => <TableRow key={cat.id}>
                            <TableCell>{cat.level1}</TableCell>
                            <TableCell>{cat.level2}</TableCell>
                            <TableCell>{cat.level3}</TableCell>
                            <TableCell>{cat.level4}</TableCell>
                            <TableCell>{cat.level5}</TableCell>
                            <TableCell>{(equipment?.categories?.length ?? 0) > 1 && <Popover placement='left'
                                aria-labelledby="default-popover"
                                content={
                                    <div className="w-fit text-sm text-gray-500 dark:text-gray-400">
                                        <div className="border-b border-gray-200 bg-red-600 px-3 py-2 dark:border-gray-600">
                                            <h3 id="default-popover" className="font-semibold text-white">
                                                Confirm delete Category?
                                            </h3>
                                        </div>
                                        <div className="flex gap-2 p-5">
                                            <Button size='sm' color='failure' className='w-full' onClick={() => deleteCategory(cat.id as number)}>Yes</Button>
                                        </div>
                                    </div>
                                }
                            >
                                <Button color='failure' className='m-0 p-0'><HiXCircle size={16} className='m-0 p-0' /></Button>
                            </Popover>}</TableCell>
                        </TableRow>)}
                        {showAddRow &&
                            <TableRow>
                                <TableCell><TextInput name='level1' placeholder='Level 1' onChange={e => setNewCat(newCat ? { ...newCat, level1: e.target.value } : null)} /></TableCell>
                                <TableCell><TextInput name='level2' placeholder='Level 2' onChange={e => setNewCat(newCat ? { ...newCat, level2: e.target.value } : null)} /></TableCell>
                                <TableCell><TextInput name='level3' placeholder='Level 3' onChange={e => setNewCat(newCat ? { ...newCat, level3: e.target.value } : null)} /></TableCell>
                                <TableCell><TextInput name='level4' placeholder='Level 4' onChange={e => setNewCat(newCat ? { ...newCat, level4: e.target.value } : null)} /></TableCell>
                                <TableCell><TextInput name='level5' placeholder='Level 5' onChange={e => setNewCat(newCat ? { ...newCat, level5: e.target.value } : null)} /></TableCell>
                                <TableCell><Button color='success' onClick={addNewCat} isProcessing={adding}>Save</Button></TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>
                <Button color='secondary' className='w-fit self-center' onClick={() => setShowAddRow(!showAddRow)}>{showAddRow ? 'Cancel' : 'Add Row'}</Button>
            </Card>
            <br />
            <Button color='primary' onClick={updateEquipment} isProcessing={saving} className='w-fit' disabled={_.isEqualWith(equipment, updatedEquipment, (objValue, othValue) => {
                if (_.isArray(objValue) && _.isArray(othValue)) {
                    return _.isEqual(_.sortBy(objValue), _.sortBy(othValue));
                }
            })}>Save</Button>
            <br />
            {
                msg && <Alert color="success" className='w-fit' onDismiss={() => { }}>
                    {msg}
                </Alert>
            }
        </AdminMaster >
    )
}
