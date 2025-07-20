
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

const denuncias = [
  { id: "456", denunciante: "Pedro Díaz", ubicacion: "Centro", estado: "Pendiente" },
  { id: "457", denunciante: "Ana Ruiz", ubicacion: "Sur", estado: "Resuelto" },
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

export default function DenunciasSection() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🚨 Denuncias</h1>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex gap-2">
          <Input type="text" placeholder="Buscar denuncia..." className="flex-grow" />
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
            {denuncias.map((denuncia) => (
              <TableRow key={denuncia.id}>
                <TableCell>{denuncia.id}</TableCell>
                <TableCell>{denuncia.denunciante}</TableCell>
                <TableCell>{denuncia.ubicacion}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(denuncia.estado)} className={denuncia.estado === 'Resuelto' ? 'bg-green-600' : ''}>{denuncia.estado}</Badge>
                </TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">Detalle</Button>
                  <Button size="sm" variant="secondary">Cambiar Estado</Button>
                  <Button size="sm" variant="ghost">Archivos</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
