"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, FileText, Calendar, Settings, Activity, Brain, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "EEG Records",
    href: "/eeg-records",
    icon: Brain,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: Activity,
  },
  {
    title: "Database",
    href: "/database",
    icon: Database,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-gray-50/40 md:block w-64 overflow-y-auto">
      <div className="flex h-full flex-col px-3 py-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start",
                pathname === item.href
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-700"
                  : "hover:bg-gray-100",
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-5 w-5" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

