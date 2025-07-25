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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { useIsMobile } from "@/hooks/use-mobile"

const animals = [
  { id: 1, name: "Firulais", species: "Perro", raza: "Labrador", age: 5, sexo: "macho", color: "Dorado", tamanio: "grande", esta_castrado: true, owner: "Juan Pérez", patent: "12345", historial_clinico: [{fecha: "2025-06-20", tipo: "Consulta", descripcion: "Control anual"}, {fecha: "2025-01-15", tipo: "Vacuna", descripcion: "Vacuna antirrábica"}] },
  { id: 2, name: "Mishi", species: "Gato", raza: "Siamés", age: 2, sexo: "hembra", color: "Blanco y negro", tamanio: "pequenio", esta_castrado: false, owner: "Laura Gómez", patent: "54321", historial_clinico: [] },
]

interface AnimalesSectionProps {
  initialFilter?: {
    type: 'owner' | 'other';
    value: any;
  }
}

export default function AnimalesSection({ initialFilter }: AnimalesSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeForm, setActiveForm] = useState<FormConfig | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [filterText, setFilterText] = useState(initialFilter?.type === 'owner' ? initialFilter.value : '')
  const isMobile = useIsMobile();

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
  
  const filteredAnimals = animals.filter(animal => 
    animal.owner.toLowerCase().includes(filterText.toLowerCase()) || 
    animal.name.toLowerCase().includes(filterText.toLowerCase())
  )

  const renderMobileAnimals = () => (
     <div className="space-y-4">
        {filteredAnimals.map((animal) => (
          <Card key={animal.id}>
            <CardHeader>
                <CardTitle>{animal.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Especie</span>
                  <span>{animal.species}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Propietario</span>
                  <span>{animal.owner}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-muted-foreground">Patente</span>
                  <span>{animal.patent}</span>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleFormOpen('editAnimalForm', animal)}>Editar</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleFormOpen('patentarAnimalForm', animal)}>Patentar</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleFormOpen('viewAnimalHealthBookForm', animal)}>Ver Libreta</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleFormOpen('addHealthRecordForm', animal)}>Agregar Registro</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleFormOpen('deactivateAnimalForm', animal)}>Baja</Button>
                    <Button size="sm" onClick={() => handleFormOpen('activateAnimalForm', animal)}>Alta</Button>
                    <Button size="sm" variant="ghost" onClick={() => handleFormOpen('assignOwnerForm', animal)}>Propietario</Button>
                </div>
            </CardContent>
          </Card>
        ))}
     </div>
  );

  const renderDesktopAnimals = () => (
    <Card>
      <div className="relative w-full overflow-auto">
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
            {filteredAnimals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.owner}</TableCell>
                <TableCell>{animal.patent}</TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleFormOpen('editAnimalForm', animal)}>Editar</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleFormOpen('patentarAnimalForm', animal)}>Patentar</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleFormOpen('viewAnimalHealthBookForm', animal)}>Ver Libreta</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleFormOpen('addHealthRecordForm', animal)}>Agregar Registro</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleFormOpen('deactivateAnimalForm', animal)}>Baja</Button>
                  <Button size="sm" onClick={() => handleFormOpen('activateAnimalForm', animal)}>Alta</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleFormOpen('assignOwnerForm', animal)}>Propietario</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🐾 Animales</h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex w-full flex-col md:flex-row gap-2">
            <Input
              type="text"
              placeholder="Buscar animal por nombre o propietario..."
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
          </div>
          <Button onClick={() => handleFormOpen('createAnimalForm')} className="w-full md:w-auto flex-shrink-0">Crear Animal</Button>
      </div>

      {isMobile ? renderMobileAnimals() : renderDesktopAnimals()}

      <DynamicForm 
        formConfig={activeForm}
        isOpen={!!activeForm}
        onClose={handleCloseForm}
        item={selectedItem}
      />
    </div>
  )
}
