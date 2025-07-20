"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ReportesSection() {
  const { toast } = useToast()

  const handleReportClick = (reportType: string) => {
    toast({
      title: "Generando Reporte",
      description: `Se está generando el ${reportType}...`,
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🗒️ Reportes</h1>
      <p className="text-muted-foreground">Consulta reportes mensuales, anuales y estadísticas generales del sistema.</p>
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={() => handleReportClick('reporte mensual')}>Reporte Mensual</Button>
        <Button variant="outline" onClick={() => handleReportClick('reporte anual')}>Reporte Anual</Button>
        <Button variant="outline" onClick={() => handleReportClick('estadísticas generales')}>Estadísticas Generales</Button>
      </div>
      <div className="mt-4 rounded-lg bg-secondary p-4 min-h-[100px]">
        <pre className="text-muted-foreground">Aquí aparecerá el resultado del reporte...</pre>
      </div>
    </div>
  )
}
