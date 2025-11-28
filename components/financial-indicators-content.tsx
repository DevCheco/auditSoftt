"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, TrendingDown, Calculator, Percent } from "lucide-react"

// Financial indicators data
const financialRatios = {
  Rentabilidad: { value: 28.0, change: 0.9, status: "good" },
  razonCorriente: { value: 2.34, change: 0.12, status: "good" },
  endeudamiento: { value: 42.5, change: -2.1, status: "good" },
  rotacionCartera: { value: 0.6, change: 1.3, status: "excellent" },
  gastosIngresos: { value: 72.0, change: 3.2, status: "warning" },
}

// Comparative data for current vs previous year
const comparativeData = [
  { indicator: "Liquidez", actual: 2.34, anterior: 2.22 },
  { indicator: "Endeudamiento", actual: 42.5, anterior: 44.6 },
  { indicator: "Rentabilidad", actual: 28.0, anterior: 24.8 },
  { indicator: "Eficiencia", actual: 72.0, anterior: 68.8 },
]

// Monthly trend data
const monthlyTrends = [
  { month: "Ene", liquidez: 2.1, rentabilidad: 24.5, endeudamiento: 45.2 },
  { month: "Feb", liquidez: 2.2, rentabilidad: 26.1, endeudamiento: 44.8 },
  { month: "Mar", liquidez: 2.0, rentabilidad: 23.8, endeudamiento: 46.1 },
  { month: "Abr", liquidez: 2.3, rentabilidad: 27.2, endeudamiento: 43.9 },
  { month: "May", liquidez: 2.1, rentabilidad: 22.4, endeudamiento: 45.5 },
  { month: "Jun", liquidez: 2.4, rentabilidad: 28.9, endeudamiento: 42.8 },
  { month: "Jul", liquidez: 2.3, rentabilidad: 27.6, endeudamiento: 43.2 },
  { month: "Ago", liquidez: 2.5, rentabilidad: 29.1, endeudamiento: 41.9 },
  { month: "Sep", liquidez: 2.4, rentabilidad: 28.3, endeudamiento: 42.5 },
  { month: "Oct", liquidez: 2.3, rentabilidad: 27.8, endeudamiento: 42.8 },
  { month: "Nov", liquidez: 2.4, rentabilidad: 28.5, endeudamiento: 42.1 },
  { month: "Dic", liquidez: 2.34, rentabilidad: 28.0, endeudamiento: 42.5 },
]

interface FinancialRatioCardProps {
  title: string
  value: number
  unit: string
  change: number
  status: "excellent" | "good" | "warning" | "danger"
  icon: React.ReactNode
}

