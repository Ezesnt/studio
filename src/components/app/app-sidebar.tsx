"use client"

import React from "react"
import {
  Bell,
  Clock,
  Dog,
  FileText,
  Home,
  LayoutDashboard,
  Map,
  Siren,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/icons/logo"

interface AppSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "animales", label: "Animales", icon: Dog },
  { id: "usuarios", label: "Usuarios", icon: Users },
  { id: "denuncias", label: "Denuncias", icon: Siren },
  { id: "turnos", label: "Turnos", icon: Clock },
  { id: "adopciones", label: "Adopciones", icon: Home },
  { id: "reportes", label: "Reportes", icon: FileText },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "mapa-interactivo", label: "Mapa Interactivo", icon: Map },
]

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  const { state } = useSidebar()

  return (
    <Sidebar className="border-r border-border/80">
      <SidebarHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2 p-2">
          <Logo className="size-8 text-primary" />
          <h2 className="text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            Zoonosis Central
          </h2>
        </div>
        <SidebarTrigger asChild className="group-data-[collapsible=icon]:hidden">
          <Button variant="ghost" size="icon" />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveSection(item.id)}
                isActive={activeSection === item.id}
                className="justify-start"
                tooltip={item.label}
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
