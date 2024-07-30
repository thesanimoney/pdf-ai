/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cndAaMzLm2G
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"

export default function UploadFilesArea() {
  const [isDragActive, setIsDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  // @ts-ignore
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(true)
  }
  // @ts-ignore
  const handleDragLeave = (e:DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
  }
  // @ts-ignore
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 2000)
  }
  return (
    <div className="w-full max-w-md">
      <div className="space-y-4">
        <p className="text-muted-foreground">Drag and drop your files here or click to select.</p>
      </div>
      <div
        onDragEnter={(event) => handleDragEnter(event)}
        onDragLeave={(event) => handleDragLeave(event)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`mt-6 flex h-48 items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
          isDragActive ? "border-primary" : "border-muted hover:border-primary-foreground"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-spin text-primary" />
            <span>Uploading...</span>
          </div>
        ) : isSuccess ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 text-green-500" />
            <span>Upload successful!</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 text-muted-foreground" />
            <span>Drag and drop files here</span>
          </div>
        )}
      </div>
    </div>
  )
}