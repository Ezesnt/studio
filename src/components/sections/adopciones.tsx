
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DynamicForm, type FormConfig } from "@/components/forms/dynamic-form"
import { formMappings } from "@/lib/forms-mapping"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useIsMobile } from "@/hooks/use-mobile"

const adopcionesData = [
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
  const [filterText, setFilterText] = useState("")
  const [speciesFilter, setSpeciesFilter] = useState("todas")
  const isMobile = useIsMobile();

  const handleFormOpen = (formId: string, item?: any) => {
    let formConfig;
    if (formId === 'createAdoptionForm') {
      formConfig = formMappings.animales.forms.find(f => f.id === 'createAnimalForm');
      if (formConfig) {
        formConfig = {...formConfig, title: "Publicar Animal para Adopción" }
      }
    } else if (formId === 'assignOwnerForm') {
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

  const adopciones = adopcionesData.filter(adopcion => {
    const matchesText = adopcion.name.toLowerCase().includes(filterText.toLowerCase()) ||
                        adopcion.species.toLowerCase().includes(filterText.toLowerCase());
    const matchesSpecies = speciesFilter === 'todas' || adopcion.species.toLowerCase() === speciesFilter;
    return matchesText && matchesSpecies;
  });

  const renderMobileAdopciones = () => (
    <div className="space-y-4">
      {adopciones.map((adopcion) => (
        <Card key={adopcion.id}>
          <CardHeader>
            <CardTitle>{adopcion.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Especie</span>
              <span>{adopcion.species}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Edad</span>
              <span>{adopcion.age}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Estado</span>
              <Badge variant={getStatusVariant(adopcion.status)} className={adopcion.status === 'Disponible' ? 'bg-green-600' : ''}>{adopcion.status}</Badge>
            </div>
             <div className="flex flex-col gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleFormOpen('editAdoptionForm', adopcion)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => handleFormOpen('endAdoptionForm', adopcion)}>Eliminar</Button>
                 {adopcion.status === 'Disponible' && (
                    <Button size="sm" variant="secondary" onClick={() => handleFormOpen('assignOwnerForm', adopcion)}>Asignar Propietario</Button>
                 )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderDesktopAdopciones = () => (
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
                      <Button size="sm" variant="secondary" onClick={() => handleFormOpen('assignOwnerForm', adopcion)}>Asignar Propietario</Button>
                   )}
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
      <h1 className="flex items-center gap-3">🏡 Adopciones</h1>
      <p className="text-muted-foreground">Listado de animales en adopción. Puedes publicar, editar o eliminar publicaciones.</p>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex w-full flex-col md:flex-row gap-2">
            <Input
              type="text"
              placeholder="Buscar por nombre, especie..."
              className="flex-grow"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filtrar por especie" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todas">Todas las especies</SelectItem>
                    <SelectItem value="perro">Perro</SelectItem>
                    <SelectItem value="gato">Gato</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Button onClick={() => handleFormOpen('createAdoptionForm')} className="w-full md:w-auto flex-shrink-0">Agregar Adopción</Button>
      </div>

      {isMobile ? renderMobileAdopciones() : renderDesktopAdopciones()}

      <DynamicForm 
        formConfig={activeForm}
        isOpen={!!activeForm}
        onClose={handleCloseForm}
        item={selectedItem}
      />
    </div>
  )
}
