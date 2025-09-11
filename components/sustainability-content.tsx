"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Leaf, Zap, Recycle, Droplets, TrendingUp, TrendingDown } from "lucide-react"

// Sustainability KPIs
const sustainabilityKPIs = {
  huellaCarbono: { value: 195.7, change: -3.2, target: 180, unit: "tCO₂" },
  consumoEnergetico: { value: 18420, change: 5.8, target: 17000, unit: "kWh" },
  renovables: { value: 35.2, change: 8.4, target: 50, unit: "%" },
  reciclaje: { value: 864, change: 12.1, target: 1000, unit: "kg" },
}

// Time series data for sustainability metrics
const timeSeriesData = [
  { month: "Ene", co2: 10, energia: 1200, reciclaje: 50 },
  { month: "Feb", co2: 12, energia: 1300, reciclaje: 55 },
  { month: "Mar", co2: 11, energia: 1250, reciclaje: 60 },
  { month: "Abr", co2: 13, energia: 1400, reciclaje: 70 },
  { month: "May", co2: 15, energia: 1500, reciclaje: 65 },
  { month: "Jun", co2: 16, energia: 1600, reciclaje: 80 },
  { month: "Jul", co2: 17, energia: 1700, reciclaje: 85 },
  { month: "Ago", co2: 18, energia: 1800, reciclaje: 90 },
  { month: "Sep", co2: 17.5, energia: 1750, reciclaje: 88 },
  { month: "Oct", co2: 18.2, energia: 1820, reciclaje: 92 },
  { month: "Nov", co2: 19, energia: 1900, reciclaje: 95 },
  { month: "Dic", co2: 20, energia: 1950, reciclaje: 100 },
]

// Radar chart data for sustainability performance
const radarData = [
  { subject: "Emisiones CO₂", A: 75, B: 85, fullMark: 100 },
  { subject: "Eficiencia Energética", A: 68, B: 72, fullMark: 100 },
  { subject: "Energías Renovables", A: 70, B: 60, fullMark: 100 },
  { subject: "Gestión de Residuos", A: 86, B: 78, fullMark: 100 },
  { subject: "Uso del Agua", A: 82, B: 75, fullMark: 100 },
  { subject: "Biodiversidad", A: 65, B: 58, fullMark: 100 },
]

interface SustainabilityKPICardProps {
  title: string
  value: number
  unit: string
  change: number
  target: number
  icon: React.ReactNode
  color: string
}

