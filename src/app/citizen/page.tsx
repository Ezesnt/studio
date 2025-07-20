
"use client"

import React, { useState, type ReactNode } from "react"
import Image from "next/image"
import { Moon, Sun, User, LogOut, Bell, PanelLeft, Dog, Clock, Siren, UserCog, Home, CheckCircle, ShieldCheck, Syringe, Heart, Calendar, Link as LinkIcon, Info } from "lucide-react"
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DynamicForm, type FormConfig } from "@/components/forms/dynamic-form"
import { formMappings } from "@/lib/forms-mapping"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FaqBot } from "@/components/app/faq-bot"
import { citizenFaqs } from "@/lib/faq-data"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

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
  { id: 1, name: "Firulais", species: "Perro", age: "5 años", historial_clinico: [{fecha: "2025-06-20", tipo: "Consulta", descripcion: "Control anual"}, {fecha: "2025-01-15", tipo: "Vacuna", descripcion: "Vacuna antirrábica"}], patentado: true, fecha_vencimiento_patente: "2026-07-20" },
  { id: 2, name: "Mishi", species: "Gato", age: "3 años", historial_clinico: [{fecha: "2024-09-01", tipo: "Vacuna", descripcion: "Vacuna antirrábica"}], patentado: false, fecha_vencimiento_patente: null }
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
const adopciones = [
    {
        id: 1,
        nombre: "Rex",
        especie: "Perro",
        raza: "Labrador",
        edad: "3 años",
        sexo: "Macho",
        color: "Dorado",
        tamanio: "Grande",
        observaciones: "Le encanta jugar a la pelota y es muy bueno con los niños.",
        detalle: "Se entrega vacunado y desparasitado. Busca un hogar con patio.",
        url_contacto: "https://facebook.com/adoptaunrex",
        fecha_publicacion: "2025-07-20",
        fotos: [
            { "url": "https://placehold.co/600x400.png", "hint": "dog playing" },
            { "url": "https://placehold.co/600x400.png", "hint": "happy dog" },
        ]
    },
    {
        id: 2,
        nombre: "Luna",
        especie: "Gato",
        raza: "Siamés",
        edad: "1 año",
        sexo: "Hembra",
        color: "Blanco y Crema",
        tamanio: "Pequeño",
        observaciones: "Es muy tranquila y le gusta dormir en el sol.",
        detalle: "Ideal para departamento. Es muy cariñosa una vez que entra en confianza.",
        url_contacto: "https://facebook.com/adoptaunaluna",
        fecha_publicacion: "2025-07-18",
        fotos: [
             { "url": "https://placehold.co/600x400.png", "hint": "cat sleeping" },
        ]
    },
]
const getStatusVariant = (status: string) => {
  switch (status) {
    case "Disponible":
      return "default"
    case "Adoptado":
      return "secondary"
    case 'Resuelta':
      return "default"
    case 'Pendiente':
      return "destructive"
    case 'Confirmado':
        return 'default'
    default:
      return "outline"
  }
}

const infoData = [
  {
    title: "Plan de Vacunación en Cachorros Caninos",
    icon: Syringe,
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "Cachorro recibiendo vacuna",
      hint: "puppy vaccine"
    },
    description: [
      "La vacunación preventiva ayuda a proteger a tu cachorro perruno de muchas enfermedades mortales.",
      "A partir de los 45 días de vida, debe empezar su plan de vacunación.",
      "Consta de 3 dosis de vacuna quíntuple (Distemper (moquillo), Parvovirosis, Leptospirosis, Parainfluenza, Adenovirus). Una dosis cada 3 semanas. Y al finalizar este plan se recomienda aplicar la vacuna antirrábica.",
      "¡No lo lleves a la calle, plaza, playa, etc, hasta no tener su plan de vacunación COMPLETO!"
    ]
  },
  {
    title: "La Rabia",
    icon: ShieldCheck,
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "Veterinario aplicando vacuna antirrábica",
      hint: "dog rabies vaccine"
    },
    description: [
      "LA RABIA es una enfermedad mortal que se transmite de los animales al humano por mordeduras o arañazos.",
      "La forma de contagio es principalmente a través de los murciélagos a felinos y canes.",
      "Para evitar el contagio vacuna anualmente a tus animales de compañía de más de 3 meses de edad.",
      "Es obligatorio por Ley Nac. Nº22.953.",
      "Consultá donde estamos vacunando cada semana en nuestras redes sociales."
    ]
  },
  {
    title: "Plan de Vacunación en Adultos Caninos",
    icon: Syringe,
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "Perro adulto siendo vacunado",
      hint: "adult dog vaccine"
    },
    description: [
      "La vacunación preventiva ayuda a proteger a tu perro adulto de muchas enfermedades mortales.",
      "Se debe vacunar con 1 dosis de vacuna séxtuple (moquillo, coronavirus, leptospirosis, parainfluenza, tos de la perrera y hepatitis) y 1 dosis de vacuna antirrábica.",
      "Estas vacunas se renuevan todos los años, durante toda la vida del animal.",
      "La vacunación ayuda a PREVENIR. Recordá mirar periódicamente el carnet de vacuna de tu perro."
    ]
  }
];

