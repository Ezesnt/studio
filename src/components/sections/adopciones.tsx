
"use client"

import React, { useState } from "react"
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
import { DynamicForm, type FormConfig } from "@/components/forms/dynamic-form"
import { formMappings } from "@/lib/forms-mapping"

const adopciones = [
  { id: 1, name: "Rex", species: "Perro", age: "3 años", status: "Disponible", detalle: "Amigable y juguetón", url: "" },
  { id: 2, name: "Luna", species: "Gato", age: "1 año", status: "Adoptado", detalle: "Le gusta dormir mucho", url: "" },
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
  const [activeForm, setActiveForm] = useState<FormConfig | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const handleFormOpen = (formId: string, item?: any) => {
    let formConfig;
    if (formId === 'createAdoptionForm') {
      formConfig = formMappings.animales.forms.find(f => f.id === 'createAnimalForm');
      if (formConfig) {
        formConfig = {...formConfig, title: "Publicar Animal para Adopción" }
      }
    } else if (formId === 'assignOwnerForm') {
      // Find the form in the animales section since it's shared
      formConfig = formMappings.animales.forms.find(f => f.id === formId);
    } else {
      formConfig = formMappings.adopciones.forms.find(f => f.id === formId)
    }
    
    if (formConfig) {
      setActiveForm(formConfig)
      setSelectedItem(item)
    }
  }

  const handleCloseForm = () => {
    setActiveForm(null)
    setSelectedItem(null)
  }

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🏡 Adopciones</h1>
      <p className="text-muted-foreground">Listado de animales en adopción. Puedes publicar, editar o eliminar publicaciones.</p>

      <div className="flex justify-start">
        <Button onClick={() => handleFormOpen('createAdoptionForm')}>Agregar Adopción</Button>
      </div>

      <Card>
        <div className="relative w-full overflow-auto">
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
                <TableRow key={adopcion.id}>
                  <TableCell>{adopcion.name}</TableCell>
                  <TableCell>{adopcion.species}</TableCell>
                  <TableCell>{adopcion.age}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(adopcion.status)} className={adopcion.status === 'Disponible' ? 'bg-green-600' : ''}>{adopcion.status}</Badge>
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleFormOpen('editAdoptionForm', adopcion)}>Editar</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleFormOpen('endAdoptionForm', adopcion)}>Eliminar</Button>
                     {adopcion.status === 'Disponible' && (
                        <Button size="sm" variant="ghost" onClick={() => handleFormOpen('assignOwnerForm', adopcion)}>Asignar Propietario</Button>
                     )}
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
