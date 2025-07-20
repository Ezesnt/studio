
"use client"

import React, { useState } from "react"
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Dog, Siren, Calendar as CalendarIcon, Home, CheckCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"

const kpiData = [
  { title: "Animales Registrados", value: "850", icon: Dog, color: "text-blue-400" },
  { title: "Usuarios Activos", value: "350", icon: Users, color: "text-green-400" },
  { title: "Denuncias Pendientes", value: "15", icon: Siren, color: "text-yellow-400" },
  { title: "Denuncias Resueltas", value: "128", icon: CheckCircle, color: "text-green-500" },
  { title: "Turnos Programados", value: "42", icon: CalendarIcon, color: "text-purple-400" },
]

const barChartData = [
  { name: 'Perros', value: 500 },
  { name: 'Gatos', value: 300 },
  { name: 'Aves', value: 150 },
]

const pieChartData = [
  { name: 'Vacunados', value: 700 },
  { name: 'No Vacunados', value: 250 },
];
const PIE_CHART_COLORS = ['hsl(var(--chart-4))', 'hsl(var(--destructive))'];

const KpiCard = ({ title, value, icon: Icon, color }: typeof kpiData[0]) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

export default function DashboardSection() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -7),
        to: new Date(),
    })

    const setDatePreset = (preset: 'today' | 'last7' | 'thisMonth' | 'lastMonth') => {
        const today = new Date();
        switch (preset) {
            case 'today':
                setDate({ from: today, to: today });
                break;
            case 'last7':
                setDate({ from: addDays(today, -7), to: today });
                break;
            case 'thisMonth':
                setDate({ from: new Date(today.getFullYear(), today.getMonth(), 1), to: today });
                break;
            case 'lastMonth':
                const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                setDate({ from: prevMonth, to: new Date(today.getFullYear(), today.getMonth(), 0) });
                break;
        }
    }


  return (
    <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <div className="flex flex-wrap items-center gap-2">
                 <Button variant="outline" size="sm" onClick={() => setDatePreset('today')}>Hoy</Button>
                 <Button variant="outline" size="sm" onClick={() => setDatePreset('last7')}>Últimos 7 días</Button>
                 <Button variant="outline" size="sm" onClick={() => setDatePreset('thisMonth')}>Este Mes</Button>
                 <Button variant="outline" size="sm" onClick={() => setDatePreset('lastMonth')}>Mes Pasado</Button>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        size="sm"
                        className="w-full md:w-[240px] justify-start text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                </Popover>
            </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Animales por Especie</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip cursor={{ fill: 'hsl(var(--accent))' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Estado de Vacunación</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                 <Tooltip cursor={{ fill: 'hsl(var(--accent))' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
