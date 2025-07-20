
"use client"

import React, { useState, type ReactNode } from "react"
import { Moon, Sun, User, LogOut, Bell, PanelLeft, Dog, Clock, Siren, UserCog } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FaqBot } from "@/components/app/faq-bot"
import { citizenFaqs } from "@/lib/faq-data"

const userInfo = {
    "activo": true,
    "nombre": "Matias",
    "apellido": "Santillan",
    "categoria": "admin",
    "dni": "88554321",
    "domicilio": "Calle Falsa 123",
    "email": "matias@gmail.com",
    "fecha_registro": "2025-07-13T02:20:29.450823",
    "id": 1,
    "telefono": "1122334455",
    "barrio": "centro"
};

const preturnos = [
  { id: 101, estado: "Pendiente", fechaSolicitada: "2025-08-10" },
  { id: 102, estado: "Confirmado", fechaSolicitada: "2025-08-15", fechaConfirmada: "2025-08-15 10:00", profesional: "Dr. Canino", instrucciones: "Traer al animal en ayunas." }
];
const animales = [
  { id: 1, nombre: "Firulais", especie: "Perro", edad: "5 años", historial_clinico: [{fecha: "2025-06-20", tipo: "Consulta", descripcion: "Control anual"}, {fecha: "2025-01-15", tipo: "Vacuna", descripcion: "Vacuna antirrábica"}] },
  { id: 2, nombre: "Mishi", especie: "Gato", edad: "3 años", historial_clinico: [{fecha: "2024-09-01", tipo: "Vacuna", descripcion: "Vacuna antirrábica"}] }
];
const denuncias = [
  { id: 201, tipo: "maltrato", barrio: "Centro", direccion: "Calle Falsa 123", fecha: "2025-07-10", estado: "Pendiente", descripcion: "Perro callejero agresivo" },
  { id: 202, tipo: "abandono", barrio: "Sur", direccion: "Plaza Principal", fecha: "2025-06-25", estado: "Resuelta", descripcion: "Maltrato animal reportado" }
];
const notificaciones = [
  "Recordatorio: Patente a vencer para Firulais (Perro)",
  "Turno confirmado para el 2025-08-15",
  "Vacunas próximas a vencer para Mishi (Gato)",
  "Nueva denuncia recibida en barrio Centro"
];

function DashboardSection({ onFormOpen }: { onFormOpen: (formId: string, item: any) => void }) {
  return (
    <div className="space-y-4">
      <h1 className="flex items-center gap-3"><UserCog /> Información Personal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Mis Datos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Nombre:</strong> {userInfo.nombre} {userInfo.apellido}</p>
          <p><strong>DNI:</strong> {userInfo.dni}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Domicilio:</strong> {userInfo.domicilio}</p>
          <p><strong>Teléfono:</strong> {userInfo.telefono}</p>
          <p><strong>Barrio:</strong> {userInfo.barrio}</p>
          <Button className="mt-4" onClick={() => onFormOpen('editCitizenUserForm', userInfo)}>Editar Información</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function PreturnosSection({ onFormOpen }: { onFormOpen: (formId: string, item?: any) => void }) {
  const getStatusVariant = (status: string) => status === 'Confirmado' ? 'default' : 'secondary'
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3"><Clock /> Pre-turnos</h1>
      <Button onClick={() => onFormOpen('solicitarPreturnoForm')}>Solicitar Pre-turno</Button>
      <Card>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Solicitada</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {preturnos.map(turno => (
                <TableRow key={turno.id}>
                  <TableCell>{turno.id}</TableCell>
                  <TableCell><Badge variant={getStatusVariant(turno.estado)} className={turno.estado === 'Confirmado' ? 'bg-green-600' : ''}>{turno.estado}</Badge></TableCell>
                  <TableCell>{turno.fechaSolicitada}</TableCell>
                  <TableCell>
                    {turno.estado === 'Confirmado' ? (
                      <Button size="sm" onClick={() => onFormOpen('viewAppointmentDetailsForm', turno)}>Ver detalle</Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>Esperando confirmación</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function MisAnimalesSection({ onFormOpen }: { onFormOpen: (formId: string, item?: any) => void }) {
  const [filterText, setFilterText] = useState("");
  const filteredAnimals = animales.filter(animal =>
    animal.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
    animal.especie.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3"><Dog /> Mis Animales</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <Input 
          placeholder="Buscar animal por nombre o especie..." 
          className="flex-grow" 
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <Button onClick={() => onFormOpen('agregarAnimalForm')}>Agregar Animal</Button>
      <Card>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Especie</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnimals.map(animal => (
                <TableRow key={animal.id}>
                  <TableCell>{animal.nombre}</TableCell>
                  <TableCell>{animal.especie}</TableCell>
                  <TableCell>{animal.edad}</TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => onFormOpen('viewAnimalHealthBookForm', animal)}>Libreta</Button>
                    <Button size="sm" variant="secondary" onClick={() => onFormOpen('viewAnimalDetailsForm', animal)}>Ver detalle</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function DenunciasSection({ onFormOpen }: { onFormOpen: (formId: string, item?: any) => void }) {
  const getStatusVariant = (status: string) => status === 'Resuelta' ? 'default' : 'destructive'
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3"><Siren /> Denuncias</h1>
      <Button onClick={() => onFormOpen('agregarDenunciaForm')}>Agregar Denuncia</Button>
      <Card>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {denuncias.map(d => (
                <TableRow key={d.id}>
                  <TableCell>{d.id}</TableCell>
                  <TableCell>{d.tipo}</TableCell>
                  <TableCell>{d.direccion}</TableCell>
                  <TableCell>{d.fecha}</TableCell>
                  <TableCell><Badge variant={getStatusVariant(d.estado)} className={d.estado === 'Resuelta' ? 'bg-green-600' : ''}>{d.estado}</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => onFormOpen('viewComplaintDetailsForm', d)}>Ver detalle</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function NotificacionesSection() {
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3"><Bell /> Notificaciones</h1>
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {notificaciones.map((notification, index) => (
              <li key={index} className="flex items-center gap-4 p-4">
                <Bell className="h-5 w-5 text-primary" />
                <span className="text-foreground">{notification}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
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
            <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
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
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeForm, setActiveForm] = useState<FormConfig | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
    document.documentElement.classList.toggle("light", !isDarkMode)
  }, [isDarkMode])

  const handleFormOpen = (formId: string, item?: any) => {
    const citizenForms = [
      ...formMappings.usuarios.forms,
      ...formMappings.turnos.forms,
      ...formMappings.animales.forms,
      ...formMappings.denuncias.forms,
    ];
    const formConfig = citizenForms.find(f => f.id === formId);
    if (formConfig) {
      setActiveForm(formConfig);
      setSelectedItem(item);
    }
  };

  const handleCloseForm = () => {
    setActiveForm(null);
    setSelectedItem(null);
  };

  const renderSection = (): ReactNode => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection onFormOpen={handleFormOpen} />
      case "preturnos":
        return <PreturnosSection onFormOpen={handleFormOpen} />
      case "animales":
        return <MisAnimalesSection onFormOpen={handleFormOpen} />
      case "denuncias":
        return <DenunciasSection onFormOpen={handleFormOpen} />
      case "notificaciones":
        return <NotificacionesSection />
      default:
        return <DashboardSection onFormOpen={handleFormOpen} />
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
        <DynamicForm 
          formConfig={activeForm}
          isOpen={!!activeForm}
          onClose={handleCloseForm}
          item={selectedItem}
        />
        <FaqBot faqs={citizenFaqs} />
      </div>
    </SidebarProvider>
  )
}

    
