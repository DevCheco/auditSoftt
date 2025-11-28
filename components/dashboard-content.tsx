"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Leaf } from "lucide-react"

// Sample data from the specification
const monthlyData = [
  { month: "Ene", ingresos: 10000, gastos: 7000 },
  { month: "Feb", ingresos: 12000, gastos: 8000 },
  { month: "Mar", ingresos: 11000, gastos: 7500 },
  { month: "Abr", ingresos: 13000, gastos: 9000 },
  { month: "May", ingresos: 9000, gastos: 7000 },
  { month: "Jun", ingresos: 15000, gastos: 11000 },
  { month: "Jul", ingresos: 14000, gastos: 10000 },
  { month: "Ago", ingresos: 16000, gastos: 12000 },
  { month: "Sep", ingresos: 15500, gastos: 11000 },
  { month: "Oct", ingresos: 16500, gastos: 11500 },
  { month: "Nov", ingresos: 17000, gastos: 13000 },
  { month: "Dic", ingresos: 18000, gastos: 14000 },
]

const kpiData = {
  ingresos: 168000,
  gastos: 121000,
  margenUtilidad: 28.0,
  huellaCarbono: 195.7,
}

interface KPICardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  color: string
}

function KPICard({ title, value, change, icon, color }: KPICardProps) {
  const isPositive = change > 0
  const isNegative = change < 0

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="flex items-center mt-1">
          {isPositive && <TrendingUp className="w-4 h-4 text-green-500 mr-1" />}
          {isNegative && <TrendingDown className="w-4 h-4 text-red-500 mr-1" />}
          <span className={`text-xs ${isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-gray-500"}`}>
            {change > 0 ? "+" : ""}
            {change}% vs mes anterior
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Principal</h1>
          <p className="text-audit-medium-gray mt-1">Resumen ejecutivo de indicadores clave</p>
        </div>
        <div className="text-sm text-audit-medium-gray">
          Última actualización: {new Date().toLocaleDateString("es-ES")}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Ingresos Totales"
          value="$168,000"
          change={5.9}
          icon={<DollarSign className="w-5 h-5 text-white" />}
          color="bg-audit-bright-blue"
        />
        <KPICard
          title="Gastos Totales"
          value="$121,000"
          change={7.7}
          icon={<TrendingDown className="w-5 h-5 text-white" />}
          color="bg-audit-red"
        />
        <KPICard
          title="Margen de Utilidad"
          value="28.0%"
          change={2.1}
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          color="bg-audit-orange"
        />
        <KPICard
          title="Huella de Carbono"
          value="195.7 tCO₂"
          change={-3.2}
          icon={<Leaf className="w-5 h-5 text-white" />}
          color="bg-audit-yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Ingresos vs Gastos - Últimos 12 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ingresos"
                    stroke="#009fe3"
                    strokeWidth={3}
                    dot={{ fill: "#009fe3", strokeWidth: 2, r: 4 }}
                    name="Ingresos"
                  />
                  <Line
                    type="monotone"
                    dataKey="gastos"
                    stroke="#d9534f"
                    strokeWidth={3}
                    dot={{ fill: "#d9534f", strokeWidth: 2, r: 4 }}
                    name="Gastos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Resumen Financiero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Ingresos Promedio Mensual</span>
              <span className="text-lg font-bold text-audit-bright-blue">$14,000</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Gastos Promedio Mensual</span>
              <span className="text-lg font-bold text-audit-red">$10,083</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Utilidad Neta Anual</span>
              <span className="text-lg font-bold text-audit-orange">$47,000</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">ROI Estimado</span>
              <span className="text-lg font-bold text-audit-yellow">15.6%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border border-audit-bright-blue rounded-lg hover:bg-blue-50 transition-colors">
              <div className="text-sm font-medium text-audit-bright-blue">Cargar Nuevos Datos</div>
              <div className="text-xs text-gray-500 mt-1">Importar archivos CSV/Excel</div>
            </button>
            <button className="p-4 text-left border border-audit-orange rounded-lg hover:bg-orange-50 transition-colors">
              <div className="text-sm font-medium text-audit-orange">Generar Reporte</div>
              <div className="text-xs text-gray-500 mt-1">Crear reporte mensual</div>
            </button>
            <button className="p-4 text-left border border-audit-yellow rounded-lg hover:bg-yellow-50 transition-colors">
              <div className="text-sm font-medium text-audit-yellow">Ver Alertas</div>
              <div className="text-xs text-gray-500 mt-1">3 anomalías detectadas</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
