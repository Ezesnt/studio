
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

const turnos = [
  { usuario: "Juan Pérez", estado: "Pendiente", fecha: "2025-08-01" },
  { usuario: "María Gómez", estado: "Confirmado", fecha: "2025-08-05" },
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

export default function TurnosSection() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🕒 Turnos</h1>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Buscar turno por usuario, fecha, estado..."
            className="flex-grow"
          />
          <CollapsibleTrigger asChild>
            <Button variant="outline">
              Filtrar
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <Card className="mb-4">
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

      <Card>
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
            {turnos.map((turno) => (
              <TableRow key={turno.usuario}>
                <TableCell>{turno.usuario}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(turno.estado)} className={turno.estado === 'Confirmado' ? 'bg-green-600' : ''}>{turno.estado}</Badge>
                </TableCell>
                <TableCell>{turno.fecha}</TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  {turno.estado === "Pendiente" && (
                    <>
                      <Button size="sm">Confirmar</Button>
                      <Button size="sm" variant="destructive">Cancelar</Button>
                    </>
                  )}
                  {turno.estado === "Confirmado" && (
                    <Button size="sm" variant="destructive">Cancelar</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
