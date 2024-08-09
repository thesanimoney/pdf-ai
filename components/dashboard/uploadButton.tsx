'use client'

import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import Dropzone from "react-dropzone";
import {CloudIcon} from "lucide-react";
import TypographyP from "@/components/ui/typographyP";
import UploadBadge from "@/components/uploadBadge";
import {useState} from "react";
import {Progress} from "@/components/ui/progress";
import {toast} from "sonner";
import {createPDFInDbAndEmbeddings} from "@/actions/pdf";
import {errorToast} from "@/components/ui/sonner";
import {generateSignedURL} from "@/lib/generateSignedUrl";
import axios from "axios";

function UploadDropzone() {
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(10)

    const startSimulatingProgress = () => {
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prevState) => {
                if (progress >= 95) {
                    clearInterval(interval)
                    return prevState
                }
                return prevState + 5
            })
        }, 500)
        return interval
    }

    const uploadFormOnS3 = async (url: string, file: File[]) => {
        try {
            return await axios.put(url, file[0], {headers: {
                "Content-Type": file[0].type
                }})
        } catch (err) {
            if (err instanceof Error) {
                return console.error(err)
            }
            setIsUploading(false)
        }
    }

    return <Dropzone accept={{'application/pdf': ['.pdf']}} onDrop={async (acceptedFiles) => {
        setIsUploading(true)
        const progress = startSimulatingProgress()

        try {
            if (acceptedFiles[0].type !== "application/pdf") {
                toast.error('Type of file should be pdf.', {style: {...errorToast}})
                return setIsUploading(false)
            }

            const signURL = await generateSignedURL(acceptedFiles[0].name)

            if (signURL?.error) return toast.error(signURL.error, {style: {...errorToast}})
            if (!signURL?.url) return toast.error('Something went wrong with url generation, please try again.')

            await uploadFormOnS3(signURL?.url, acceptedFiles)

            await createPDFInDbAndEmbeddings(acceptedFiles[0].name, signURL?.key, signURL?.url.split('?')[0])

            clearInterval(progress)
            setProgress(100)

        } catch (error) {
            if (error instanceof Error) return toast.error(error.message)
        }

        toast.success("File uploaded successfully.")
    }}>
        {({getRootProps, getInputProps, acceptedFiles}) => (
            <section>
                <p>Drag and drop some files here, or click to select files.</p>
                <div {...getRootProps()} className={'border h-64 m-4 border-dashed border-zinc-200 rounded-lg'}>
                    <div className={`h-full flex w-full justify-center items-center`}>
                        <label htmlFor="dropzone-file"
                               className={`flex group flex-col items-center justify-center h-full w-full cursor-pointer rounded-lg bg-zinc-50 hover:bg-zinc-100`}>
                            <div className={'flex flex-col items-center justify-center space-y-4 text-zinc-700 mb-4'}>
                                <CloudIcon className={'group-hover:text-orange-500'}/>
                                <TypographyP>Click to upload file or <span
                                    className={'font-semibold group-hover:text-orange-500'}>drag and drop.</span></TypographyP>
                                <p className={'text-sm'}>Upload pdf up to 20 mb.</p>
                            </div>
                            {acceptedFiles && acceptedFiles[0] && <>
                                <UploadBadge name={acceptedFiles[0].name}/>
                            </>}

                            <div className={'w-2/3 h-1 mt-5'}>
                                {isUploading && <Progress className={'h-2'} value={progress}/>}
                            </div>
                            <input accept={'application/pdf'} {...getInputProps()} type="file" id='dropzone-file'/>
                        </label>

                    </div>
                </div>
            </section>
        )}
    </Dropzone>
}

function UploadButton() {
    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload files here</DialogTitle>
                </DialogHeader>
                <UploadDropzone/>
                <DialogClose/>
            </DialogContent>
        </Dialog>
    </>
}

export default UploadButton;