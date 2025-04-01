"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the types for our report data
export interface PatientData {
  name: string
  uhid: string
  age: string
  gender: string
  dob: string
  abhaId: string
  height: string
  weight: string
  address: string
  referringDoctor: string
  department: string
  clinicalIndication: string
  lastEpisode: string
  episodeFrequency: string
  currentMedications: string[]
  medicationFrequency: string
  patientHistory: string
  recentCTScan: string
  ctScanResult: string
  ctScanComment: string
  recentMRIScan: string
  mriScanResult: string
  mriScanComment: string
}

export interface EEGFindingsData {
  backgroundActivity: {
    eegElements: string[]
    otherElements: string
    amplitude: string
    symmetry: string
    reactivity: string
  }
  sleepAndDrowsiness: {
    sleepStages: string[]
    sleepCharacteristics: string[]
    sleepAbnormalities: string[]
  }
  interictalFindings: {
    abnormalPatterns: Array<{
      type: string
      subtype: string
      rhythmic: string
      periodic: string
      prevalence: string
    }>
    eegArtifacts: {
      biological: string[]
      nonBiological: string[]
    }
  }
}

export interface SeizureFindingsData {
  seizures: Array<{
    classification: string
    subtype: string
    duration: string
    clinicalSigns: string[]
    eegPattern: string[]
    postictalSigns: string[]
  }>
}

export interface AnnotationsData {
  annotations: Array<{
    timestamp: string
    description: string
    imageUrl?: string
  }>
}

export interface AdditionalNotesData {
  notes: string
  recommendations: string
}

export interface SignatureData {
  doctorName: string
  designation: string
  date: string
  signature: string
}

export interface ReportData {
  reportId: string
  patient: PatientData
  eegFindings: EEGFindingsData
  seizureFindings: SeizureFindingsData
  annotations: AnnotationsData
  additionalNotes: AdditionalNotesData
  signature: SignatureData
}

// Default values for the report data
const defaultReportData: ReportData = {
  reportId: "",
  patient: {
    name: "John Doe",
    uhid: "UHID12345",
    age: "45",
    gender: "Male",
    dob: "1980-05-15",
    abhaId: "ABHA98765",
    height: "175",
    weight: "70",
    address: "123 Medical Lane, Healthcare City",
    referringDoctor: "Dr. Sarah Johnson",
    department: "Neurology",
    clinicalIndication: "Seizures",
    lastEpisode: "<1 month",
    episodeFrequency: "<1 month",
    currentMedications: ["Midazolam"],
    medicationFrequency: "Daily",
    patientHistory: "Patient has a history of epilepsy for the past 5 years.",
    recentCTScan: "Yes",
    ctScanResult: "Normal",
    ctScanComment: "",
    recentMRIScan: "Yes",
    mriScanResult: "Normal",
    mriScanComment: "",
  },
  eegFindings: {
    backgroundActivity: {
      eegElements: ["Posterior Dominant Rhythm (PDR)", "Alpha Rhythm"],
      otherElements: "",
      amplitude: "Medium",
      symmetry: "Symmetric",
      reactivity: "Yes",
    },
    sleepAndDrowsiness: {
      sleepStages: ["NREM 2"],
      sleepCharacteristics: ["Sleep Spindle", "K-Complexes"],
      sleepAbnormalities: [],
    },
    interictalFindings: {
      abnormalPatterns: [
        {
          type: "Epileptiform Discharges",
          subtype: "Spikes",
          rhythmic: "Generalised",
          periodic: "",
          prevalence: "Occasional (1-9%)",
        },
      ],
      eegArtifacts: {
        biological: ["Eye Movement"],
        nonBiological: ["50/60 Hz Electrical Interference"],
      },
    },
  },
  seizureFindings: {
    seizures: [
      {
        classification: "Generalised Onset",
        subtype: "Tonic Clonic",
        duration: "<30 sec",
        clinicalSigns: ["Motor Symptoms"],
        eegPattern: ["Polyspikes"],
        postictalSigns: ["Confusion"],
      },
    ],
  },
  annotations: {
    annotations: [
      {
        timestamp: "00:05:23",
        description: "Spike and wave discharges observed",
        imageUrl: "",
      },
    ],
  },
  additionalNotes: {
    notes: "The EEG shows abnormal activity consistent with epilepsy.",
    recommendations: "Continue current medication regimen. Follow up in 3 months.",
  },
  signature: {
    doctorName: "Dr. Sarah Johnson",
    designation: "Neurologist",
    date: "2025-04-01",
    signature: "",
  },
}

// Create the context
interface ReportContextType {
  reportData: ReportData
  updatePatientData: (data: Partial<PatientData>) => void
  updateEEGFindingsData: (data: Partial<EEGFindingsData>) => void
  updateSeizureFindingsData: (data: Partial<SeizureFindingsData>) => void
  updateAnnotationsData: (data: Partial<AnnotationsData>) => void
  updateAdditionalNotesData: (data: Partial<AdditionalNotesData>) => void
  updateSignatureData: (data: Partial<SignatureData>) => void
}

const ReportContext = createContext<ReportContextType | undefined>(undefined)

// Create a provider component
export function ReportProvider({
  children,
  reportId,
}: {
  children: ReactNode
  reportId: string
}) {
  const [reportData, setReportData] = useState<ReportData>({
    ...defaultReportData,
    reportId,
  })

  const updatePatientData = (data: Partial<PatientData>) => {
    setReportData((prev) => ({
      ...prev,
      patient: { ...prev.patient, ...data },
    }))
  }

  const updateEEGFindingsData = (data: Partial<EEGFindingsData>) => {
    setReportData((prev) => ({
      ...prev,
      eegFindings: { ...prev.eegFindings, ...data },
    }))
  }

  const updateSeizureFindingsData = (data: Partial<SeizureFindingsData>) => {
    setReportData((prev) => ({
      ...prev,
      seizureFindings: { ...prev.seizureFindings, ...data },
    }))
  }

  const updateAnnotationsData = (data: Partial<AnnotationsData>) => {
    setReportData((prev) => ({
      ...prev,
      annotations: { ...prev.annotations, ...data },
    }))
  }

  const updateAdditionalNotesData = (data: Partial<AdditionalNotesData>) => {
    setReportData((prev) => ({
      ...prev,
      additionalNotes: { ...prev.additionalNotes, ...data },
    }))
  }

  const updateSignatureData = (data: Partial<SignatureData>) => {
    setReportData((prev) => ({
      ...prev,
      signature: { ...prev.signature, ...data },
    }))
  }

  return (
    <ReportContext.Provider
      value={{
        reportData,
        updatePatientData,
        updateEEGFindingsData,
        updateSeizureFindingsData,
        updateAnnotationsData,
        updateAdditionalNotesData,
        updateSignatureData,
      }}
    >
      {children}
    </ReportContext.Provider>
  )
}

// Create a hook to use the context
export function useReport() {
  const context = useContext(ReportContext)
  if (context === undefined) {
    throw new Error("useReport must be used within a ReportProvider")
  }
  return context
}

