"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bell } from "lucide-react"

const notifications = [
  "Recordatorio - patente a vencer para Firulais (Perro)",
  "Turno pendiente para María Gómez el 2025-08-05",
  "Vacunas próximas a vencer para Mishi (Gato)",
  "Nueva denuncia pendiente en zona Centro",
]

export default function NotificacionesSection() {
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🔔 Notificaciones</h1>
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {notifications.map((notification, index) => (
              <li key={index} className="flex items-center gap-4 p-4">
                <Bell className="h-5 w-5 text-primary" />
                <span className="text-foreground">{notification}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