function InfoDashboardSection() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard de Información</h1>
      <p className="text-muted-foreground">
        Bienvenido a tu portal de ciudadano. Aquí encontrarás información importante para el cuidado de tus animales de compañía.
      </p>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
        {infoData.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-3">
                    <item.icon className="h-6 w-6 text-primary" />
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2 text-muted-foreground">
                  {item.description.map((p, i) => <p key={i}>{p}</p>)}
                </CardContent>
              </div>
              <div className="flex items-center justify-center bg-muted">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint={item.image.hint}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


function ProfileSection({ onFormOpen }: { onFormOpen: (formId: string, item: any) => void }) {
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3 text-3xl font-bold"><UserCog /> Mis Datos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>Revisa y actualiza tus datos personales.</CardDescription>
        </CardHeader>
        <CardContent className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div><p className="font-semibold">Nombre:</p> <p className="text-muted-foreground">{userInfo.nombre}</p></div>
          <div><p className="font-semibold">Apellido:</p> <p className="text-muted-foreground">{userInfo.apellido}</p></div>
          <div><p className="font-semibold">DNI:</p> <p className="text-muted-foreground">{userInfo.dni}</p></div>
          <div><p className="font-semibold">Email:</p> <p className="text-muted-foreground">{userInfo.email}</p></div>
          <div><p className="font-semibold">Domicilio:</p> <p className="text-muted-foreground">{userInfo.domicilio}</p></div>
          <div><p className="font-semibold">Teléfono:</p> <p className="text-muted-foreground">{userInfo.telefono}</p></div>
          <div><p className="font-semibold">Barrio:</p> <p className="text-muted-foreground">{userInfo.barrio}</p></div>
        </CardContent>
         <CardContent>
           <Button onClick={() => onFormOpen('editCitizenUserForm', userInfo)}>Editar Información</Button>
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
    animal.name.toLowerCase().includes(filterText.toLowerCase()) ||
    animal.species.toLowerCase().includes(filterText.toLowerCase())
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
                <TableHead>Patente</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnimals.map(animal => (
                <TableRow key={animal.id}>
                  <TableCell>{animal.name}</TableCell>
                  <TableCell>{animal.species}</TableCell>
                  <TableCell>{animal.age}</TableCell>
                  <TableCell>
                    {animal.patentado ? (
                       <Badge variant="default" className="bg-green-600">
                        Patentado (Vence: {animal.fecha_vencimiento_patente})
                       </Badge>
                    ) : (
                      <Badge variant="secondary">No Patentado</Badge>
                    )}
                  </TableCell>
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

function AdopcionesSection({ onFormOpen }: { onFormOpen: (formId: string, item?: any) => void }) {
  const [filterText, setFilterText] = useState("");
  const filteredAdoptions = adopciones.filter(adopcion =>
      adopcion.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      adopcion.especie.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleContact = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
      <div className="space-y-6">
          <h1 className="flex items-center gap-3"><Heart /> Adopciones</h1>
          <p className="text-muted-foreground">Explora los animales disponibles para adopción. ¡Podrías encontrar a tu próximo mejor amigo!</p>
          <div className="flex flex-col md:flex-row gap-2">
              <Input
                  placeholder="Buscar por nombre o especie..."
                  className="flex-grow"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
              />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAdoptions.map((adopcion) => (
                  <Card key={adopcion.id} className="overflow-hidden flex flex-col">
                      <div className="relative">
                          <Image
                              src={adopcion.fotos[0].url}
                              alt={`Foto de ${adopcion.nombre}`}
                              width={400}
                              height={300}
                              className="object-cover w-full h-48"
                              data-ai-hint={adopcion.fotos[0].hint}
                          />
                      </div>
                      <CardHeader>
                          <CardTitle>{adopcion.nombre}</CardTitle>
                          <CardDescription>{adopcion.especie} - {adopcion.edad}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                          <p className="text-muted-foreground line-clamp-2">{adopcion.detalle}</p>
                      </CardContent>
                      <CardContent className="flex flex-col sm:flex-row gap-2">
                         <Button className="w-full" variant="outline" onClick={() => onFormOpen('viewAdoptionDetailsForm', adopcion)}>
                            <Info className="mr-2" /> Ver Detalle
                         </Button>
                         <Button className="w-full" onClick={() => handleContact(adopcion.url_contacto)}>
                           <LinkIcon className="mr-2" /> Contactar
                         </Button>
                      </CardContent>
                  </Card>
              ))}
          </div>
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
            <DropdownMenuItem onClick={() => onNavigate('perfil')}>
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
      ...formMappings.adopciones.forms,
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
        return <InfoDashboardSection />
      case "perfil":
        return <ProfileSection onFormOpen={handleFormOpen} />
      case "preturnos":
        return <PreturnosSection onFormOpen={handleFormOpen} />
      case "animales":
        return <MisAnimalesSection onFormOpen={handleFormOpen} />
      case "denuncias":
        return <DenunciasSection onFormOpen={handleFormOpen} />
      case "adopciones":
        return <AdopcionesSection onFormOpen={handleFormOpen} />
      case "notificaciones":
        return <NotificacionesSection />
      default:
        return <InfoDashboardSection />
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

    