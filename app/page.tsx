import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { v4 as uuidv4 } from "uuid"
import { User, Clock, Calendar, FileText } from "lucide-react"
import Link from "next/link"

// Dummy patient data
const patients = [
  {
    id: "1",
    name: "John Doe",
    uhid: "UHID12345",
    age: 45,
    gender: "Male",
    dob: "1980-05-15",
    abhaId: "ABHA98765",
    height: "175 cm",
    weight: "70 kg",
    address: "123 Medical Lane, Healthcare City",
    referringDoctor: "Dr. Sarah Johnson",
    department: "Neurology",
    lastVisit: "2025-03-15",
    status: "Scheduled",
  },
  {
    id: "2",
    name: "Jane Smith",
    uhid: "UHID67890",
    age: 32,
    gender: "Female",
    dob: "1993-11-22",
    abhaId: "ABHA54321",
    height: "162 cm",
    weight: "58 kg",
    address: "456 Health Avenue, Medical District",
    referringDoctor: "Dr. Michael Chen",
    department: "Neurology",
    lastVisit: "2025-03-28",
    status: "Completed",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">EEG Reporting Platform</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patients.map((patient) => (
          <Card key={patient.id} className="border-blue-100 shadow-md">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <User className="h-5 w-5" />
                {patient.name}
              </CardTitle>
              <CardDescription>
                UHID: {patient.uhid} | {patient.age} years, {patient.gender}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-500">DOB:</span> {patient.dob}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-500">ABHA ID:</span> {patient.abhaId}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-500">Doctor:</span> {patient.referringDoctor}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-500">Last Visit:</span> {patient.lastVisit}
                </div>
              </div>
              <div className="mt-4 text-sm">
                <span className="text-gray-500">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === "Scheduled" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t border-blue-100">
              <Link href={`/report/${uuidv4()}`} className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate Report</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

