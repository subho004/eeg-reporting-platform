"use client"

import type React from "react"

import { useReport } from "@/components/report/report-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Upload, Trash2 } from "lucide-react"
import { useRef, useState, type ChangeEvent } from "react"

interface SignatureStageProps {
  onNext: () => void
  onPrevious: () => void
}

export function SignatureStage({ onNext, onPrevious }: SignatureStageProps) {
  const { reportData, updateSignatureData } = useReport()
  const { signature } = reportData
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [signatureImage, setSignatureImage] = useState(signature.signature)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateSignatureData({ [name]: value })
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string
          setSignatureImage(imageUrl)
          updateSignatureData({ signature: imageUrl })
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const clearSignature = () => {
    setSignatureImage("")
    updateSignatureData({ signature: "" })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-700">Signature</h2>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doctorName">Doctor Name</Label>
              <Input id="doctorName" name="doctorName" value={signature.doctorName} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" name="designation" value={signature.designation} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" value={signature.date} onChange={handleInputChange} />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label>Signature</Label>
            <div className="border rounded-md p-6 bg-gray-50">
              {signatureImage ? (
                <div className="relative">
                  <img
                    src={signatureImage || "/placeholder.svg"}
                    alt="Signature"
                    className="max-h-[150px] mx-auto object-contain"
                  />
                  <div className="flex justify-end mt-2">
                    <Button variant="outline" size="sm" onClick={clearSignature} className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Remove Signature
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-4">Upload your signature image</p>
                  <Button variant="outline" onClick={triggerFileInput} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Signature
                  </Button>
                </div>
              )}
            </div>

            {/* Hidden file input for signature image upload */}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Step
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={onNext}>
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

