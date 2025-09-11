"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, Filter, Eye } from "lucide-react"

// Sample reports data
const availableReports = [
  {
    id: 1,
    nombre: "Reporte Financiero Mensual",
    descripcion: "Análisis completo de indicadores financieros del mes",
    tipo: "Financiero",
    fechaCreacion: "2024-01-20",
    estado: "Completado",
    tamaño: "2.4 MB",
  },
  {
    id: 2,
    nombre: "Informe de Sostenibilidad Q4",
    descripcion: "Métricas ambientales y de responsabilidad social",
    tipo: "Sostenibilidad",
    fechaCreacion: "2024-01-18",
    estado: "Completado",
    tamaño: "1.8 MB",
  },
  {
    id: 3,
    nombre: "Análisis de Riesgos Semanal",
    descripcion: "Detección de anomalías y transacciones sospechosas",
    tipo: "Riesgos",
    fechaCreacion: "2024-01-19",
    estado: "En Proceso",
    tamaño: "1.2 MB",
  },
  {
    id: 4,
    nombre: "Reporte Ejecutivo Anual",
    descripcion: "Resumen ejecutivo con todos los indicadores clave",
    tipo: "Ejecutivo",
    fechaCreacion: "2024-01-15",
    estado: "Completado",
    tamaño: "5.6 MB",
  },
]

const reportTemplates = [
  { id: "financial", name: "Reporte Financiero", description: "Indicadores y ratios financieros" },
  { id: "sustainability", name: "Reporte de Sostenibilidad", description: "Métricas ambientales y ESG" },
  { id: "risks", name: "Análisis de Riesgos", description: "Detección de anomalías y fraudes" },
  { id: "executive", name: "Reporte Ejecutivo", description: "Resumen integral para directivos" },
  { id: "compliance", name: "Reporte de Cumplimiento", description: "Normativas y regulaciones" },
]

export function ReportsContent() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [reportFormat, setReportFormat] = useState("pdf")

  const handleGenerateReport = () => {
    // Simulate report generation
    console.log("Generating report:", { selectedTemplate, dateRange, reportFormat })
  }

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "Completado":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completado</span>
      case "En Proceso":
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">En Proceso</span>
      case "Error":
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Error</span>
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{estado}</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
        <p className="text-audit-medium-gray mt-1">Generación y gestión de reportes de auditoría</p>
      </div>

      {/* Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generate New Report */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Generar Nuevo Reporte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="template" className="text-sm font-medium text-gray-700">
                Tipo de Reporte
              </Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar plantilla" />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-gray-500">{template.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date-from" className="text-sm font-medium text-gray-700">
                  Fecha Inicio
                </Label>
                <Input
                  id="date-from"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="date-to" className="text-sm font-medium text-gray-700">
                  Fecha Fin
                </Label>
                <Input
                  id="date-to"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="format" className="text-sm font-medium text-gray-700">
                Formato de Salida
              </Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerateReport} className="w-full bg-audit-bright-blue hover:bg-blue-600">
              <FileText className="w-4 h-4 mr-2" />
              Generar Reporte
            </Button>
          </CardContent>
        </Card>

        {/* Report Preview */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Vista Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Vista previa del reporte</p>
              <p className="text-sm text-gray-400">Selecciona un tipo de reporte para ver la vista previa</p>
              {selectedTemplate && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {reportTemplates.find((t) => t.id === selectedTemplate)?.name}
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Resumen ejecutivo</p>
                    <p>• Indicadores clave</p>
                    <p>• Gráficos y análisis</p>
                    <p>• Recomendaciones</p>
                    <p>• Anexos técnicos</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Reportes Recientes</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Fecha
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Nombre</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Tamaño</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {availableReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{report.nombre}</div>
                        <div className="text-xs text-gray-500">{report.descripcion}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs bg-audit-bright-blue bg-opacity-10 text-audit-bright-blue rounded">
                        {report.tipo}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{report.fechaCreacion}</td>
                    <td className="py-3 px-4 text-center">{getStatusBadge(report.estado)}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{report.tamaño}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-audit-medium-gray">Mostrando 4 de 12 reportes</p>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-audit-bright-blue bg-opacity-10 rounded-lg mr-4">
                <FileText className="w-6 h-6 text-audit-bright-blue" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Reporte Rápido</h3>
                <p className="text-sm text-gray-500">Generar reporte básico</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-audit-orange bg-opacity-10 rounded-lg mr-4">
                <Calendar className="w-6 h-6 text-audit-orange" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Programar Reporte</h3>
                <p className="text-sm text-gray-500">Automatizar generación</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-audit-yellow bg-opacity-10 rounded-lg mr-4">
                <Download className="w-6 h-6 text-audit-yellow" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Exportar Todo</h3>
                <p className="text-sm text-gray-500">Descargar todos los reportes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
