"use client"

import { useReport } from "@/components/report/report-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { useRef } from "react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface PreviewStageProps {
  onPrevious: () => void
}

export function PreviewStage({ onPrevious }: PreviewStageProps) {
  const { reportData } = useReport()
  const reportRef = useRef<HTMLDivElement>(null)

  const generatePDF = async () => {
    if (!reportRef.current) return

    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const margin = 10

    const elements = reportRef.current.querySelectorAll(".report-page")

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")

      if (i > 0) {
        pdf.addPage()
      }

      const imgWidth = pdfWidth - margin * 2
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight)
    }

    pdf.save(`EEG_Report_${reportData.reportId}.pdf`)
  }

  const printReport = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-700">Preview Report</h2>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={printReport}>
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2" onClick={generatePDF}>
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <div ref={reportRef} className="mx-auto max-w-[210mm]">
          {/* Page 1 */}
          <Card className="report-page mb-8 shadow-md w-full h-[297mm] overflow-hidden">
            <CardContent className="p-8">
              <div className="border-b pb-4 mb-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-blue-700">EEG Report</h1>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Report ID: {reportData.reportId}</p>
                    <p className="text-sm text-gray-500">Date: {reportData.signature.date}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">Patient Information</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p>
                        <span className="font-medium">Name:</span> {reportData.patient.name}
                      </p>
                      <p>
                        <span className="font-medium">UHID:</span> {reportData.patient.uhid}
                      </p>
                      <p>
                        <span className="font-medium">Age/Gender:</span> {reportData.patient.age} years,{" "}
                        {reportData.patient.gender}
                      </p>
                      <p>
                        <span className="font-medium">DOB:</span> {reportData.patient.dob}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">ABHA ID:</span> {reportData.patient.abhaId}
                      </p>
                      <p>
                        <span className="font-medium">Height:</span> {reportData.patient.height} cm
                      </p>
                      <p>
                        <span className="font-medium">Weight:</span> {reportData.patient.weight} kg
                      </p>
                      <p>
                        <span className="font-medium">Address:</span> {reportData.patient.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">Clinical Information</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p>
                        <span className="font-medium">Referring Doctor:</span> {reportData.patient.referringDoctor}
                      </p>
                      <p>
                        <span className="font-medium">Department:</span> {reportData.patient.department}
                      </p>
                      <p>
                        <span className="font-medium">Clinical Indication:</span>{" "}
                        {reportData.patient.clinicalIndication}
                      </p>
                      {reportData.patient.clinicalIndication === "Seizures" && (
                        <>
                          <p>
                            <span className="font-medium">Last Episode:</span> {reportData.patient.lastEpisode}
                          </p>
                          <p>
                            <span className="font-medium">Episode Frequency:</span>{" "}
                            {reportData.patient.episodeFrequency}
                          </p>
                        </>
                      )}
                    </div>
                    <div>
                      {reportData.patient.currentMedications.length > 0 && (
                        <>
                          <p>
                            <span className="font-medium">Current Medications:</span>{" "}
                            {reportData.patient.currentMedications.join(", ")}
                          </p>
                          <p>
                            <span className="font-medium">Medication Frequency:</span>{" "}
                            {reportData.patient.medicationFrequency}
                          </p>
                        </>
                      )}
                      {reportData.patient.recentCTScan === "Yes" && (
                        <p>
                          <span className="font-medium">CT Scan:</span> {reportData.patient.ctScanResult}
                        </p>
                      )}
                      {reportData.patient.recentMRIScan === "Yes" && (
                        <p>
                          <span className="font-medium">MRI Scan:</span> {reportData.patient.mriScanResult}
                        </p>
                      )}
                    </div>
                  </div>

                  {reportData.patient.patientHistory && (
                    <div className="mt-2">
                      <p>
                        <span className="font-medium">Patient History:</span> {reportData.patient.patientHistory}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">EEG Findings</h2>

                  <h3 className="font-medium mt-4">Background Activity</h3>
                  <div className="pl-4">
                    {reportData.eegFindings.backgroundActivity.eegElements.length > 0 && (
                      <p>
                        <span className="font-medium">EEG Elements:</span>{" "}
                        {reportData.eegFindings.backgroundActivity.eegElements.join(", ")}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Amplitude:</span>{" "}
                      {reportData.eegFindings.backgroundActivity.amplitude}
                    </p>
                    <p>
                      <span className="font-medium">Symmetry:</span>{" "}
                      {reportData.eegFindings.backgroundActivity.symmetry}
                    </p>
                    <p>
                      <span className="font-medium">Reactivity to Eye Opening:</span>{" "}
                      {reportData.eegFindings.backgroundActivity.reactivity}
                    </p>
                  </div>

                  <h3 className="font-medium mt-4">Sleep & Drowsiness</h3>
                  <div className="pl-4">
                    {reportData.eegFindings.sleepAndDrowsiness.sleepStages.length > 0 && (
                      <p>
                        <span className="font-medium">Sleep Stages:</span>{" "}
                        {reportData.eegFindings.sleepAndDrowsiness.sleepStages.join(", ")}
                      </p>
                    )}
                    {reportData.eegFindings.sleepAndDrowsiness.sleepCharacteristics.length > 0 && (
                      <p>
                        <span className="font-medium">Sleep Characteristics:</span>{" "}
                        {reportData.eegFindings.sleepAndDrowsiness.sleepCharacteristics.join(", ")}
                      </p>
                    )}
                    {reportData.eegFindings.sleepAndDrowsiness.sleepAbnormalities.length > 0 && (
                      <p>
                        <span className="font-medium">Sleep Abnormalities:</span>{" "}
                        {reportData.eegFindings.sleepAndDrowsiness.sleepAbnormalities.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Page 2 */}
          <Card className="report-page mb-8 shadow-md w-full h-[297mm] overflow-hidden">
            <CardContent className="p-8">
              <div className="border-b pb-4 mb-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-blue-700">EEG Report (Continued)</h1>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Patient: {reportData.patient.name}</p>
                    <p className="text-sm text-gray-500">UHID: {reportData.patient.uhid}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium">Interictal Findings</h3>
                  {reportData.eegFindings.interictalFindings.abnormalPatterns.length > 0 && (
                    <div className="pl-4 mt-2">
                      <p className="font-medium">Abnormal Patterns:</p>
                      <ul className="list-disc pl-8">
                        {reportData.eegFindings.interictalFindings.abnormalPatterns.map((pattern, index) => (
                          <li key={index}>
                            {pattern.type}
                            {pattern.subtype && ` - ${pattern.subtype}`}
                            {pattern.rhythmic && ` (Rhythmic: ${pattern.rhythmic})`}
                            {pattern.periodic && ` (Periodic: ${pattern.periodic})`}
                            {pattern.prevalence && ` - ${pattern.prevalence}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pl-4 mt-2">
                    <p className="font-medium">EEG Artifacts:</p>
                    {reportData.eegFindings.interictalFindings.eegArtifacts.biological.length > 0 && (
                      <p>
                        <span className="font-medium">Biological:</span>{" "}
                        {reportData.eegFindings.interictalFindings.eegArtifacts.biological.join(", ")}
                      </p>
                    )}
                    {reportData.eegFindings.interictalFindings.eegArtifacts.nonBiological.length > 0 && (
                      <p>
                        <span className="font-medium">Non-Biological:</span>{" "}
                        {reportData.eegFindings.interictalFindings.eegArtifacts.nonBiological.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">Seizure Findings</h2>

                  {reportData.seizureFindings.seizures.length > 0 ? (
                    reportData.seizureFindings.seizures.map((seizure, index) => (
                      <div key={index} className="pl-4 mb-4">
                        <h3 className="font-medium">Seizure #{index + 1}</h3>
                        <div className="pl-4">
                          <p>
                            <span className="font-medium">Classification:</span> {seizure.classification}
                          </p>
                          {seizure.subtype && (
                            <p>
                              <span className="font-medium">Subtype:</span> {seizure.subtype}
                            </p>
                          )}
                          <p>
                            <span className="font-medium">Duration:</span> {seizure.duration}
                          </p>

                          {seizure.clinicalSigns.length > 0 && (
                            <p>
                              <span className="font-medium">Clinical Signs:</span> {seizure.clinicalSigns.join(", ")}
                            </p>
                          )}

                          {seizure.eegPattern.length > 0 && (
                            <p>
                              <span className="font-medium">EEG Pattern:</span> {seizure.eegPattern.join(", ")}
                            </p>
                          )}

                          {seizure.postictalSigns.length > 0 && (
                            <p>
                              <span className="font-medium">Postictal Signs:</span> {seizure.postictalSigns.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="pl-4 text-gray-500">No seizures recorded during the EEG.</p>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">Annotations</h2>

                  {reportData.annotations.annotations.length > 0 ? (
                    reportData.annotations.annotations.map((annotation, index) => (
                      <div key={index} className="pl-4 mb-4">
                        <p>
                          <span className="font-medium">Timestamp:</span> {annotation.timestamp}
                          {annotation.description && ` - ${annotation.description}`}
                        </p>
                        {annotation.imageUrl && (
                          <div className="mt-2">
                            <img
                              src={annotation.imageUrl || "/placeholder.svg"}
                              alt={`EEG Strip at ${annotation.timestamp}`}
                              className="max-w-full h-auto border"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="pl-4 text-gray-500">No annotations added.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Page 3 */}
          <Card className="report-page shadow-md w-full h-[297mm] overflow-hidden">
            <CardContent className="p-8">
              <div className="border-b pb-4 mb-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-blue-700">EEG Report (Continued)</h1>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Patient: {reportData.patient.name}</p>
                    <p className="text-sm text-gray-500">UHID: {reportData.patient.uhid}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">Additional Notes</h2>

                  {reportData.additionalNotes.notes ? (
                    <div className="pl-4 whitespace-pre-line">{reportData.additionalNotes.notes}</div>
                  ) : (
                    <p className="pl-4 text-gray-500">No additional notes.</p>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">Recommendations</h2>

                  {reportData.additionalNotes.recommendations ? (
                    <div className="pl-4 whitespace-pre-line">{reportData.additionalNotes.recommendations}</div>
                  ) : (
                    <p className="pl-4 text-gray-500">No recommendations provided.</p>
                  )}
                </div>

                <div className="mt-12">
                  <div className="flex flex-col items-end">
                    {reportData.signature.signature && (
                      <div className="mb-2">
                        <img
                          src={reportData.signature.signature || "/placeholder.svg"}
                          alt="Doctor's Signature"
                          className="h-16 object-contain"
                        />
                      </div>
                    )}
                    <p className="font-medium">{reportData.signature.doctorName}</p>
                    <p>{reportData.signature.designation}</p>
                    <p className="text-sm text-gray-500">Date: {reportData.signature.date}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Step
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={generatePDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  )
}

