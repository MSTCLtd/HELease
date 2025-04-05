import { Button, Card, Modal, ModalBody, ModalHeader, Select, Table, TableBody, TableCell, TableRow, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import service from '../../../service'
import { User } from '@/types/User'
import { useRouter } from 'next/router'
import { HiCheckCircle, HiXCircle } from 'react-icons/hi'

export default function AdminMSTCUserAdd() {
    const [permissions, setPermissions] = useState<string[] | null>([])
    const [robo, setRobo] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const [user, setUser] = useState<User | null>(null)

    const router = useRouter()

    const fetchROBO = () => {
        service.get("/mstc-admin/robo-list").then(response => {
            setRobo(response.data.roBoList)
        })
    }

    const fetchPermissions = () => {
        service.get("/mstc-admin/permissions-list").then(response => {
            setPermissions(response.data.permissions)
        })
    }

    const createUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        console.log(formData);
        console.log(formData.getAll('perm'));

        service.post("/mstc-admin/register-mstc-user", {
            username: formData.get('username'),
            password: formData.get('password'),
            email: formData.get('email'),
            phone: formData.get('mobile'),
            name: formData.get('name'),
            roBo: formData.get('robo'),
            permissions: formData.getAll('perm')
        }).then(response => {
            setUser(response.data.user)
            setShowModal(true)
        }).catch(err => {
            setErrMsg(err.response.data.message)
        }).finally(() => {
            setLoading(false)
        })

    }

    useEffect(() => {
        fetchROBO()
        fetchPermissions()
    }, [])


    return (
        <form onSubmit={createUser}>
            <Modal show={showModal} size="md" onClose={() => router.push('/mstcadmin/users')} popup>
                <ModalHeader />
                {/* <ModalBody> */}
                <div className="text-center">
                    <HiCheckCircle className="text-green-500 mx-auto mb-4 h-14 w-14 dark:text-gray-200" />
                    <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                        User created successfully
                    </h3>
                    <h3 className="mb-5 p-4 px-8 font-geist-mono font-normal text-green-700 bg-green-200">
                        <table className='w-full text-left'>
                            <tr>
                                <td>Name</td>
                                <td>{user?.name}</td>
                            </tr>
                            <tr>
                                <td>Registration No</td>
                                <td><b>{user?.registrationNumber}</b></td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{user?.phone}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{user?.email}</td>
                            </tr>
                        </table>
                    </h3>
                    <div className="flex justify-center gap-4 mb-6">
                        <Button color="success" onClick={() => router.push('/mstcadmin/users')}>
                            OK
                        </Button>
                    </div>
                </div>
                {/* </ModalBody> */}
            </Modal>
            <Modal show={errMsg != null} size="md" onClose={() => setErrMsg(null)} popup>
                <ModalHeader />
                {/* <ModalBody> */}
                <div className="text-center">
                    <HiXCircle className="text-red-600 mx-auto mb-4 h-14 w-14" />
                    <p className='mb-2 text-xl'>An error occured</p>
                    <h3 className="mb-5 p-4 font-geist-mono font-normal text-gray-700 bg-gray-200 dark:text-gray-600">
                        {errMsg}
                    </h3>
                    <div className="flex justify-center gap-4 mb-6">
                        <Button onClick={() => setErrMsg(null)}>
                            OK
                        </Button>
                    </div>
                </div>
                {/* </ModalBody> */}
            </Modal>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Card className='shadow-none'>
                    <Table >
                        <TableBody>
                            <TableRow>
                                <TableCell>Select RO/BO</TableCell>
                                <TableCell>
                                    <Select required name='robo'>
                                        {robo.map(rb => <option value={rb} key={rb}>{rb}</option>)}
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name of the User</TableCell>
                                <TableCell><TextInput required name='name' /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell><TextInput required name='username' /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Password</TableCell>
                                <TableCell><TextInput required name='password' type='password' /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell><TextInput required name='email' type='email' /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Mobile</TableCell>
                                <TableCell><TextInput required name='mobile' /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
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
                                            name='perm'
                                            type="checkbox"
                                            value={perm}
                                            // onChange={(e) => {
                                            //     if (updatedUser) {
                                            //         const updatedPermissions = e.target.checked ? [...updatedUser.permissions, perm] : updatedUser.permissions.filter(p => p !== perm);
                                            //         setUpdatedUser({ ...updatedUser, permissions: updatedPermissions });
                                            //     }
                                            // }}
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
            <br />
            <Button color='primary' type='submit' className='w-fit' isProcessing={loading}>Save</Button>
        </form>
    )
}
