"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"



// Sample data for the table
const sampleData = [
  {
    id: 1,
    fecha: "2024-01-15",
    ingreso: 12500,
    gasto: 8200,
    activo: 65000,
    pasivo: 28000,
    inventario: 250,
    kwh: 1200,
    tco2: 10.5,
    agua: 1000,
    reciclaje: 55,
  },
  {
    id: 2,
    fecha: "2024-01-16",
    ingreso: 8900,
    gasto: 5600,
    activo: 66200,
    pasivo: 27800,
    inventario: 250,
    kwh: 1150,
    tco2: 9.8,
    agua: 1000,
    reciclaje: 48,
  },
  {
    id: 3,
    fecha: "2024-01-17",
    ingreso: 15600,
    gasto: 9800,
    activo: 67100,
    pasivo: 28200,
    inventario: 250,
    kwh: 1300,
    tco2: 11.2,
    agua: 1000,
    reciclaje: 62,
  },
  {
    id: 4,
    fecha: "2024-01-18",
    ingreso: 11200,
    gasto: 7400,
    activo: 68500,
    pasivo: 27600,
    inventario: 250,
    kwh: 1180,
    tco2: 10.1,
     agua: 1000,
    reciclaje: 51,
  },
  {
    id: 5,
    fecha: "2024-01-19",
    ingreso: 13800,
    gasto: 8900,
    activo: 69200,
    pasivo: 28100,
    inventario: 250,
    kwh: 1250,
    tco2: 10.8,
    agua: 1000,
    reciclaje: 58,
  },
]

export function DataInputContent() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ingreso de Datos</h1>
        <p className="text-audit-medium-gray mt-1">Carga y gestión de archivos de datos financieros y sostenibles</p>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Cargar Archivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-audit-bright-blue bg-blue-50" : "border-gray-300 hover:border-audit-bright-blue"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-audit-medium-gray mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Arrastra tu archivo aquí o haz clic para seleccionar
              </p>
              <p className="text-sm text-audit-medium-gray mb-4">Formatos soportados: CSV, Excel (.xlsx, .xls)</p>
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Button asChild className="bg-audit-bright-blue hover:bg-blue-600">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Seleccionar Archivo
                </label>
              </Button>
            </div>

            {uploadedFile && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-800">Archivo cargado exitosamente:</span>
                </div>
                <p className="text-sm text-green-700 mt-1">{uploadedFile.name}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Status */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Estado de Carga</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-audit-medium-gray mr-2" />
                <span className="text-sm font-medium">Archivos Procesados</span>
              </div>
              <span className="text-lg font-bold text-audit-bright-blue">24</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">Registros Válidos</span>
              </div>
              <span className="text-lg font-bold text-green-600">1,247</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-audit-yellow mr-2" />
                <span className="text-sm font-medium">Registros con Errores</span>
              </div>
              <span className="text-lg font-bold text-audit-yellow">23</span>
            </div>

            <Button className="w-full bg-orange-600 mt-4 hover:bg-orange-600 !important">Procesar Datos</Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Preview Table */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Vista Previa de Datos</CardTitle>
          <p className="text-sm text-audit-medium-gray">Muestra de los últimos registros cargados</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Ingreso ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Gasto ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Activo ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Pasivo ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Inventario ($)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">kWh</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">CO₂</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Agua</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Residuos (kg)</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{row.fecha}</td>
                    <td className="py-3 px-4 text-right text-green-600 font-medium">{row.ingreso.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-red-600 font-medium">{row.gasto.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-gray-900">{row.activo.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-gray-900">{row.pasivo.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-gray-900">{row.inventario.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-audit-bright-blue">{row.kwh}</td>
                    <td className="py-3 px-4 text-right text-audit-yellow">{row.tco2}</td>
                    <td className="py-3 px-4 text-right text-audit-yellow">{row.agua}</td>
                    <td className="py-3 px-4 text-right text-audit-orange">{row.reciclaje}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-audit-medium-gray">Mostrando 5 de 50 registros</p>
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
