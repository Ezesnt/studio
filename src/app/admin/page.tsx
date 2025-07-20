
"use client"

import React, { useState, type ReactNode } from "react"
import { Moon, Sun, User, LogOut, Bell, PanelLeft } from "lucide-react"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

type SectionFilter = {
  type: string;
  value: any;
}

function Header({ isDarkMode, setIsDarkMode, onNavigate }) {
  const { toggleSidebar } = useSidebar()
  return (
    <header className="flex h-16 items-center justify-between border-b border-border/80 px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <PanelLeft className="size-5" />
        <span className="sr-only">Abrir menú</span>
      </Button>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onNavigate('notificaciones')}>
          <Bell className="size-5" />
          <span className="sr-only">Ver notificaciones</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="size-5" />
              <span className="sr-only">Abrir menú de usuario</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Ver Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {isDarkMode ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                  <span>Modo {isDarkMode ? "Oscuro" : "Claro"}</span>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  aria-label="Toggle dark mode"
                />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}


export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sectionFilter, setSectionFilter] = useState<SectionFilter | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(true)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
    document.documentElement.classList.toggle("light", !isDarkMode)
  }, [isDarkMode])

  const handleNavigateToSection = (section: string, filter?: SectionFilter) => {
    setSectionFilter(filter);
    setActiveSection(section);
  }

  const renderSection = (): ReactNode => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />
      case "animales":
        return <AnimalesSection initialFilter={sectionFilter} />
      case "usuarios":
        return <UsuariosSection onNavigateToSection={handleNavigateToSection} />
      case "denuncias":
        return <DenunciasSection initialFilter={sectionFilter} />
      case "turnos":
        return <TurnosSection initialFilter={sectionFilter} />
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
          setActiveSection={handleNavigateToSection}
        />
        <main className="flex-1 flex flex-col bg-background md:rounded-l-2xl md:shadow-2xl">
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onNavigate={handleNavigateToSection} />
          <div className="flex-1 p-4 md:p-6 lg:p-8 h-full overflow-y-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
