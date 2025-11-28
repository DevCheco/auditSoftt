"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AlertTriangle, Shield, Eye, TrendingUp } from "lucide-react"

// Sample suspicious transactions data
const suspiciousTransactions = [
  {
    id: "TXN-001",
    fecha: "2024-01-15",
    descripcion: "Transferencia a cuenta no registrada",
    monto: 25000,
    riesgo: "alto",
    categoria: "Transferencia Sospechosa",
    estado: "Pendiente",
  },
  {
    id: "TXN-002",
    fecha: "2024-01-14",
    descripcion: "Múltiples transacciones pequeñas",
    monto: 9800,
    riesgo: "medio",
    categoria: "Patrón Inusual",
    estado: "En Revisión",
  },
  {
    id: "TXN-003",
    fecha: "2024-01-13",
    descripcion: "Pago fuera de horario comercial",
    monto: 15600,
    riesgo: "bajo",
    categoria: "Horario Atípico",
    estado: "Resuelto",
  },
  {
    id: "TXN-004",
    fecha: "2024-01-12",
    descripcion: "Transacción duplicada",
    monto: 12300,
    riesgo: "medio",
    categoria: "Duplicación",
    estado: "Pendiente",
  },
  {
    id: "TXN-005",
    fecha: "2024-01-11",
    descripcion: "Monto superior al límite establecido",
    monto: 45000,
    riesgo: "alto",
    categoria: "Límite Excedido",
    estado: "En Revisión",
  },
]

// Scatter plot data for outlier detection
const outlierData = [
  { x: 1200, y: 15000, riesgo: "bajo" },
  { x: 2300, y: 28000, riesgo: "bajo" },
  { x: 1800, y: 22000, riesgo: "bajo" },
  { x: 3200, y: 35000, riesgo: "medio" },
  { x: 2800, y: 31000, riesgo: "bajo" },
  { x: 4500, y: 52000, riesgo: "alto" },
  { x: 1500, y: 18000, riesgo: "bajo" },
  { x: 3800, y: 45000, riesgo: "alto" },
  { x: 2100, y: 25000, riesgo: "bajo" },
  { x: 5200, y: 68000, riesgo: "alto" },
  { x: 1900, y: 23000, riesgo: "bajo" },
  { x: 3600, y: 42000, riesgo: "medio" },
]

// Risk level summary
const riskSummary = {
  alto: 8,
  medio: 15,
  bajo: 127,
}

interface RiskLevelIndicatorProps {
  level: "alto" | "medio" | "bajo"
  count: number
}

function RiskLevelIndicator({ level, count }: RiskLevelIndicatorProps) {
  const colors = {
    alto: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", dot: "bg-red-500" },
    medio: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200", dot: "bg-yellow-500" },
    bajo: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", dot: "bg-blue-500" },
  }

  const labels = {
    alto: "Riesgo Alto",
    medio: "Riesgo Medio",
    bajo: "Riesgo Bajo",
  }

  return (
    <Card className={`${colors[level].bg} ${colors[level].border} border shadow-sm`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 ${colors[level].dot} rounded-full mr-3`} />
            <span className={`text-sm font-medium ${colors[level].text}`}>{labels[level]}</span>
          </div>
          <span className={`text-2xl font-bold ${colors[level].text}`}>{count}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function getRiskBadge(riesgo: string) {
  switch (riesgo) {
    case "alto":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Alto</Badge>
    case "medio":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medio</Badge>
    case "bajo":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Bajo</Badge>
    default:
      return <Badge variant="secondary">Desconocido</Badge>
  }
}

function getStatusBadge(estado: string) {
  switch (estado) {
    case "Pendiente":
      return <Badge variant="destructive">Pendiente</Badge>
    case "En Revisión":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En Revisión</Badge>
    case "Resuelto":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resuelto</Badge>
    default:
      return <Badge variant="secondary">{estado}</Badge>
  }
}

export  function RisksContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Riesgos y Anomalías</h1>
          <p className="text-audit-medium-gray mt-1">Detección y análisis de transacciones sospechosas</p>
        </div>
        <Button className="bg-audit-bright-blue hover:bg-blue-600">
          <Eye className="w-4 h-4 mr-2" />
          Ejecutar Análisis
        </Button>
      </div>

      {/* Risk Level Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RiskLevelIndicator level="alto" count={riskSummary.alto} />
        <RiskLevelIndicator level="medio" count={riskSummary.medio} />
        <RiskLevelIndicator level="bajo" count={riskSummary.bajo} />
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outlier Detection Chart */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Detección de Valores Atípicos</CardTitle>
            <p className="text-sm text-audit-medium-gray">Análisis de dispersión de transacciones</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={outlierData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Frecuencia"
                    stroke="#666"
                    fontSize={12}
                    tickFormatter={(value) => `${value}`}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Monto"
                    stroke="#666"
                    fontSize={12}
                    tickFormatter={(value) => `€${value / 1000}k`}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [
                      name === "y" ? `€${Number(value).toLocaleString()}` : value,
                      name === "y" ? "Monto" : "Frecuencia",
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Scatter
                    dataKey="y"
                    fill={(entry: any) => {
                      switch (entry.riesgo) {
                        case "alto":
                          return "#d9534f"
                        case "medio":
                          return "#f0ad4e"
                        default:
                          return "#009fe3"
                      }
                    }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Summary */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Resumen de Riesgos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <div className="text-sm font-medium text-red-800">Alertas Críticas</div>
                  <div className="text-xs text-red-600">Requieren atención inmediata</div>
                </div>
              </div>
              <span className="text-xl font-bold text-red-600">3</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-yellow-500 mr-3" />
                <div>
                  <div className="text-sm font-medium text-yellow-800">En Monitoreo</div>
                  <div className="text-xs text-yellow-600">Transacciones bajo vigilancia</div>
                </div>
              </div>
              <span className="text-xl font-bold text-yellow-600">15</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <div className="text-sm font-medium text-blue-800">Patrones Detectados</div>
                  <div className="text-xs text-blue-600">Últimas 24 horas</div>
                </div>
              </div>
              <span className="text-xl font-bold text-blue-600">7</span>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm font-medium text-gray-900 mb-2">Tipos de Anomalías Más Frecuentes</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transferencias Sospechosas</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Patrones Inusuales</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Límites Excedidos</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duplicaciones</span>
                  <span className="font-medium">15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suspicious Transactions Table */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Transacciones Sospechosas</CardTitle>
          <p className="text-sm text-audit-medium-gray">Listado de transacciones que requieren revisión</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Descripción</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Monto</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Riesgo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Categoría</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {suspiciousTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                    <td className="py-3 px-4 text-gray-900">{transaction.fecha}</td>
                    <td className="py-3 px-4 text-gray-900 max-w-xs truncate">{transaction.descripcion}</td>
                    <td className="py-3 px-4 text-right font-medium">${transaction.monto.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">{getRiskBadge(transaction.riesgo)}</td>
                    <td className="py-3 px-4 text-gray-600">{transaction.categoria}</td>
                    <td className="py-3 px-4 text-center">{getStatusBadge(transaction.estado)}</td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="outline" size="sm">
                        Revisar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-audit-medium-gray">Mostrando 5 de 23 transacciones sospechosas</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}