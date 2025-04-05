import { User } from '@/types/User'
import AdminMaster from '@/layouts/AdminMaster'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import service from '../../../../service'
import _ from 'lodash'
import { Alert, Badge, Button, Card, Popover, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, Toast, ToastToggle } from 'flowbite-react'
import AdminUserRole from '@/components/Admin/AdminUserRole'
import { HiPencil } from 'react-icons/hi'

export default function UserDetails() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [updatedUser, setUpdatedUser] = useState<User | null>(null)
    const [permissions, setPermissions] = useState<string[] | null>([])
    const [open, setOpen] = useState(false);
    const [mobOpen, setMobOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [msg, setMsg] = useState('')

    const fetchUser = () => {
        setLoading(true)
        service.get("/mstc-admin/mstc-users/" + router.query.id).then(response => {
            setUser(response.data.user)
            setUpdatedUser(response.data.user)
        }).finally(() => {
            setLoading(false)
        })
    }

    const fetchPermissions = () => {
        service.get("/mstc-admin/permissions-list").then(response => {
            setPermissions(response.data.permissions)
        })
    }

    const updateUser = () => {
        console.log(updatedUser);
        service.put("/mstc-admin/update-user/" + user?.id, {
            name: updatedUser?.name,
            email: updatedUser?.email,
            phone: updatedUser?.phone,
            permissions: updatedUser?.permissions,
            roBo: updatedUser?.roBo
        }).then(response => {
            setMsg(response.data.message)
            setTimeout(() => {
                setMsg('')
            }, 3000);
            fetchUser()
            setMobOpen(false)
            setEmailOpen(false)
        })
    }

    const deleteUser = () => {
        service.delete("/mstc-admin/delete-user/" + user?.id).then(response => {
            router.push("/mstcadmin/users")
        })
    }

    useEffect(() => {
        fetchPermissions()
        fetchUser()
    }, [])


    return (
        <AdminMaster title={loading ? 'Loading...' : user?.name}>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='col-span-1'>
                    <Card className='shadow-none'>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='font-bold'>User ID</TableCell>
                                    <TableCell>{user?.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-bold'>Registration No.</TableCell>
                                    <TableCell>{user?.registrationNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-bold'>Username</TableCell>
                                    <TableCell>{user?.username}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-bold'>Email</TableCell>
                                    <TableCell className='flex gap-3'>
                                        <Popover open={emailOpen}
                                            onOpenChange={setEmailOpen}
                                            content={
                                                <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                                        <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">
                                                            Update Email
                                                        </h3>
                                                    </div>
                                                    <div className="flex gap-2 p-3">
                                                        <TextInput type="text" value={updatedUser?.email} onChange={e => updatedUser && setUpdatedUser({ ...updatedUser, email: e.target.value } as User)} />
                                                        <Button onClick={updateUser}>Update</Button>
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <span className='underline border-dashed cursor-pointer'>{user?.email}</span>
                                        </Popover>

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-bold'>Phone</TableCell>
                                    <TableCell className='flex gap-3'>
                                        <Popover open={mobOpen}
                                            onOpenChange={setMobOpen}
                                            content={
                                                <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                                        <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">
                                                            Update Phone
                                                        </h3>
                                                    </div>
                                                    <div className="flex gap-2 p-3">
                                                        <TextInput type="text" value={updatedUser?.phone} onChange={e => updatedUser && setUpdatedUser({ ...updatedUser, phone: e.target.value } as User)} />
                                                        <Button onClick={updateUser}>Update</Button>
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <span className='underline border-dashed cursor-pointer'>{user?.phone}</span>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-bold'>Role</TableCell>
                                    <TableCell><AdminUserRole role={user?.role} /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-bold'>RO/BO</TableCell>
                                    <TableCell>{user?.roBo}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </div>
                <div className='col-span-1'>
                    <div className="max-h-full rounded-lg border border-gray-100 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Permissions</h2>

                        <div className="mt-2 divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-800">
                            {/* {permissions?.map((perm, id) => <dl key={id} className="flex items-center justify-between gap-4 py-2">
                                <dt className="text-sm font-medium text-gray-900 dark:text-white">{perm}</dt>
                                {user?.permissions.includes(perm) && <dd className="text-sm font-normal text-gray-500 dark:text-gray-400"><HiCheck className="text-green-500 w-6 h-6" title="Active" /></dd>}
                            </dl>)} */}
                            <ul className="w-full text-sm font-medium text-gray-900 rounded-lg dark:text-white">
                                {permissions?.map((perm, id) => (
                                    <li key={id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input
                                                id={perm}
                                                type="checkbox"
                                                value={perm}
                                                checked={updatedUser?.permissions.includes(perm)}
                                                onChange={(e) => {
                                                    if (updatedUser) {
                                                        const updatedPermissions = e.target.checked ? [...updatedUser.permissions, perm] : updatedUser.permissions.filter(p => p !== perm);
                                                        setUpdatedUser({ ...updatedUser, permissions: updatedPermissions });
                                                    }
                                                }}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor={perm}
                                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {perm}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <Popover placement='right' open={open}
                    onOpenChange={setOpen}
                    aria-labelledby="default-popover"
                    content={
                        <div className="w-fit text-sm text-gray-500 dark:text-gray-400">
                            <div className="border-b border-gray-200 bg-red-600 px-3 py-2 dark:border-gray-600">
                                <h3 id="default-popover" className="font-semibold text-white">
                                    Confirm delete User?
                                </h3>
                            </div>
                            <div className="flex gap-2 p-5">
                                <Button size='sm' color='failure' onClick={deleteUser}>Yes</Button>
                                <Button onClick={() => setOpen(false)} color='gray'>Cancel</Button>
                            </div>
                        </div>
                    }
                >
                    <Button color='failure'>Delete User</Button>
                </Popover>
                <Button onClick={updateUser} color='primary' className='w-auto' disabled={_.isEqualWith(user, updatedUser, (objValue, othValue) => {
                    if (_.isArray(objValue) && _.isArray(othValue)) {
                        return _.isEqual(_.sortBy(objValue), _.sortBy(othValue));
                    }
                })}>Save</Button>
            </div>

            <br />
            {msg && <Alert color="success" className='w-fit' onDismiss={() => { }}>
                {msg}
            </Alert>}
        </AdminMaster>
    )
}
