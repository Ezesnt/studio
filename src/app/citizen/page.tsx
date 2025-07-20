
"use client"

import React, { useState, type ReactNode } from "react"
import { Moon, Sun, User, LogOut, Bell, PanelLeft, Dog, Clock, Siren, Home } from "lucide-react"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { CitizenSidebar } from "@/components/app/citizen-sidebar"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DynamicForm, type FormConfig } from "@/components/forms/dynamic-form"
import { formMappings } from "@/lib/forms-mapping"

// Placeholder sections for citizen
function MisAnimalesSection() {
  return (
    <div>
      <h1 className="flex items-center gap-3"><Dog /> Mis Animales</h1>
      <p className="text-muted-foreground mt-2">Aquí verás la lista de tus animales registrados.</p>
      {/* TODO: Implement animal list for citizens */}
    </div>
  )
}

function MisTurnosSection() {
  return (
    <div>
      <h1 className="flex items-center gap-3"><Clock /> Mis Turnos</h1>
      <p className="text-muted-foreground mt-2">Aquí verás tus turnos solicitados y confirmados.</p>
      {/* TODO: Implement appointments list for citizens */}
    </div>
  )
}

function RealizarDenunciaSection() {
  const [activeForm, setActiveForm] = React.useState<FormConfig | null>(null);

  const handleFormOpen = (formId: string) => {
    // This is a placeholder, we need a specific form for creating complaints from citizens
    const formConfig = {
      id: "createComplaintForm",
      title: "Realizar una Denuncia",
      fields: [
        { name: "tipo", label: "Tipo de Denuncia", type: "select", options: [{value: "maltrato", text: "Maltrato"}, {value: "abandono", text: "Abandono"}], required: true },
        { name: "ubicacion", label: "Ubicación del Hecho", type: "text", placeholder: "Ej: Calle Falsa 123", required: true },
        { name: "descripcion", label: "Descripción", type: "textarea", placeholder: "Describe lo que viste...", required: true },
        { name: "foto", label: "Adjuntar Foto (Opcional)", type: "file" },
      ]
    };
    setActiveForm(formConfig)
  }

  const handleCloseForm = () => {
    setActiveForm(null)
  }

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3"><Siren /> Realizar Denuncia</h1>
      <Card>
        <CardHeader>
          <CardTitle>Nueva Denuncia</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Si has presenciado un caso de maltrato o abandono animal, por favor, repórtalo aquí.</p>
          <Button onClick={() => handleFormOpen('createComplaintForm')}>Crear Denuncia</Button>
        </CardContent>
      </Card>
      <DynamicForm 
        formConfig={activeForm}
        isOpen={!!activeForm}
        onClose={handleCloseForm}
      />
    </div>
  )
}


function AdopcionesDisponiblesSection() {
  return (
    <div>
      <h1 className="flex items-center gap-3"><Home /> Adopciones Disponibles</h1>
      <p className="text-muted-foreground mt-2">Aquí verás los animales que esperan un hogar.</p>
      {/* TODO: Implement adoptions list for citizens */}
    </div>
  )
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
        <Button variant="ghost" size="icon" className="rounded-full">
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


export default function CitizenPage() {
  const [activeSection, setActiveSection] = useState("mis-animales")
  const [isDarkMode, setIsDarkMode] = useState(true)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
    document.documentElement.classList.toggle("light", !isDarkMode)
  }, [isDarkMode])

  const renderSection = (): ReactNode => {
    switch (activeSection) {
      case "mis-animales":
        return <MisAnimalesSection />
      case "mis-turnos":
        return <MisTurnosSection />
      case "realizar-denuncia":
        return <RealizarDenunciaSection />
      case "adopciones":
        return <AdopcionesDisponiblesSection />
      default:
        return <MisAnimalesSection />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-secondary">
        <CitizenSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1 flex flex-col bg-background md:rounded-l-2xl md:shadow-2xl">
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onNavigate={setActiveSection} />
          <div className="flex-1 p-4 md:p-6 lg:p-8 h-full overflow-y-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
