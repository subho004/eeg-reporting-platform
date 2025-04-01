"use client"

import { useReport } from "@/components/report/report-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

interface EEGFindingsStageProps {
  onNext: () => void
  onPrevious: () => void
}

export function EEGFindingsStage({ onNext, onPrevious }: EEGFindingsStageProps) {
  const { reportData, updateEEGFindingsData } = useReport()
  const { eegFindings } = reportData

  const [abnormalPatterns, setAbnormalPatterns] = useState(eegFindings.interictalFindings.abnormalPatterns)

  const handleEEGElementsChange = (element: string, checked: boolean) => {
    let updatedElements = [...eegFindings.backgroundActivity.eegElements]

    if (checked) {
      updatedElements.push(element)
    } else {
      updatedElements = updatedElements.filter((el) => el !== element)
    }

    updateEEGFindingsData({
      backgroundActivity: {
        ...eegFindings.backgroundActivity,
        eegElements: updatedElements,
      },
    })
  }

  const handleSleepStagesChange = (stage: string, checked: boolean) => {
    let updatedStages = [...eegFindings.sleepAndDrowsiness.sleepStages]

    if (checked) {
      updatedStages.push(stage)
    } else {
      updatedStages = updatedStages.filter((s) => s !== stage)
    }

    updateEEGFindingsData({
      sleepAndDrowsiness: {
        ...eegFindings.sleepAndDrowsiness,
        sleepStages: updatedStages,
      },
    })
  }

  const handleSleepCharacteristicsChange = (characteristic: string, checked: boolean) => {
    let updatedCharacteristics = [...eegFindings.sleepAndDrowsiness.sleepCharacteristics]

    if (checked) {
      updatedCharacteristics.push(characteristic)
    } else {
      updatedCharacteristics = updatedCharacteristics.filter((c) => c !== characteristic)
    }

    updateEEGFindingsData({
      sleepAndDrowsiness: {
        ...eegFindings.sleepAndDrowsiness,
        sleepCharacteristics: updatedCharacteristics,
      },
    })
  }

  const handleSleepAbnormalitiesChange = (abnormality: string, checked: boolean) => {
    let updatedAbnormalities = [...eegFindings.sleepAndDrowsiness.sleepAbnormalities]

    if (checked) {
      updatedAbnormalities.push(abnormality)
    } else {
      updatedAbnormalities = updatedAbnormalities.filter((a) => a !== abnormality)
    }

    updateEEGFindingsData({
      sleepAndDrowsiness: {
        ...eegFindings.sleepAndDrowsiness,
        sleepAbnormalities: updatedAbnormalities,
      },
    })
  }

  const handleBiologicalArtifactsChange = (artifact: string, checked: boolean) => {
    let updatedArtifacts = [...eegFindings.interictalFindings.eegArtifacts.biological]

    if (checked) {
      updatedArtifacts.push(artifact)
    } else {
      updatedArtifacts = updatedArtifacts.filter((a) => a !== artifact)
    }

    updateEEGFindingsData({
      interictalFindings: {
        ...eegFindings.interictalFindings,
        eegArtifacts: {
          ...eegFindings.interictalFindings.eegArtifacts,
          biological: updatedArtifacts,
        },
      },
    })
  }

  const handleNonBiologicalArtifactsChange = (artifact: string, checked: boolean) => {
    let updatedArtifacts = [...eegFindings.interictalFindings.eegArtifacts.nonBiological]

    if (checked) {
      updatedArtifacts.push(artifact)
    } else {
      updatedArtifacts = updatedArtifacts.filter((a) => a !== artifact)
    }

    updateEEGFindingsData({
      interictalFindings: {
        ...eegFindings.interictalFindings,
        eegArtifacts: {
          ...eegFindings.interictalFindings.eegArtifacts,
          nonBiological: updatedArtifacts,
        },
      },
    })
  }

  const handleAddAbnormalPattern = () => {
    const newPattern = {
      type: "Epileptiform Discharges",
      subtype: "Spikes",
      rhythmic: "",
      periodic: "",
      prevalence: "Rare (<1%)",
    }

    const updatedPatterns = [...abnormalPatterns, newPattern]
    setAbnormalPatterns(updatedPatterns)

    updateEEGFindingsData({
      interictalFindings: {
        ...eegFindings.interictalFindings,
        abnormalPatterns: updatedPatterns,
      },
    })
  }

  const handleRemoveAbnormalPattern = (index: number) => {
    const updatedPatterns = abnormalPatterns.filter((_, i) => i !== index)
    setAbnormalPatterns(updatedPatterns)

    updateEEGFindingsData({
      interictalFindings: {
        ...eegFindings.interictalFindings,
        abnormalPatterns: updatedPatterns,
      },
    })
  }

  const handleAbnormalPatternChange = (index: number, field: string, value: string) => {
    const updatedPatterns = [...abnormalPatterns]
    updatedPatterns[index] = {
      ...updatedPatterns[index],
      [field]: value,
    }

    setAbnormalPatterns(updatedPatterns)

    updateEEGFindingsData({
      interictalFindings: {
        ...eegFindings.interictalFindings,
        abnormalPatterns: updatedPatterns,
      },
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-700">EEG Findings</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-700">Background Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="mb-2 block">EEG Elements</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Posterior Dominant Rhythm (PDR)",
                "Mu Rhythm",
                "Delta Rhythm",
                "Theta Rhythm",
                "Alpha Rhythm",
                "Beta Rhythm",
              ].map((element) => (
                <div key={element} className="flex items-center space-x-2">
                  <Checkbox
                    id={`element-${element}`}
                    checked={eegFindings.backgroundActivity.eegElements.includes(element)}
                    onCheckedChange={(checked) => handleEEGElementsChange(element, checked as boolean)}
                  />
                  <Label htmlFor={`element-${element}`}>{element}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amplitude">Amplitude</Label>
              <Select
                value={eegFindings.backgroundActivity.amplitude}
                onValueChange={(value) =>
                  updateEEGFindingsData({
                    backgroundActivity: {
                      ...eegFindings.backgroundActivity,
                      amplitude: value,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select amplitude" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symmetry">Symmetry</Label>
              <Select
                value={eegFindings.backgroundActivity.symmetry}
                onValueChange={(value) =>
                  updateEEGFindingsData({
                    backgroundActivity: {
                      ...eegFindings.backgroundActivity,
                      symmetry: value,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select symmetry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Symmetric">Symmetric</SelectItem>
                  <SelectItem value="Left < Right">Left &lt; Right</SelectItem>
                  <SelectItem value="Right < Left">Right &lt; Left</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reactivity">Reactivity to Eye Opening</Label>
              <Select
                value={eegFindings.backgroundActivity.reactivity}
                onValueChange={(value) =>
                  updateEEGFindingsData({
                    backgroundActivity: {
                      ...eegFindings.backgroundActivity,
                      reactivity: value,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reactivity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-700">Sleep & Drowsiness</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="mb-2 block">Sleep Stages</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["NREM 1", "NREM 2", "NREM 3", "REM"].map((stage) => (
                <div key={stage} className="flex items-center space-x-2">
                  <Checkbox
                    id={`stage-${stage}`}
                    checked={eegFindings.sleepAndDrowsiness.sleepStages.includes(stage)}
                    onCheckedChange={(checked) => handleSleepStagesChange(stage, checked as boolean)}
                  />
                  <Label htmlFor={`stage-${stage}`}>{stage}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-2 block">Sleep Characteristics</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["Sleep Spindle", "K-Complexes", "Sawtooth Waves"].map((characteristic) => (
                <div key={characteristic} className="flex items-center space-x-2">
                  <Checkbox
                    id={`characteristic-${characteristic}`}
                    checked={eegFindings.sleepAndDrowsiness.sleepCharacteristics.includes(characteristic)}
                    onCheckedChange={(checked) => handleSleepCharacteristicsChange(characteristic, checked as boolean)}
                  />
                  <Label htmlFor={`characteristic-${characteristic}`}>{characteristic}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-2 block">Sleep Abnormalities</Label>
            <div className="grid grid-cols-2 gap-2">
              {["Asymmetry", "Absence of Physiological Sleep Features"].map((abnormality) => (
                <div key={abnormality} className="flex items-center space-x-2">
                  <Checkbox
                    id={`abnormality-${abnormality}`}
                    checked={eegFindings.sleepAndDrowsiness.sleepAbnormalities.includes(abnormality)}
                    onCheckedChange={(checked) => handleSleepAbnormalitiesChange(abnormality, checked as boolean)}
                  />
                  <Label htmlFor={`abnormality-${abnormality}`}>{abnormality}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-blue-700">Interictal Findings</CardTitle>
          <Button variant="outline" size="sm" className="text-blue-600" onClick={handleAddAbnormalPattern}>
            <Plus className="h-4 w-4 mr-1" />
            Add Pattern
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {abnormalPatterns.map((pattern, index) => (
            <div key={index} className="p-4 border rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                onClick={() => handleRemoveAbnormalPattern(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Type of Abnormal Pattern</Label>
                  <Select
                    value={pattern.type}
                    onValueChange={(value) => handleAbnormalPatternChange(index, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Epileptiform Discharges">Epileptiform Discharges</SelectItem>
                      <SelectItem value="High Frequency Oscillations">High Frequency Oscillations</SelectItem>
                      <SelectItem value="Slowing">Slowing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {pattern.type === "Epileptiform Discharges" && (
                  <div className="space-y-2">
                    <Label>Subtype</Label>
                    <Select
                      value={pattern.subtype}
                      onValueChange={(value) => handleAbnormalPatternChange(index, "subtype", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subtype" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Spikes">Spikes</SelectItem>
                        <SelectItem value="Polyspikes">Polyspikes</SelectItem>
                        <SelectItem value="Sharp">Sharp</SelectItem>
                        <SelectItem value="Slow">Slow</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {pattern.type === "Epileptiform Discharges" && (
                  <div className="space-y-2">
                    <Label>If Rhythmic</Label>
                    <Select
                      value={pattern.rhythmic}
                      onValueChange={(value) => handleAbnormalPatternChange(index, "rhythmic", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Generalised">Generalised</SelectItem>
                        <SelectItem value="Lateralized">Lateralized</SelectItem>
                        <SelectItem value="Bilateral">Bilateral</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {pattern.type === "Epileptiform Discharges" && (
                  <div className="space-y-2">
                    <Label>If Periodic</Label>
                    <Select
                      value={pattern.periodic}
                      onValueChange={(value) => handleAbnormalPatternChange(index, "periodic", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Generalised">Generalised</SelectItem>
                        <SelectItem value="Lateralized">Lateralized</SelectItem>
                        <SelectItem value="Bilateral">Bilateral</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {pattern.type === "Slowing" && (
                  <div className="space-y-2">
                    <Label>Slowing Type</Label>
                    <Select
                      value={pattern.subtype}
                      onValueChange={(value) => handleAbnormalPatternChange(index, "subtype", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Focal">Focal</SelectItem>
                        <SelectItem value="Generalised">Generalised</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Prevalence</Label>
                  <Select
                    value={pattern.prevalence}
                    onValueChange={(value) => handleAbnormalPatternChange(index, "prevalence", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select prevalence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rare (<1%)">Rare (&lt;1%)</SelectItem>
                      <SelectItem value="Occasional (1-9%)">Occasional (1-9%)</SelectItem>
                      <SelectItem value="Frequent (10-49%)">Frequent (10-49%)</SelectItem>
                      <SelectItem value="Abundant (50-89%)">Abundant (50-89%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}

          <div className="space-y-4 mt-6">
            <h3 className="font-medium text-blue-700">EEG Artifacts</h3>

            <div className="space-y-2">
              <Label className="mb-2 block">Biological</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["Eye Movement", "Sweat", "Chewing", "Respiration", "Pulse", "ECG", "EMG"].map((artifact) => (
                  <div key={artifact} className="flex items-center space-x-2">
                    <Checkbox
                      id={`bio-${artifact}`}
                      checked={eegFindings.interictalFindings.eegArtifacts.biological.includes(artifact)}
                      onCheckedChange={(checked) => handleBiologicalArtifactsChange(artifact, checked as boolean)}
                    />
                    <Label htmlFor={`bio-${artifact}`}>{artifact}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="mb-2 block">Non-Biological</Label>
              <div className="grid grid-cols-2 gap-2">
                {["50/60 Hz Electrical Interference", "Electrode Pop"].map((artifact) => (
                  <div key={artifact} className="flex items-center space-x-2">
                    <Checkbox
                      id={`nonbio-${artifact}`}
                      checked={eegFindings.interictalFindings.eegArtifacts.nonBiological.includes(artifact)}
                      onCheckedChange={(checked) => handleNonBiologicalArtifactsChange(artifact, checked as boolean)}
                    />
                    <Label htmlFor={`nonbio-${artifact}`}>{artifact}</Label>
                  </div>
                ))}
              </div>
            </div>
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

