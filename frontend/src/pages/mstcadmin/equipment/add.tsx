import AdminMaster from '@/layouts/AdminMaster'
import { Card, Label, TextInput } from 'flowbite-react'
import React from 'react'

export default function add() {
    return (
        <AdminMaster title='Add Equipment'>
            <Card className='shadow-none'>
                <form className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                        <Label htmlFor='name'>Name</Label>
                        <TextInput name='name' placeholder='Equipment Type Name' />
                    </div>
                    <div>
                        <Label htmlFor='code'>Code</Label>
                        <TextInput name='code' placeholder='Equipment Type Code' />
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" name='isActive' className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                    </label>
                </form>
            </Card>
        </AdminMaster>
    )
}
