"use client"

import type React from "react"

import { useReport } from "@/components/report/report-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight } from "lucide-react"

interface PatientStageProps {
  onNext: () => void
}

export function PatientStage({ onNext }: PatientStageProps) {
  const { reportData, updatePatientData } = useReport()
  const { patient } = reportData

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updatePatientData({ [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    updatePatientData({ [name]: value })
  }

  const handleMedicationChange = (medication: string, checked: boolean) => {
    let updatedMedications = [...patient.currentMedications]

    if (checked) {
      updatedMedications.push(medication)
    } else {
      updatedMedications = updatedMedications.filter((med) => med !== medication)
    }

    updatePatientData({ currentMedications: updatedMedications })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-700">Patient Information</h2>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Patient Details</TabsTrigger>
          <TabsTrigger value="clinical">Clinical Information</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name</Label>
              <Input id="name" name="name" value={patient.name} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uhid">UHID</Label>
              <Input id="uhid" name="uhid" value={patient.uhid} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" value={patient.age} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={patient.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" name="dob" type="date" value={patient.dob} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="abhaId">ABHA ID</Label>
              <Input id="abhaId" name="abhaId" value={patient.abhaId} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" name="height" value={patient.height} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" name="weight" value={patient.weight} onChange={handleInputChange} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" value={patient.address} onChange={handleInputChange} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="referringDoctor">Referring Doctor</Label>
              <Input
                id="referringDoctor"
                name="referringDoctor"
                value={patient.referringDoctor}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={patient.department} onValueChange={(value) => handleSelectChange("department", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clinicalIndication">Clinical Indication for EEG</Label>
              <Select
                value={patient.clinicalIndication}
                onValueChange={(value) => handleSelectChange("clinicalIndication", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select indication" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Headache">Headache</SelectItem>
                  <SelectItem value="Fever">Fever</SelectItem>
                  <SelectItem value="Fall">Fall</SelectItem>
                  <SelectItem value="Seizures">Seizures</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {patient.clinicalIndication === "Seizures" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="lastEpisode">Last Episode</Label>
                  <Select
                    value={patient.lastEpisode}
                    onValueChange={(value) => handleSelectChange("lastEpisode", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select last episode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="<1 hr">&lt;1 hr</SelectItem>
                      <SelectItem value="<1 day">&lt;1 day</SelectItem>
                      <SelectItem value="<1 month">&lt;1 month</SelectItem>
                      <SelectItem value=">1 month">&gt;1 month</SelectItem>
                      <SelectItem value=">1 year">&gt;1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="episodeFrequency">Episode Frequency</Label>
                  <Select
                    value={patient.episodeFrequency}
                    onValueChange={(value) => handleSelectChange("episodeFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="<1 hr">&lt;1 hr</SelectItem>
                      <SelectItem value="<1 day">&lt;1 day</SelectItem>
                      <SelectItem value="<1 month">&lt;1 month</SelectItem>
                      <SelectItem value=">1 month">&gt;1 month</SelectItem>
                      <SelectItem value=">1 year">&gt;1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Card className="md:col-span-2">
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Current Medications</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="med-midazolam"
                          checked={patient.currentMedications.includes("Midazolam")}
                          onCheckedChange={(checked) => handleMedicationChange("Midazolam", checked as boolean)}
                        />
                        <Label htmlFor="med-midazolam">Midazolam</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="med-benzodiazepine"
                          checked={patient.currentMedications.includes("Benzodiazepine")}
                          onCheckedChange={(checked) => handleMedicationChange("Benzodiazepine", checked as boolean)}
                        />
                        <Label htmlFor="med-benzodiazepine">Benzodiazepine</Label>
                      </div>
                    </div>
                  </div>

                  {patient.currentMedications.length > 0 && (
                    <div className="space-y-2">
                      <Label htmlFor="medicationFrequency">Medication Frequency</Label>
                      <Select
                        value={patient.medicationFrequency}
                        onValueChange={(value) => handleSelectChange("medicationFrequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="patientHistory">Patient History</Label>
              <Textarea
                id="patientHistory"
                name="patientHistory"
                value={patient.patientHistory}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recentCTScan">Recent CT Scan</Label>
              <Select value={patient.recentCTScan} onValueChange={(value) => handleSelectChange("recentCTScan", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {patient.recentCTScan === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="ctScanResult">CT Scan Result</Label>
                <Select
                  value={patient.ctScanResult}
                  onValueChange={(value) => handleSelectChange("ctScanResult", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Abnormal">Abnormal</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {patient.recentCTScan === "Yes" && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ctScanComment">CT Scan Comment</Label>
                <Textarea
                  id="ctScanComment"
                  name="ctScanComment"
                  value={patient.ctScanComment}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="recentMRIScan">Recent MRI Scan</Label>
              <Select
                value={patient.recentMRIScan}
                onValueChange={(value) => handleSelectChange("recentMRIScan", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {patient.recentMRIScan === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="mriScanResult">MRI Scan Result</Label>
                <Select
                  value={patient.mriScanResult}
                  onValueChange={(value) => handleSelectChange("mriScanResult", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Abnormal">Abnormal</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {patient.recentMRIScan === "Yes" && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="mriScanComment">MRI Scan Comment</Label>
                <Textarea
                  id="mriScanComment"
                  name="mriScanComment"
                  value={patient.mriScanComment}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={onNext}>
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

