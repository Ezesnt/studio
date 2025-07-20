
"use client"

import React, { useState, useEffect } from "react"
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

const users = [
  { id: 1, nombre: "Admin", apellido: "User", domicilio: "Admin Street 123", telefono: "555-0100", name: "Admin User", dni: "11111111", email: "admin@zoonosis.com", status: "Activo", categoria: "admin" },
  { id: 2, nombre: "Maria", apellido: "Lopez", domicilio: "Calle Falsa 123", telefono: "123456789", name: "Maria Lopez", dni: "30555666", email: "maria@gmail.com", status: "Activo", categoria: "ciudadano" },
  { id: 3, nombre: "Juan", apellido: "Martínez", domicilio: "Av. Siempre Viva 742", telefono: "987654321", name: "Juan Martínez", dni: "40111222", email: "juan@mail.com", status: "Inactivo", categoria: "ciudadano" },
]

interface UsuariosSectionProps {
  onNavigateToSection: (section: string, filter?: any) => void;
  initialFilter?: {
    type: string;
    value: any;
  }
}

export default function UsuariosSection({ onNavigateToSection, initialFilter }: UsuariosSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeForm, setActiveForm] = useState<FormConfig | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [filterText, setFilterText] = useState('')
  const isMobile = useIsMobile();

  useEffect(() => {
    if (initialFilter?.type === 'id') {
      const user = users.find(u => u.id === initialFilter.value);
      setFilterText(user?.name || '');
    }
  }, [initialFilter]);

  const handleFormOpen = (formId: string, item?: any) => {
    const formConfig = formMappings.usuarios.forms.find(f => f.id === formId)
    if (formConfig) {
      setActiveForm(formConfig)
      setSelectedItem(item)
    }
  }

  const handleCloseForm = () => {
    setActiveForm(null)
    setSelectedItem(null)
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filterText.toLowerCase()) ||
    user.dni.toLowerCase().includes(filterText.toLowerCase())
  )
  
  const renderMobileUsers = () => (
    <div className="space-y-4">
      {filteredUsers.map((user) => (
        <Card key={user.id}>
            <CardHeader>
                <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">DNI</span>
                    <span>{user.dni}</span>
                </div>
                <div className="flex justify-between text-right">
                    <span className="text-muted-foreground">Email</span>
                    <span className="truncate">{user.email}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Estado</span>
                  <Badge variant={user.status === "Activo" ? "default" : "destructive"} className={user.status === "Activo" ? "bg-green-600" : ""}>{user.status}</Badge>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleFormOpen('editUserForm', user)}>Editar</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleFormOpen('toggleUserStatusForm', user)}>Activar/Desactivar</Button>
                    <Button size="sm" variant="ghost" onClick={() => onNavigateToSection('animales', { type: 'owner', value: user.name })}>Animales</Button>
                    <Button size="sm" variant="ghost" onClick={() => onNavigateToSection('turnos', { type: 'usuario', value: user.name })}>Turnos</Button>
                    <Button size="sm" variant="ghost" onClick={() => onNavigateToSection('denuncias', { type: 'denunciante', value: user.name })}>Denuncias</Button>
                </div>
            </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderDesktopUsers = () => (
    <Card>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.dni}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Activo" ? "default" : "destructive"} className={user.status === "Activo" ? "bg-green-600" : ""}>{user.status}</Badge>
                </TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleFormOpen('editUserForm', user)}>Editar</Button>
                  <Button size="sm" variant="secondary" onClick={() => handleFormOpen('toggleUserStatusForm', user)}>Activar/Desactivar</Button>
                  <Button size="sm" variant="ghost" onClick={() => onNavigateToSection('animales', { type: 'owner', value: user.name })}>Animales</Button>
                  <Button size="sm" variant="ghost" onClick={() => onNavigateToSection('turnos', { type: 'usuario', value: user.name })}>Turnos</Button>
                  <Button size="sm" variant="ghost" onClick={() => onNavigateToSection('denuncias', { type: 'denunciante', value: user.name })}>Denuncias</Button>
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
      <h1 className="flex items-center gap-3">👤 Usuarios</h1>
      
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          type="text"
          placeholder="Buscar usuario por nombre, DNI, etc..."
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
                    <Label htmlFor="filtroEstadoUsuario">Estado</Label>
                    <Select>
                      <SelectTrigger id="filtroEstadoUsuario">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filtroRolUsuario">Rol</Label>
                    <Select>
                      <SelectTrigger id="filtroRolUsuario">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="cliente">Cliente</SelectItem>
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
      
      {isMobile ? renderMobileUsers() : renderDesktopUsers()}
      
      <DynamicForm 
        formConfig={activeForm}
        isOpen={!!activeForm}
        onClose={handleCloseForm}
        item={selectedItem}
      />
    </div>
  )
}
