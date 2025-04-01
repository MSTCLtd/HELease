import AdminMaster from '@/layouts/AdminMaster'
import React, { ChangeEvent, useEffect, useState } from 'react'
import service from '../../../../service'
import { useRouter } from 'next/router'
import { EquipmentType } from '@/types/EquipmentType'
import { Alert, Button, Card, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'
import _ from 'lodash'

export default function EquipmentID() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [equipment, setEquipment] = useState<EquipmentType | null>(null)
    const [updatedEquipment, setUpdatedEquipment] = useState<EquipmentType | null>(null)
    const [msg, setMsg] = useState('')

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

    useEffect(() => {
        loadEquipmentCat()
    }, [])


    return (
        <AdminMaster title={loading ? 'Loading...' : equipment?.name}>
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
                                <input
                                    type="checkbox"
                                    checked={updatedEquipment?.isActive}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedEquipment({
                                        ...updatedEquipment,
                                        isActive: e.target.checked
                                    } as EquipmentType)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <h3 className='dark:text-slate-400 font-bold text-lg'>Search filters</h3>
                <Table striped>
                    <TableHead>
                        <TableHeadCell>Level 1</TableHeadCell>
                        <TableHeadCell>Level 2</TableHeadCell>
                        <TableHeadCell>Level 3</TableHeadCell>
                        <TableHeadCell>Level 4</TableHeadCell>
                        <TableHeadCell>Level 5</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {equipment?.categories?.map(cat => <TableRow key={cat.id}>
                            <TableCell>{cat.level1}</TableCell>
                            <TableCell>{cat.level2}</TableCell>
                            <TableCell>{cat.level3}</TableCell>
                            <TableCell>{cat.level4}</TableCell>
                            <TableCell>{cat.level5}</TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </Card>
            <br />
            <Button color='primary' onClick={updateEquipment} isProcessing={saving} className='w-fit' disabled={_.isEqualWith(equipment, updatedEquipment, (objValue, othValue) => {
                if (_.isArray(objValue) && _.isArray(othValue)) {
                    return _.isEqual(_.sortBy(objValue), _.sortBy(othValue));
                }
            })}>Save</Button>
            <br />
            {msg && <Alert color="success" className='w-fit' onDismiss={() => { }}>
                {msg}
            </Alert>}
        </AdminMaster>
    )
}
