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

const users = [
  { name: "Maria Lopez", dni: "30555666", email: "maria@gmail.com", status: "Activo" },
  { name: "Juan Martínez", dni: "40111222", email: "juan@mail.com", status: "Inactivo" },
]

export default function UsuariosSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">👤 Usuarios</h1>
      
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Buscar usuario por nombre, DNI, etc..."
          className="flex-grow"
        />
        <CollapsibleTrigger asChild>
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
            Filtrar
          </Button>
        </CollapsibleTrigger>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <TableHead>DNI</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.dni}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.dni}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Activo" ? "default" : "destructive"} className={user.status === "Activo" ? "bg-green-600" : ""}>{user.status}</Badge>
                </TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">Editar</Button>
                  <Button size="sm" variant="secondary">Activar/Desactivar</Button>
                  <Button size="sm" variant="ghost">Animales</Button>
                  <Button size="sm" variant="ghost">Turnos</Button>
                  <Button size="sm" variant="ghost">Denuncias</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
