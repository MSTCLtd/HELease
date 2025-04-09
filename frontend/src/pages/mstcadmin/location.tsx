import AdminMaster from '@/layouts/AdminMaster'
import { Button, Card, FileInput, HelperText, Label } from 'flowbite-react'
import React, { ChangeEvent, useState } from 'react'
import { HiDownload } from 'react-icons/hi'
import service from '../../../service'

export default function location() {
    const [downloading, setDownloading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const downloadFile = () => {
        setDownloading(true)
        service.get("/mstc-admin/export-locations", { responseType: 'blob' }).then(response => {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'locations.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        }).catch((err) => {
            console.log(err);

        }).finally(() => {
            setDownloading(false)
        })
    }

    const uploadFile = () => {
        setUploading(true)
        const formData = new FormData()
        if (file) {
            formData.append('file', file);
        } else {
            console.error("No file selected");
        }
        service.post("/mstc-admin/import-locations", formData).then(response => {
        }).catch(err => {
            console.log(err.response);
        }).finally(() => {
            setUploading(false)
        })
    }

    return (
        <AdminMaster title='Location Master'>
            <Card className='py-0 shadow-none'>
                <div className='p-4 grid grid-cols-1 md:grid-cols-3'>
                    <div className='m-auto h-32 align-middle place-content-center'>
                        <Button isProcessing={downloading} onClick={downloadFile} color='secondary' pill>Download Current Location Master <HiDownload className='ml-2 w-5 h-5' /></Button>
                    </div>
                    <div className="border-l border-gray-300 h-full mx-auto"></div>
                    <div>
                        <div>
                            <Label className="mb-2 block text-2xl" htmlFor="file-upload-helper-text">
                                Upload new Master File
                            </Label>
                            <div className='flex gap-1'>
                                <FileInput accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' id="file-upload-helper-text" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)} />
                                <Button className='h-fit w-auto' color='primary' onClick={uploadFile}>Upload</Button>
                            </div>
                            <HelperText className="mt-1">XLSX File only</HelperText>
                        </div>
                    </div>
                </div>
            </Card>
        </AdminMaster>
    )
}
