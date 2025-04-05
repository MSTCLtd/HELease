import { useState, useMemo, useEffect } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender, SortingState, Cell, Row } from "@tanstack/react-table";
import { Table, Button, TextInput, Card, TableHead, TableRow, TableHeadCell, TableBody, TableCell, Popover, ListGroup, ListGroupItem } from "flowbite-react";
import service from "../../../service";
import { HiCheckCircle, HiOutlineArrowLeft, HiOutlineArrowRight, HiUserAdd, HiXCircle } from "react-icons/hi";
import Link from "next/link";
import AdminUserRole from "./AdminUserRole";
import { DataTable } from 'simple-datatables'
import { User } from "@/types/User";

export default function UsersTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        getUsers()
        // if (document.getElementById("default-table") && typeof DataTable !== 'undefined') {
        // }
    }, [])

    // useEffect(() => {
    //     if (users.length > 0) {
    //         new DataTable("#default-table", {
    //             searchable: true,
    //             sortable: true,
    //             perPage: 10,
    //             perPageSelect: [5, 10, 15, 20],
    //             classes: {
    //                 search: 'bg-primary rounded',
    //                 pagination: 'pagination-class',
    //                 sorter: 'sort-class'
    //             },
    //             columns: [
    //                 { select: 0, type: 'number', sortable: true },
    //                 { select: 1, type: 'string', sortable: true },
    //                 { select: 2, type: 'string', sortable: true },
    //                 { select: 3, type: 'string', sortable: true },
    //                 { select: 4, type: 'string', sortable: true },
    //                 { select: 5, type: 'string', sortable: true }
    //             ]
    //         });
    //     }
    // }, [users]);


    const getUsers = () => {
        service.get("/mstc-admin/mstc-users").then(response => {
            setUsers(response.data.mstcUsers)
        }).finally(() => {

        })
    }

    // Define columns
    const columns = useMemo(
        () => [
            { accessorKey: "id", header: "#" },
            {
                accessorKey: "username", header: "Username", cell: ({ cell, row }: { cell: any, row: any }) => {
                    return <Link href={'/mstcadmin/users/' + row.original.id} className="font-bold underline flex gap-1">{row.original.username} {row.original.isVerified ? (
                        <HiCheckCircle className="text-green-500 w-4 h-4 mt-0.5" title="Active" />
                    ) : (
                        <HiXCircle className="text-red-500 w-4 h-4" title="Inactive" />
                    )}</Link>
                }
            },
            {
                accessorKey: "role", header: "Role", cell: ({ cell, row }: { cell: any, row: any }) => {
                    return <AdminUserRole role={row.original.role} />
                }
            },
            { accessorKey: "name", header: "Name" },
            { accessorKey: "roBo", header: "RO/BO" },
            { accessorKey: "phone", header: "Phone" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "registrationNumber", header: "Reg. No." },
            {
                accessorKey: "permissions",
                header: "Permissions",
                cell: ({ getValue }: { getValue: any }) => {
                    const permissions: string[] = getValue();
                    return <Popover content={<div className="w-64 text-sm text-gray-500 dark:text-gray-400 z-100">
                        <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                            <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">
                                Permissions
                            </h3>
                        </div>
                        {/* <div className="px-3 py-2"> */}
                        <ListGroup>
                            {permissions.map(p => <ListGroupItem>{p}</ListGroupItem>)}
                        </ListGroup>
                        {/* </div> */}
                    </div >} trigger="hover" >
                        <span>{permissions.length} permissions</span>
                    </Popover >
                },
            },
        ],
        []
    );

    const filteredData = useMemo(() => users.filter((row) => row.name.toLowerCase().includes(debouncedSearch.toLowerCase())), [debouncedSearch]);

    // Initialize table with sorting & pagination
    const table = useReactTable({
        data: search ? filteredData : users,
        columns,
        state: { sorting, pagination },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        autoResetPageIndex: false, // Prevents resetting page index on filter/sort
    });

    return (
        <Card className="shadow-none">
            <div className="flex flex-row gap-4">
                <TextInput placeholder="Search by name..." className="mb-4 w-full md:w-1/4" value={search} onChange={(e) => setSearch(e.target.value)} />
                <span className="text-sm">{filteredData.length} records &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <div className="grow"></div>
                <Button className="h-fit w-fit" color="primary" href="/mstcadmin/users/add" as={Link}><HiUserAdd className="mr-2 h-5 w-5" /> Add User</Button>
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
            {/* <Table id="default-table">
                <TableHead>
                    <TableRow>
                        <TableHeadCell data-type="number">
                            <span className="flex items-center">
                                #
                                <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                </svg>
                            </span>
                        </TableHeadCell>
                        <TableHeadCell>
                            <span className="flex items-center">
                                Username
                                <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                </svg>
                            </span>
                        </TableHeadCell>
                        <TableHeadCell>
                            <span className="flex items-center">
                                Role
                                <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                </svg>
                            </span>
                        </TableHeadCell>
                        <TableHeadCell>
                            <span className="flex items-center">
                                RO/BO
                                <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                </svg>
                            </span>
                        </TableHeadCell>
                        <TableHeadCell>
                            <span className="flex items-center">
                                Phone
                                <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                </svg>
                            </span>
                        </TableHeadCell>
                        <TableHeadCell>
                            <span className="flex items-center">
                                Email
                                <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                </svg>
                            </span>
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user, id) => <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.roBo}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.email}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table> */}
            {/* <Table id="default-table" striped>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>#</TableHeadCell>
                        <TableHeadCell>Username</TableHeadCell>
                        <TableHeadCell>Role</TableHeadCell>
                        <TableHeadCell>RO/BO</TableHeadCell>
                        <TableHeadCell>Phone</TableHeadCell>
                        <TableHeadCell>Email</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.roBo}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}
        </Card>
    );
}
