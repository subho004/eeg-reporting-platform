"use client"

import { useReport } from "@/components/report/report-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Plus, Trash2, Upload } from "lucide-react"
import { useState, useRef, type ChangeEvent } from "react"

interface AnnotationsStageProps {
  onNext: () => void
  onPrevious: () => void
}

export function AnnotationsStage({ onNext, onPrevious }: AnnotationsStageProps) {
  const { reportData, updateAnnotationsData } = useReport()
  const { annotations } = reportData

  const [annotationsList, setAnnotationsList] = useState(annotations.annotations)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddAnnotation = () => {
    const newAnnotation = {
      timestamp: "",
      description: "",
      imageUrl: "",
    }

    const updatedAnnotations = [...annotationsList, newAnnotation]
    setAnnotationsList(updatedAnnotations)

    updateAnnotationsData({
      annotations: updatedAnnotations,
    })
  }

  const handleRemoveAnnotation = (index: number) => {
    const updatedAnnotations = annotationsList.filter((_, i) => i !== index)
    setAnnotationsList(updatedAnnotations)

    updateAnnotationsData({
      annotations: updatedAnnotations,
    })
  }

  const handleAnnotationChange = (index: number, field: string, value: string) => {
    const updatedAnnotations = [...annotationsList]
    updatedAnnotations[index] = {
      ...updatedAnnotations[index],
      [field]: value,
    }

    setAnnotationsList(updatedAnnotations)

    updateAnnotationsData({
      annotations: updatedAnnotations,
    })
  }

  const handleFileUpload = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string
          handleAnnotationChange(index, "imageUrl", imageUrl)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = (index: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      fileInputRef.current.dataset.index = index.toString()
    }
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const index = fileInputRef.current?.dataset.index
    if (index) {
      handleFileUpload(Number.parseInt(index), e)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-700">Annotations</h2>

      <div className="flex justify-between items-center">
        <p className="text-gray-500">Add annotations for important EEG findings</p>
        <Button variant="outline" size="sm" className="text-blue-600" onClick={handleAddAnnotation}>
          <Plus className="h-4 w-4 mr-1" />
          Add Annotation
        </Button>
      </div>

      {/* Hidden file input for EEG strip uploads */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileInputChange}
        multiple
      />

      {annotationsList.length === 0 ? (
        <Card className="bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-4">No annotations added</p>
            <Button variant="outline" size="sm" className="text-blue-600" onClick={handleAddAnnotation}>
              <Plus className="h-4 w-4 mr-1" />
              Add Annotation
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {annotationsList.map((annotation, index) => (
            <Card key={index} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                onClick={() => handleRemoveAnnotation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`timestamp-${index}`}>Timestamp</Label>
                    <Input
                      id={`timestamp-${index}`}
                      placeholder="e.g., 00:05:23"
                      value={annotation.timestamp}
                      onChange={(e) => handleAnnotationChange(index, "timestamp", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="Describe the finding..."
                      value={annotation.description}
                      onChange={(e) => handleAnnotationChange(index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>EEG Strip Image</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                      {annotation.imageUrl ? (
                        <div className="relative w-full">
                          <img
                            src={annotation.imageUrl || "/placeholder.svg"}
                            alt="EEG Strip"
                            className="w-full h-auto object-contain"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                            onClick={() => handleAnnotationChange(index, "imageUrl", "")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2">Upload EEG strip image</p>
                          <Button variant="outline" size="sm" onClick={() => triggerFileInput(index)}>
                            Select Image
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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

