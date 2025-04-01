"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Activity, Zap, FileText, PenTool, Pencil, Eye } from "lucide-react"

interface ReportTabsProps {
  value: string
  onValueChange: (value: string) => void
}

export function ReportTabs({ value, onValueChange }: ReportTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="grid grid-cols-4 md:grid-cols-7 w-full bg-blue-50">
        <TabsTrigger
          value="patient"
          className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
        >
          <User className="h-4 w-4" />
          <span className="hidden md:inline">Patient</span>
        </TabsTrigger>
        <TabsTrigger
          value="eeg-findings"
          className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
        >
          <Activity className="h-4 w-4" />
          <span className="hidden md:inline">EEG Findings</span>
        </TabsTrigger>
        <TabsTrigger
          value="seizure-findings"
          className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
        >
          <Zap className="h-4 w-4" />
          <span className="hidden md:inline">Seizure Findings</span>
        </TabsTrigger>
        <TabsTrigger
          value="annotations"
          className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
        >
          <FileText className="h-4 w-4" />
          <span className="hidden md:inline">Annotations</span>
        </TabsTrigger>
        <TabsTrigger
          value="additional-notes"
          className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
        >
          <PenTool className="h-4 w-4" />
          <span className="hidden md:inline">Additional Notes</span>
        </TabsTrigger>
        <TabsTrigger
          value="signature"
          className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
        >
          <Pencil className="h-4 w-4" />
          <span className="hidden md:inline">Signature</span>
        </TabsTrigger>
        <TabsTrigger
          value="preview"
          className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
        >
          <Eye className="h-4 w-4" />
          <span className="hidden md:inline">Preview</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

