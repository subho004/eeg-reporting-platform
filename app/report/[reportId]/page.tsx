"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ReportTabs } from "@/components/report/report-tabs"
import { PatientStage } from "@/components/report/stages/patient-stage"
import { EEGFindingsStage } from "@/components/report/stages/eeg-findings-stage"
import { SeizureFindingsStage } from "@/components/report/stages/seizure-findings-stage"
import { AnnotationsStage } from "@/components/report/stages/annotations-stage"
import { AdditionalNotesStage } from "@/components/report/stages/additional-notes-stage"
import { SignatureStage } from "@/components/report/stages/signature-stage"
import { PreviewStage } from "@/components/report/stages/preview-stage"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ReportProvider } from "@/components/report/report-context"

// Define the tab order for navigation
const tabOrder = [
  "patient",
  "eeg-findings",
  "seizure-findings",
  "annotations",
  "additional-notes",
  "signature",
  "preview",
]

export default function ReportPage({ params }: { params: { reportId: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("patient")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const goToNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1])
    }
  }

  const goToPreviousTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1])
    }
  }

  return (
    <ReportProvider reportId={params.reportId}>
      <div className="container mx-auto py-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-4" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-blue-700">EEG Report Generation</h1>
          <div className="ml-auto text-sm text-gray-500">Report ID: {params.reportId}</div>
        </div>

        <ReportTabs value={activeTab} onValueChange={handleTabChange} />

        <div className="mt-6 bg-white rounded-lg border shadow-sm p-6">
          {activeTab === "patient" && <PatientStage onNext={goToNextTab} />}
          {activeTab === "eeg-findings" && <EEGFindingsStage onNext={goToNextTab} onPrevious={goToPreviousTab} />}
          {activeTab === "seizure-findings" && (
            <SeizureFindingsStage onNext={goToNextTab} onPrevious={goToPreviousTab} />
          )}
          {activeTab === "annotations" && <AnnotationsStage onNext={goToNextTab} onPrevious={goToPreviousTab} />}
          {activeTab === "additional-notes" && (
            <AdditionalNotesStage onNext={goToNextTab} onPrevious={goToPreviousTab} />
          )}
          {activeTab === "signature" && <SignatureStage onNext={goToNextTab} onPrevious={goToPreviousTab} />}
          {activeTab === "preview" && <PreviewStage onPrevious={goToPreviousTab} />}
        </div>
      </div>
    </ReportProvider>
  )
}