function FinancialRatioCard({ title, value, unit, change, status, icon }: FinancialRatioCardProps) {
  const statusColors = {
    excellent: "bg-green-500",
    good: "bg-audit-bright-blue",
    warning: "bg-audit-yellow",
    danger: "bg-audit-red",
  }

  const isPositive = change > 0
  const isNegative = change < 0

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${statusColors[status]}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {value}
          {unit}
        </div>
        <div className="flex items-center mt-1">
          {isPositive && <TrendingUp className="w-4 h-4 text-green-500 mr-1" />}
          {isNegative && <TrendingDown className="w-4 h-4 text-red-500 mr-1" />}
          <span className={`text-xs ${isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-gray-500"}`}>
            {change > 0 ? "+" : ""}
            {change} vs mes anterior
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export function FinancialIndicatorsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Indicadores Financieros</h1>
        <p className="text-audit-medium-gray mt-1">Análisis de ratios y métricas financieras clave</p>
      </div>

      {/* Financial Ratios Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FinancialRatioCard
          title="Margen de utilidad neta"
          value={financialRatios.Rentabilidad.value}
          unit="%"
          change={financialRatios.Rentabilidad.change}
          status={financialRatios.Rentabilidad.status as "good"}
          icon={<Calculator className="w-5 h-5 text-white" />}
        />
        <FinancialRatioCard
          title="Razón Corriente"
          value={financialRatios.razonCorriente.value}
          unit=""
          change={financialRatios.razonCorriente.change}
          status={financialRatios.razonCorriente.status as "good"}
          icon={<Calculator className="w-5 h-5 text-white" />}
        />
        <FinancialRatioCard
          title="Endeudamiento"
          value={financialRatios.endeudamiento.value}
          unit="%"
          change={financialRatios.endeudamiento.change}
          status={financialRatios.endeudamiento.status as "good"}
          icon={<Percent className="w-5 h-5 text-white" />}
        />
        <FinancialRatioCard
          title="Rotación de Cartera"
          value={financialRatios.rotacionCartera.value}
          unit=" veces"
          change={financialRatios.rotacionCartera.change}
          status={financialRatios.rotacionCartera.status as "excellent"}
          icon={<TrendingUp className="w-5 h-5 text-white" />}
        />
        <FinancialRatioCard
          title="% Gastos/Ingresos"
          value={financialRatios.gastosIngresos.value}
          unit="%"
          change={financialRatios.gastosIngresos.change}
          status={financialRatios.gastosIngresos.status as "warning"}
          icon={<TrendingDown className="w-5 h-5 text-white" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparative Chart */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Comparativo Año Actual vs Anterior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparativeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="indicator" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="anterior" fill="#a0a5b1" name="Año Anterior" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" fill="#009fe3" name="Año Actual" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Tendencias Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
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
                    dataKey="liquidez"
                    stroke="#009fe3"
                    strokeWidth={2}
                    dot={{ fill: "#009fe3", strokeWidth: 2, r: 4 }}
                    name="Liquidez"
                  />
                  <Line
                    type="monotone"
                    dataKey="rentabilidad"
                    stroke="#ff7f50"
                    strokeWidth={2}
                    dot={{ fill: "#ff7f50", strokeWidth: 2, r: 4 }}
                    name="Rentabilidad (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="endeudamiento"
                    stroke="#f0ad4e"
                    strokeWidth={2}
                    dot={{ fill: "#f0ad4e", strokeWidth: 2, r: 4 }}
                    name="Endeudamiento (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Análisis de Liquidez</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Activo Corriente</span>
              <span className="font-semibold text-gray-900">$156,800</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pasivo Corriente</span>
              <span className="font-semibold text-gray-900">$67,000</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">Razón Corriente</span>
                <span className="font-bold text-audit-bright-blue">2.34</span>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-xs text-green-800">
                <strong>Excelente:</strong> La empresa tiene buena capacidad para cubrir sus obligaciones a corto plazo.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Análisis de Endeudamiento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pasivo Total</span>
              <span className="font-semibold text-gray-900">$119,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Activo Total</span>
              <span className="font-semibold text-gray-900">$280,000</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">Ratio Endeudamiento</span>
                <span className="font-bold text-audit-bright-blue">42.5%</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Bueno:</strong> Nivel de endeudamiento saludable, por debajo del 50%.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Análisis de Rentabilidad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Utilidad Neta</span>
              <span className="font-semibold text-gray-900">$47,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ventas Neta</span>
              <span className="font-semibold text-gray-900">$168,000</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">Margen Neto</span>
                <span className="font-bold text-audit-orange">28.0%</span>
              </div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-xs text-orange-800">
                <strong>Excelente:</strong> Margen de rentabilidad muy superior al promedio del sector.
              </p>
            </div>
          </CardContent>
        </Card>

<Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Análisis de Eficiencia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ventas</span>
              <span className="font-semibold text-gray-900">$168,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cuentas por cobrar</span>
              <span className="font-semibold text-gray-900">$280,000</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">Rotación cartera</span>
                <span className="font-bold text-audit-bright-blue">0.6</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Bueno:</strong> Nivel de rotación de cartera saludable.
              </p>
            </div>
          </CardContent>
        </Card>


        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Análisis de Gastos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Gastos</span>
              <span className="font-semibold text-gray-900">$72,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Ingresos</span>
              <span className="font-semibold text-gray-900">$100,000</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">% gasto sobre ingresos</span>
                <span className="font-bold text-audit-bright-blue">72</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Bueno:</strong> Nivel de gastos saludable.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

