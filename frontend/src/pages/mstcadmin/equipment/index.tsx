import AdminMaster from '@/layouts/AdminMaster'
import { EquipmentType } from '@/types/EquipmentType'
import React, { useEffect, useState, useMemo, FormEvent } from 'react'
import service from '../../../../service'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender, SortingState, Cell, Row } from "@tanstack/react-table";
import { Button, Card, HR, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table, TextInput } from 'flowbite-react';
import { HiCheckCircle, HiDocumentAdd, HiOutlineArrowLeft, HiOutlineArrowRight, HiUserAdd, HiXCircle } from 'react-icons/hi'
import Link from 'next/link';

export default function Index() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [equipment, setEquipment] = useState<EquipmentType[]>([])
    const [insertModal, setInsertModal] = useState(false)
    const [inserting, setInserting] = useState(false)

    const fetchEquipments = () => {
        service.get('/mstc-admin/equipment-types').then((response) => {
            setEquipment(response.data.equipmentTypes)
        })
    }

    const createEquipment = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setInserting(true)
        const formData = new FormData(e.target as HTMLFormElement)
        service.post("/mstc-admin/equipment-types", {
            name: formData.get('name'),
            code: formData.get('code'),
            isActive: (e.target as HTMLFormElement).querySelector<HTMLInputElement>('input[name="isActive"]')?.checked
        }).then(response => {
            fetchEquipments()
        }).finally(() => {
            setInsertModal(false)
            setInserting(false)
        })
    }

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        fetchEquipments()
    }, [])

    // Define columns for the table
    const columns = useMemo(
        () => [
            {
                header: 'ID',
                accessorKey: 'id', // Accessor for the ID field
            },
            {
                header: 'Code',
                accessorKey: 'code', // Accessor for the Category field
                cell: ({ cell, row }: { cell: any, row: any }) => {
                    return <Link href={'/mstcadmin/equipment/' + row.original.id} className='font-geist-mono font-bold text-lg underline cursor-pointer'>{row.original.code}</Link>
                }
            },
            {
                header: 'Name',
                accessorKey: 'name', // Accessor for the Name field
            },
            {
                header: 'Active',
                accessorKey: 'isActive', // Accessor for the Category field
                cell: ({ cell, row }: { cell: any, row: any }) => {
                    if (row.original.isActive) return <HiCheckCircle size={20} color='green' />
                    else return <HiXCircle size={20} color='red' />
                }
            },
        ],
        []
    )
    const filteredData = useMemo(() =>
        equipment.filter((row) =>
            row.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            row.code.toLowerCase().includes(debouncedSearch.toLowerCase())
        ),
        [debouncedSearch, equipment]
    );
    // Use TanStack Table hooks
    const table = useReactTable({
        data: search ? filteredData : equipment,
        columns,
        state: { sorting, pagination },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        autoResetPageIndex: false, // Prevents resetting page index on filter/sort
    });

    return (<AdminMaster title='Equipment Master'>
        <Card className="shadow-none">
            <div className="flex flex-row gap-4">
                <TextInput placeholder="Search by name..." className="mb-4 w-full md:w-1/4" value={search} onChange={(e) => setSearch(e.target.value)} />
                <span className="text-sm">{filteredData.length} records &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <div className="grow"></div>
                <Button className="h-fit w-fit" color="primary" onClick={() => setInsertModal(true)}><HiDocumentAdd className="mr-2 h-5 w-5" /> Add Equipment</Button>
            </div>

            <div className="overflow-x-auto">
                <Table hoverable className="relative w-full table-fixed text-black dark:text-white">
                    <Table.Head className="bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header) => (
                                <Table.HeadCell
                                    key={header.id}
                                    className="w-fit py-3 text-left font-semibold cursor-pointer border-b border-gray-300"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === "asc" ? " ↑" : header.column.getIsSorted() === "desc" ? " ↓" : ""}
                                </Table.HeadCell>
                            ))
                        )}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <Table.Row key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Table.Cell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan={7} className="text-center py-4 text-gray-500">
                                    No results found
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <Button outline pill onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <HiOutlineArrowLeft className="h-6 w-6" />
                </Button>
                <span className="text-slate-600 dark:text-slate-500">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <Button outline pill onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    <HiOutlineArrowRight className="h-6 w-6" />
                </Button>
            </div>
        </Card>
        <Modal show={insertModal} size="md" popup onClose={() => setInsertModal(false)}>
            <form onSubmit={createEquipment}>
                <ModalHeader>
                    <h3 className='p-2 font-bold'>Add Equipment Type</h3>
                </ModalHeader>
                <hr />
                <ModalBody className='mt-4'>
                    <div>
                        <Label className='mb-2' htmlFor='name'>Name</Label>
                        <TextInput name='name' placeholder='Equipment Type Name' />
                    </div>
                    <br />
                    <div>
                        <Label htmlFor='code'>Code</Label>
                        <TextInput name='code' placeholder='Equipment Type Code' />
                    </div>
                    <br />
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" name='isActive' className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                    </label>
                </ModalBody>
                <ModalFooter>
                    <Button className='w-full' color='primary' type='submit'>Save</Button>
                </ModalFooter>
            </form>
        </Modal>
    </AdminMaster>
    )
}
