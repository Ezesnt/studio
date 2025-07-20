"use client"

import React, { useState, type ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app/app-sidebar"
import DashboardSection from "@/components/sections/dashboard"
import AnimalesSection from "@/components/sections/animales"
import UsuariosSection from "@/components/sections/usuarios"
import DenunciasSection from "@/components/sections/denuncias"
import TurnosSection from "@/components/sections/turnos"
import AdopcionesSection from "@/components/sections/adopciones"
import ReportesSection from "@/components/sections/reportes"
import NotificacionesSection from "@/components/sections/notificaciones"
import MapaSection from "@/components/sections/mapa"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderSection = (): ReactNode => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />
      case "animales":
        return <AnimalesSection />
      case "usuarios":
        return <UsuariosSection />
      case "denuncias":
        return <DenunciasSection />
      case "turnos":
        return <TurnosSection />
      case "adopciones":
        return <AdopcionesSection />
      case "reportes":
        return <ReportesSection />
      case "notificaciones":
        return <NotificacionesSection />
      case "mapa-interactivo":
        return <MapaSection />
      default:
        return <DashboardSection />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-secondary">
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1 flex-col bg-background rounded-l-2xl shadow-2xl">
          <div className="p-6 lg:p-8 h-full overflow-y-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
