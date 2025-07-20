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

const turnos = [
  { id: 1, usuario: "Juan Pérez", estado: "Pendiente", fecha: "2025-08-01" },
  { id: 2, usuario: "María Gómez", estado: "Confirmado", fecha: "2025-08-05" },
  { id: 3, usuario: "Maria Lopez", estado: "Cancelado", fecha: "2025-07-20" },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Pendiente":
      return "destructive"
    case "Confirmado":
      return "default"
    case "Cancelado":
      return "secondary"
    default:
      return "secondary"
  }
}

interface TurnosSectionProps {
  initialFilter?: {
    type: 'usuario';
    value: any;
  }
}

export default function TurnosSection({ initialFilter }: TurnosSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeForm, setActiveForm] = useState<FormConfig | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [filterText, setFilterText] = useState(initialFilter?.type === 'usuario' ? initialFilter.value : '')

  const handleFormOpen = (formId: string, item?: any) => {
    const formConfig = formMappings.turnos.forms.find(f => f.id === formId)
    if (formConfig) {
      setActiveForm(formConfig)
      setSelectedItem(item)
    }
  }

  const handleCloseForm = () => {
    setActiveForm(null)
    setSelectedItem(null)
  }

  const filteredTurnos = turnos.filter(turno => 
    turno.usuario.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🕒 Turnos</h1>

      <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            placeholder="Buscar turno por usuario..."
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
              <Card className="absolute mt-2 z-10">
                <CardContent className="pt-6">
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="filtroEstadoTurno">Estado</Label>
                        <Select>
                          <SelectTrigger id="filtroEstadoTurno">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="confirmado">Confirmado</SelectItem>
                            <SelectItem value="cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="filtroFechaTurno">Fecha</Label>
                        <Input type="date" id="filtroFechaTurno" />
                      </div>
                      <div className="self-end">
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

      <Card>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTurnos.map((turno) => (
                <TableRow key={turno.id}>
                  <TableCell>{turno.usuario}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(turno.estado)} className={turno.estado === 'Confirmado' ? 'bg-green-600' : ''}>{turno.estado}</Badge>
                  </TableCell>
                  <TableCell>{turno.fecha}</TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    {turno.estado === "Pendiente" && (
                      <>
                        <Button size="sm" onClick={() => handleFormOpen('confirmAppointmentForm', turno)}>Confirmar</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleFormOpen('cancelAppointmentForm', turno)}>Cancelar</Button>
                      </>
                    )}
                    {turno.estado === "Confirmado" && (
                      <Button size="sm" variant="destructive" onClick={() => handleFormOpen('cancelAppointmentForm', turno)}>Cancelar</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
