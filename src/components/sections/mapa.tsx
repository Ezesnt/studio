"use client"

import React from "react"
import Image from "next/image"

export default function MapaSection() {
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-3">🗺️ Mapa Interactivo</h1>
      <p className="text-muted-foreground">
        Visualización de animales registrados en el mapa de la ciudad.
      </p>
      <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden border border-border flex items-center justify-center">
        <Image
          src="https://placehold.co/1200x675.png"
          alt="Mapa placeholder"
          width={1200}
          height={675}
          className="object-cover w-full h-full"
          data-ai-hint="city map"
        />
      </div>
    </div>
  )
}