function SustainabilityKPICard({ title, value, unit, change, target, icon, color }: SustainabilityKPICardProps) {
  const isPositive = change > 0
  const isNegative = change < 0
  const progress = (value / target) * 100

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {value.toLocaleString()} {unit}
        </div>
        <div className="flex items-center mt-1 mb-2">
          {isPositive && <TrendingUp className="w-4 h-4 text-green-500 mr-1" />}
          {isNegative && <TrendingDown className="w-4 h-4 text-red-500 mr-1" />}
          <span className={`text-xs ${isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-gray-500"}`}>
            {change > 0 ? "+" : ""}
            {change}% vs mes anterior
          </span>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>
              Meta: {target.toLocaleString()} {unit}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${progress >= 100 ? "bg-green-500" : progress >= 75 ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SustainabilityContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Indicadores de Sostenibilidad</h1>
        <p className="text-audit-medium-gray mt-1">Métricas ambientales y de responsabilidad social corporativa</p>
      </div>

      {/* Sustainability KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SustainabilityKPICard
          title="Huella de Carbono"
          value={sustainabilityKPIs.huellaCarbono.value}
          unit={sustainabilityKPIs.huellaCarbono.unit}
          change={sustainabilityKPIs.huellaCarbono.change}
          target={sustainabilityKPIs.huellaCarbono.target}
          icon={<Leaf className="w-5 h-5 text-white" />}
          color="bg-audit-yellow"
        />
        <SustainabilityKPICard
          title="Consumo Energético"
          value={sustainabilityKPIs.consumoEnergetico.value}
          unit={sustainabilityKPIs.consumoEnergetico.unit}
          change={sustainabilityKPIs.consumoEnergetico.change}
          target={sustainabilityKPIs.consumoEnergetico.target}
          icon={<Zap className="w-5 h-5 text-white" />}
          color="bg-audit-bright-blue"
        />
        <SustainabilityKPICard
          title="% Energías Renovables"
          value={sustainabilityKPIs.renovables.value}
          unit={sustainabilityKPIs.renovables.unit}
          change={sustainabilityKPIs.renovables.change}
          target={sustainabilityKPIs.renovables.target}
          icon={<Droplets className="w-5 h-5 text-white" />}
          color="bg-green-500"
        />
        <SustainabilityKPICard
          title="Residuos Reciclados"
          value={sustainabilityKPIs.reciclaje.value}
          unit={sustainabilityKPIs.reciclaje.unit}
          change={sustainabilityKPIs.reciclaje.change}
          target={sustainabilityKPIs.reciclaje.target}
          icon={<Recycle className="w-5 h-5 text-white" />}
          color="bg-audit-orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Series Chart */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Tendencias Ambientales - 12 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
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
                    dataKey="co2"
                    stroke="#f0ad4e"
                    strokeWidth={3}
                    dot={{ fill: "#f0ad4e", strokeWidth: 2, r: 4 }}
                    name="CO₂ (tCO₂)"
                  />
                  <Line
                    type="monotone"
                    dataKey="energia"
                    stroke="#009fe3"
                    strokeWidth={3}
                    dot={{ fill: "#009fe3", strokeWidth: 2, r: 4 }}
                    name="Energía (kWh/100)"
                  />
                  <Line
                    type="monotone"
                    dataKey="reciclaje"
                    stroke="#ff7f50"
                    strokeWidth={3}
                    dot={{ fill: "#ff7f50", strokeWidth: 2, r: 4 }}
                    name="Reciclaje (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Perfil de Sostenibilidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Actual" dataKey="A" stroke="#009fe3" fill="#009fe3" fillOpacity={0.3} strokeWidth={2} />
                  <Radar
                    name="Objetivo"
                    dataKey="B"
                    stroke="#ff7f50"
                    fill="#ff7f50"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Emisiones por Fuente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Electricidad</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-audit-bright-blue h-2 rounded-full" style={{ width: "65%" }} />
                </div>
                <span className="text-sm font-medium">127.2 tCO₂</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Transporte</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-audit-yellow h-2 rounded-full" style={{ width: "25%" }} />
                </div>
                <span className="text-sm font-medium">48.9 tCO₂</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Calefacción</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-audit-orange h-2 rounded-full" style={{ width: "10%" }} />
                </div>
                <span className="text-sm font-medium">19.6 tCO₂</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Gestión de Residuos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-audit-orange mb-2">86.4%</div>
              <div className="text-sm text-gray-600">Tasa de Reciclaje</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Papel y Cartón</span>
                <span className="font-medium">324 kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Plásticos</span>
                <span className="font-medium">186 kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Metales</span>
                <span className="font-medium">142 kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Electrónicos</span>
                <span className="font-medium">78 kg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Certificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3" />
              <div>
                <div className="text-sm font-medium text-green-800">ISO 14001</div>
                <div className="text-xs text-green-600">Vigente hasta 2025</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-audit-bright-blue rounded-full mr-3" />
              <div>
                <div className="text-sm font-medium text-blue-800">LEED Gold</div>
                <div className="text-xs text-blue-600">Edificio principal</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <div className="w-3 h-3 bg-audit-yellow rounded-full mr-3" />
              <div>
                <div className="text-sm font-medium text-yellow-800">Carbon Trust</div>
                <div className="text-xs text-yellow-600">En proceso</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
