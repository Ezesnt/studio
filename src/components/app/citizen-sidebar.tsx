
"use client"

import React from "react"
import {
  Clock,
  Dog,
  Siren,
  Bell,
  UserCog,
  Heart,
  LayoutDashboard,
  PanelLeft,
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

interface CitizenSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "adopciones", label: "Adopciones", icon: Heart },
  { id: "perfil", label: "Mis Datos", icon: UserCog },
  { id: "preturnos", label: "Pre-turnos", icon: Clock },
  { id: "animales", label: "Mis Animales", icon: Dog },
  { id: "denuncias", label: "Denuncias", icon: Siren },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
]

export function CitizenSidebar({ activeSection, setActiveSection }: CitizenSidebarProps) {
  const { setOpenMobile, isMobile } = useSidebar()

  const handleItemClick = (sectionId: string) => {
    setActiveSection(sectionId)
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar className="border-r border-border/80">
      <SidebarHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2 p-2">
          <Logo className="size-8 text-primary" />
          <h2 className="text-lg font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            Zoonosis Bariloche
            <span className="block text-xs text-muted-foreground">Ciudadano</span>
          </h2>
        </div>
        <div className="group-data-[collapsible=icon]:hidden">
          <SidebarTrigger asChild>
             <Button variant="ghost" size="icon">
                <PanelLeft />
             </Button>
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => handleItemClick(item.id)}
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

    
