
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { User, Shield } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">Zoonosis Central</h1>
        <p className="text-xl text-muted-foreground">Plataforma integral de gestión de zoonosis.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="hover:shadow-lg hover:border-primary/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="text-primary" />
              Portal del Ciudadano
            </CardTitle>
            <CardDescription>
              Accede para gestionar tus mascotas, solicitar turnos y realizar denuncias.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/citizen')}>
              Ingresar como Ciudadano
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg hover:border-primary/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-primary" />
              Panel de Administración
            </CardTitle>
            <CardDescription>
              Acceso para personal autorizado. Gestiona usuarios, animales y operaciones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => router.push('/admin')}>
              Ingresar como Administrador
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
