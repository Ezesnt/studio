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
import { DynamicForm, type FormConfig } from "@/components/forms/dynamic-form"
import { formMappings } from "@/lib/forms-mapping"

const animals = [
  { id: 1, name: "Firulais", species: "Perro", raza: "Labrador", age: 5, sexo: "macho", color: "Dorado", tamanio: "grande", esta_castrado: true, owner: "Juan Pérez", patent: "12345" },
  { id: 2, name: "Mishi", species: "Gato", raza: "Siamés", age: 2, sexo: "hembra", color: "Blanco y negro", tamanio: "pequenio", esta_castrado: false, owner: "Laura Gómez", patent: "54321" },
]

export default function AnimalesSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeForm, setActiveForm] = useState<FormConfig | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const handleFormOpen = (formId: string, item?: any) => {
    const formConfig = formMappings.animales.forms.find(f => f.id === formId)
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
      <h1 className="flex items-center gap-3">🐾 Animales</h1>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-grow">
              <Input
                type="text"
                placeholder="Buscar animal por nombre, especie, propietario..."
                className="flex-grow"
              />
              <CollapsibleTrigger asChild>
                <Button variant="outline">
                  Filtrar
                </Button>
              </CollapsibleTrigger>
            </div>
            <Button onClick={() => handleFormOpen('createAnimalForm')} className="ml-4">Crear Animal</Button>
        </div>
        
        <CollapsibleContent>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="filtroEspecie">Especie</Label>
                    <Select>
                      <SelectTrigger id="filtroEspecie">
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas</SelectItem>
                        <SelectItem value="perro">Perro</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                        <SelectItem value="ave">Ave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filtroEstadoAnimal">Estado</Label>
                    <Select>
                      <SelectTrigger id="filtroEstadoAnimal">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
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
              <TableHead>Nombre</TableHead>
              <TableHead>Especie</TableHead>
              <TableHead>Propietario</TableHead>
              <TableHead>Patente</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.owner}</TableCell>
                <TableCell>{animal.patent}</TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleFormOpen('editAnimalForm', animal)}>Editar</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleFormOpen('patentarAnimalForm', animal)}>Patentar</Button>
                  <Button size="sm" variant="secondary">Libreta</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleFormOpen('deactivateAnimalForm', animal)}>Baja</Button>
                  <Button size="sm" onClick={() => handleFormOpen('activateAnimalForm', animal)}>Alta</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleFormOpen('assignOwnerForm', animal)}>Propietario</Button>
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
