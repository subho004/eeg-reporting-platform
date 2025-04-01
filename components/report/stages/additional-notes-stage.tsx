"use client"

import type React from "react"

import { useReport } from "@/components/report/report-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface AdditionalNotesStageProps {
  onNext: () => void
  onPrevious: () => void
}

export function AdditionalNotesStage({ onNext, onPrevious }: AdditionalNotesStageProps) {
  const { reportData, updateAdditionalNotesData } = useReport()
  const { additionalNotes } = reportData

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateAdditionalNotesData({ [name]: value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-700">Additional Notes</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-700">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={additionalNotes.notes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes about the EEG findings..."
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-700">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="recommendations">Treatment Recommendations</Label>
            <Textarea
              id="recommendations"
              name="recommendations"
              value={additionalNotes.recommendations}
              onChange={handleInputChange}
              placeholder="Enter treatment recommendations..."
              rows={5}
            />
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

