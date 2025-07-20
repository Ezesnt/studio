
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DynamicForm, type FormConfig } from "@/components/forms/dynamic-form"
import { formMappings } from "@/lib/forms-mapping"
import { useIsMobile } from "@/hooks/use-mobile"

const denuncias = [
  { id: "456", denunciante: "Pedro Díaz", ubicacion: "Centro", estado: "Pendiente", descripcion: "Perro en mal estado en la calle principal.", tipo: "maltrato", archivos: [
        {
            "id": 1,
            "id_denuncia": 1,
            "nombre_archivo": "denuncias/2/1/foto_perro_maltratado.jpg",
            "ruta_archivo": "https://placehold.co/600x400.png"
        },
        {
            "id": 2,
            "id_denuncia": 1,
            "nombre_archivo": "denuncias/2/1/reporte_veterinario.pdf",
            "ruta_archivo": "https://placehold.co/600x400.png"
        }
    ],
    barrio: "Centro",
    fecha: "2025-07-18T06:39:31.261229",
    tipo_denuncia: "maltrato_animal",
  },
  { id: "457", denunciante: "Ana Ruiz", ubicacion: "Sur", estado: "Resuelto", descripcion: "Gato abandonado en un parque.", tipo: "abandono", archivos: [], tipo_denuncia: "abandono", fecha: "2025-07-19T08:00:00" },
  { id: "458", denunciante: "Maria Lopez", ubicacion: "Norte", estado: "En Proceso", descripcion: "Venta ilegal de animales exóticos.", tipo: "venta_ilegal", archivos: [], tipo_denuncia: "venta_ilegal", fecha: "2025-07-20T12:30:00" },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Pendiente":
      return "destructive"
    case "Resuelto":
      return "default"
    default:
      return "secondary"
  }
}

interface DenunciasSectionProps {
  initialFilter?: {
    type: 'denunciante';
    value: any;
  }
}

export default function DenunciasSection({ initialFilter }: DenunciasSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeForm, setActiveForm] = useState<FormConfig | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [filterText, setFilterText] = useState(initialFilter?.type === 'denunciante' ? initialFilter.value : '')
  const isMobile = useIsMobile();

  const handleFormOpen = (formId: string, item?: any) => {
    const formConfig = formMappings.denuncias.forms.find(f => f.id === formId)
    if (formConfig) {
      setActiveForm(formConfig)
      setSelectedItem(item)
    }
  }

  const handleCloseForm = () => {
    setActiveForm(null)
    setSelectedItem(null)
  }

  const filteredDenuncias = denuncias.filter(denuncia => 
    denuncia.denunciante.toLowerCase().includes(filterText.toLowerCase())
  )

  const renderMobileDenuncias = () => (
    <div className="space-y-4">
        {filteredDenuncias.map((denuncia) => (
          <Card key={denuncia.id}>
            <CardHeader>
                <CardTitle>ID: {denuncia.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Denunciante</span>
                  <span>{denuncia.denunciante}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ubicación</span>
                  <span>{denuncia.ubicacion}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Estado</span>
                  <Badge variant={getStatusVariant(denuncia.estado)} className={denuncia.estado === 'Resuelto' ? 'bg-green-600' : ''}>{denuncia.estado}</Badge>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleFormOpen('viewComplaintDetailsForm', denuncia)}>Detalle</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleFormOpen('changeComplaintStatusForm', denuncia)}>Cambiar Estado</Button>
                </div>
            </CardContent>
          </Card>
        ))}
     </div>
  );

  const renderDesktopDenuncias = () => (
    <Card>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Denunciante</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDenuncias.map((denuncia) => (
              <TableRow key={denuncia.id}>
                <TableCell>{denuncia.id}</TableCell>
                <TableCell>{denuncia.denunciante}</TableCell>
                <TableCell>{denuncia.ubicacion}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(denuncia.estado)} className={denuncia.estado === 'Resuelto' ? 'bg-green-600' : ''}>{denuncia.estado}</Badge>
                </TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleFormOpen('viewComplaintDetailsForm', denuncia)}>Detalle</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleFormOpen('changeComplaintStatusForm', denuncia)}>Cambiar Estado</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🚨 Denuncias</h1>
      
      <div className="flex flex-col md:flex-row gap-2">
            <Input 
              type="text" 
              placeholder="Buscar por denunciante..." 
              className="flex-grow" 
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  Filtrar
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="absolute mt-2 z-10 w-full md:w-auto">
                  <form className="p-4 space-y-4">
                      <div>
                        <Label htmlFor="filtroEstadoDenuncia">Estado</Label>
                        <Select>
                          <SelectTrigger id="filtroEstadoDenuncia">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="resuelto">Resuelto</SelectItem>
                            <SelectItem value="en_proceso">En proceso</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full">
                        Aplicar filtro
                      </Button>
                  </form>
                </Card>
              </CollapsibleContent>
            </Collapsible>
      </div>

      {isMobile ? renderMobileDenuncias() : renderDesktopDenuncias()}

       <DynamicForm 
        formConfig={activeForm}
        isOpen={!!activeForm}
        onClose={handleCloseForm}
        item={selectedItem}
      />
    </div>
  )
}

    
