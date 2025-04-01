"use client"

import { useReport } from "@/components/report/report-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

interface SeizureFindingsStageProps {
  onNext: () => void
  onPrevious: () => void
}

export function SeizureFindingsStage({ onNext, onPrevious }: SeizureFindingsStageProps) {
  const { reportData, updateSeizureFindingsData } = useReport()
  const { seizureFindings } = reportData

  const [seizures, setSeizures] = useState(seizureFindings.seizures)

  const handleAddSeizure = () => {
    const newSeizure = {
      classification: "Generalised Onset",
      subtype: "Tonic Clonic",
      duration: "<30 sec",
      clinicalSigns: [],
      eegPattern: [],
      postictalSigns: [],
    }

    const updatedSeizures = [...seizures, newSeizure]
    setSeizures(updatedSeizures)

    updateSeizureFindingsData({
      seizures: updatedSeizures,
    })
  }

  const handleRemoveSeizure = (index: number) => {
    const updatedSeizures = seizures.filter((_, i) => i !== index)
    setSeizures(updatedSeizures)

    updateSeizureFindingsData({
      seizures: updatedSeizures,
    })
  }

  const handleSeizureChange = (index: number, field: string, value: string) => {
    const updatedSeizures = [...seizures]
    updatedSeizures[index] = {
      ...updatedSeizures[index],
      [field]: value,
    }

    setSeizures(updatedSeizures)

    updateSeizureFindingsData({
      seizures: updatedSeizures,
    })
  }

  const handleClinicalSignsChange = (index: number, sign: string, checked: boolean) => {
    const updatedSeizures = [...seizures]
    let updatedSigns = [...updatedSeizures[index].clinicalSigns]

    if (checked) {
      updatedSigns.push(sign)
    } else {
      updatedSigns = updatedSigns.filter((s) => s !== sign)
    }

    updatedSeizures[index] = {
      ...updatedSeizures[index],
      clinicalSigns: updatedSigns,
    }

    setSeizures(updatedSeizures)

    updateSeizureFindingsData({
      seizures: updatedSeizures,
    })
  }

  const handleEEGPatternChange = (index: number, pattern: string, checked: boolean) => {
    const updatedSeizures = [...seizures]
    let updatedPatterns = [...updatedSeizures[index].eegPattern]

    if (checked) {
      updatedPatterns.push(pattern)
    } else {
      updatedPatterns = updatedPatterns.filter((p) => p !== pattern)
    }

    updatedSeizures[index] = {
      ...updatedSeizures[index],
      eegPattern: updatedPatterns,
    }

    setSeizures(updatedSeizures)

    updateSeizureFindingsData({
      seizures: updatedSeizures,
    })
  }

  const handlePostictalSignsChange = (index: number, sign: string, checked: boolean) => {
    const updatedSeizures = [...seizures]
    let updatedSigns = [...updatedSeizures[index].postictalSigns]

    if (checked) {
      updatedSigns.push(sign)
    } else {
      updatedSigns = updatedSigns.filter((s) => s !== sign)
    }

    updatedSeizures[index] = {
      ...updatedSeizures[index],
      postictalSigns: updatedSigns,
    }

    setSeizures(updatedSeizures)

    updateSeizureFindingsData({
      seizures: updatedSeizures,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-700">Seizure Findings</h2>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-blue-700">Seizures Classification</h3>
        <Button variant="outline" size="sm" className="text-blue-600" onClick={handleAddSeizure}>
          <Plus className="h-4 w-4 mr-1" />
          Add Seizure
        </Button>
      </div>

      {seizures.length === 0 ? (
        <Card className="bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-4">No seizures recorded</p>
            <Button variant="outline" size="sm" className="text-blue-600" onClick={handleAddSeizure}>
              <Plus className="h-4 w-4 mr-1" />
              Add Seizure
            </Button>
          </CardContent>
        </Card>
      ) : (
        seizures.map((seizure, index) => (
          <Card key={index} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={() => handleRemoveSeizure(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <CardHeader>
              <CardTitle className="text-lg text-blue-700">Seizure #{index + 1}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Classification</Label>
                  <Select
                    value={seizure.classification}
                    onValueChange={(value) => handleSeizureChange(index, "classification", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Generalised Onset">Generalised Onset</SelectItem>
                      <SelectItem value="Focal Onset">Focal Onset</SelectItem>
                      <SelectItem value="Unknown Onset">Unknown Onset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {seizure.classification === "Generalised Onset" && (
                  <div className="space-y-2">
                    <Label>Subtype</Label>
                    <Select
                      value={seizure.subtype}
                      onValueChange={(value) => handleSeizureChange(index, "subtype", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subtype" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tonic Clonic">Tonic Clonic</SelectItem>
                        <SelectItem value="Absence">Absence</SelectItem>
                        <SelectItem value="Myoclonic">Myoclonic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {seizure.classification === "Focal Onset" && (
                  <div className="space-y-2">
                    <Label>Subtype</Label>
                    <Select
                      value={seizure.subtype}
                      onValueChange={(value) => handleSeizureChange(index, "subtype", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subtype" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aware">Aware</SelectItem>
                        <SelectItem value="Impaired Awareness">Impaired Awareness</SelectItem>
                        <SelectItem value="Motor">Motor</SelectItem>
                        <SelectItem value="Non-Motor">Non-Motor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select
                    value={seizure.duration}
                    onValueChange={(value) => handleSeizureChange(index, "duration", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<10 sec">&lt;10 sec</SelectItem>
                      <SelectItem value="<30 sec">&lt;30 sec</SelectItem>
                      <SelectItem value="<1 min">&lt;1 min</SelectItem>
                      <SelectItem value="> 1 min">&gt; 1 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="mb-2 block">Clinical Signs</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["Automatisms", "Motor Symptoms", "Sensory Symptoms"].map((sign) => (
                      <div key={sign} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sign-${index}-${sign}`}
                          checked={seizure.clinicalSigns.includes(sign)}
                          onCheckedChange={(checked) => handleClinicalSignsChange(index, sign, checked as boolean)}
                        />
                        <Label htmlFor={`sign-${index}-${sign}`}>{sign}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="mb-2 block">EEG Pattern</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Polyspikes", "Low Voltage Fast Activity", "Electrodecrement", "Unknown"].map((pattern) => (
                      <div key={pattern} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pattern-${index}-${pattern}`}
                          checked={seizure.eegPattern.includes(pattern)}
                          onCheckedChange={(checked) => handleEEGPatternChange(index, pattern, checked as boolean)}
                        />
                        <Label htmlFor={`pattern-${index}-${pattern}`}>{pattern}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="mb-2 block">Postictal Signs</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Confusion", "Postictal Sleep", "Unconscious", "Todd's Paralysis"].map((sign) => (
                      <div key={sign} className="flex items-center space-x-2">
                        <Checkbox
                          id={`postictal-${index}-${sign}`}
                          checked={seizure.postictalSigns.includes(sign)}
                          onCheckedChange={(checked) => handlePostictalSignsChange(index, sign, checked as boolean)}
                        />
                        <Label htmlFor={`postictal-${index}-${sign}`}>{sign}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
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

