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
import { Card, CardContent } from "@/components/ui/card"
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

const denuncias = [
  { id: "456", denunciante: "Pedro Díaz", ubicacion: "Centro", estado: "Pendiente", descripcion: "Perro en mal estado en la calle principal.", tipo: "maltrato" },
  { id: "457", denunciante: "Ana Ruiz", ubicacion: "Sur", estado: "Resuelto", descripcion: "Gato abandonado en un parque.", tipo: "abandono" },
  { id: "458", denunciante: "Maria Lopez", ubicacion: "Norte", estado: "En Proceso", descripcion: "Venta ilegal de animales exóticos.", tipo: "venta_ilegal" },
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

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🚨 Denuncias</h1>
      
      <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-grow">
            <Input 
              type="text" 
              placeholder="Buscar por denunciante..." 
              className="flex-grow" 
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline">
                  Filtrar
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="absolute mt-2 z-10">
                  <CardContent className="pt-6">
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <div className="col-span-1 md:col-start-3 self-end">
                          <Button type="submit" className="w-full">
                            Aplicar filtro
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
      </div>

      <Card>
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
                  <Button size="sm" variant="ghost">Archivos</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
       <DynamicForm 
        formConfig={activeForm}
        isOpen={!!activeForm}
        onClose={handleCloseForm}
        item={selectedItem}
      />
    </div>
  )
}
