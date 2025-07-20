"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const adopciones = [
  { name: "Rex", species: "Perro", age: "3 años", status: "Disponible" },
  { name: "Luna", species: "Gato", age: "1 año", status: "Adoptado" },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Disponible":
      return "default"
    case "Adoptado":
      return "secondary"
    default:
      return "outline"
  }
}

export default function AdopcionesSection() {
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🏡 Adopciones</h1>
      <p className="text-muted-foreground">Listado de animales en adopción. Puedes publicar, editar o eliminar publicaciones.</p>

      <div className="flex justify-start">
        <Button>Agregar Adopción</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Especie</TableHead>
              <TableHead>Edad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adopciones.map((adopcion) => (
              <TableRow key={adopcion.name}>
                <TableCell>{adopcion.name}</TableCell>
                <TableCell>{adopcion.species}</TableCell>
                <TableCell>{adopcion.age}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(adopcion.status)} className={adopcion.status === 'Disponible' ? 'bg-green-600' : ''}>{adopcion.status}</Badge>
                </TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">Editar</Button>
                  <Button size="sm" variant="destructive">Eliminar</Button>
                  {adopcion.status === "Disponible" ? (
                    <Button size="sm">Publicar</Button>
                  ) : (
                    <Button size="sm" variant="secondary" disabled>Publicado</Button>
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
