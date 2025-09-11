"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle, Database, Settings } from "lucide-react"

// Processing status data
const processingStats = {
  totalRegistros: 1247,
  registrosValidos: 1224,
  registrosInvalidos: 23,
  columnasFaltantes: 3,
  duplicados: 8,
}

// Column detection data
const detectedColumns = [
  { nombre: "fecha", tipo: "Date", estado: "detectado", confianza: 98 },
  { nombre: "ingreso", tipo: "Currency", estado: "detectado", confianza: 95 },
  { nombre: "gasto", tipo: "Currency", estado: "detectado", confianza: 97 },
  { nombre: "activo", tipo: "Currency", estado: "detectado", confianza: 92 },
  { nombre: "pasivo", tipo: "Currency", estado: "detectado", confianza: 94 },
  { nombre: "kwh", tipo: "Numeric", estado: "detectado", confianza: 89 },
  { nombre: "tco2", tipo: "Numeric", estado: "detectado", confianza: 91 },
  { nombre: "reciclaje", tipo: "Numeric", estado: "detectado", confianza: 88 },
  { nombre: "categoria", tipo: "Text", estado: "faltante", confianza: 0 },
  { nombre: "proveedor", tipo: "Text", estado: "parcial", confianza: 45 },
]

// Invalid records sample
const invalidRecords = [
  {
    fila: 45,
    error: "Fecha inválida",
    valor: "2024-13-45",
    sugerencia: "Formato correcto: YYYY-MM-DD",
  },
  {
    fila: 127,
    error: "Monto negativo en ingresos",
    valor: "-15000",
    sugerencia: "Verificar si es un gasto",
  },
  {
    fila: 234,
    error: "Campo obligatorio vacío",
    valor: "",
    sugerencia: "Completar campo 'activo'",
  },
  {
    fila: 456,
    error: "Valor fuera de rango",
    valor: "999999999",
    sugerencia: "Verificar cifras",
  },
  {
    fila: 789,
    error: "Formato de moneda incorrecto",
    valor: "€12.345,67",
    sugerencia: "Usar formato: 12345.67",
  },
]

function getStatusIcon(estado: string) {
  switch (estado) {
    case "detectado":
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case "faltante":
      return <XCircle className="w-4 h-4 text-red-500" />
    case "parcial":
      return <AlertCircle className="w-4 h-4 text-yellow-500" />
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />
  }
}

function getStatusBadge(estado: string) {
  switch (estado) {
    case "detectado":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Detectado</Badge>
    case "faltante":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Faltante</Badge>
    case "parcial":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Parcial</Badge>
    default:
      return <Badge variant="secondary">Desconocido</Badge>
  }
}

export function ProcessingContent() {
  const validPercentage = (processingStats.registrosValidos / processingStats.totalRegistros) * 100
  const invalidPercentage = (processingStats.registrosInvalidos / processingStats.totalRegistros) * 100

 // 🔹 Datos simulados de asociación con centros de costo
  const costCenters = [
    { fecha: "2024-01-15", movimiento: "Ingreso", monto: 12500, centro: "Ventas" },
    { fecha: "2024-01-16", movimiento: "Gasto", monto: 8200, centro: "Producción" },
    { fecha: "2024-01-18", movimiento: "Gasto", monto: 2100, centro: "Administración" },
    { fecha: "2024-01-20", movimiento: "Gasto", monto: 1500, centro: "Sostenibilidad" },
  ];

  const impactoAmbiental = [
  { fecha: "2024-01-12", actividad: "Consumo eléctrico", categoria: "Energía", cantidad: "1200 kWh", responsable: "Área Producción", estado: "Ejecutado" },
  { fecha: "2024-01-15", actividad: "Uso de agua en procesos", categoria: "Agua", cantidad: "15,000 L", responsable: "Planta Principal", estado: "Ejecutado" },
  { fecha: "2024-01-18", actividad: "Reciclaje de papel", categoria: "Residuos", cantidad: "350 kg", responsable: "Logística", estado: "Ejecutado" },
  { fecha: "2024-01-20", actividad: "Reforestación", categoria: "Mitigación", cantidad: "100 árboles", responsable: "Sostenibilidad", estado: "Pendiente" },
];


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Procesamiento de Datos</h1>
          <p className="text-audit-medium-gray mt-1">Validación y análisis de calidad de datos</p>
        </div>
        <Button className="bg-audit-bright-blue hover:bg-blue-600">
          <Settings className="w-4 h-4 mr-2" />
          Configurar Reglas
        </Button>
      </div>

      {/* Processing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Database className="w-8 h-8 text-audit-bright-blue mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {processingStats.totalRegistros.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Registros</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-green-700">
                  {processingStats.registrosValidos.toLocaleString()}
                </div>
                <div className="text-sm text-green-600">Registros Válidos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-red-700">{processingStats.registrosInvalidos}</div>
                <div className="text-sm text-red-600">Registros Inválidos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-yellow-700">{processingStats.columnasFaltantes}</div>
                <div className="text-sm text-yellow-600">Columnas Faltantes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Quality Progress */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Calidad de Datos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Registros Válidos</span>
              <span className="font-medium">{validPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={validPercentage} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Registros Inválidos</span>
              <span className="font-medium">{invalidPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={invalidPercentage} className="h-2 bg-red-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{processingStats.duplicados}</div>
              <div className="text-sm text-gray-600">Duplicados Detectados</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">98.2%</div>
              <div className="text-sm text-gray-600">Precisión General</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">2.3 min</div>
              <div className="text-sm text-gray-600">Tiempo de Procesamiento</div>
            </div>
          </div>
        </CardContent>
      </Card>

{/* Expense Classification */}
<Card className="bg-white shadow-sm border-0">
  <CardHeader>
    <CardTitle className="text-lg font-semibold text-gray-900">
      Clasificación de Gastos
    </CardTitle>
    <p className="text-sm text-audit-medium-gray">
      Agrupación de gastos según su naturaleza y función
    </p>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">Categoría</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Ejemplos</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Tipo</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium text-gray-900">Operativos</td>
            <td className="py-3 px-4 text-gray-600">Nómina, arriendo, suministros</td>
            <td className="py-3 px-4 text-gray-600">Fijos / Variables</td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium text-gray-900">Administrativos</td>
            <td className="py-3 px-4 text-gray-600">Salarios gerencia, papelería</td>
            <td className="py-3 px-4 text-gray-600">Fijos</td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium text-gray-900">Ventas / Comerciales</td>
            <td className="py-3 px-4 text-gray-600">Publicidad, comisiones, transporte</td>
            <td className="py-3 px-4 text-gray-600">Variables</td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium text-gray-900">Financieros</td>
            <td className="py-3 px-4 text-gray-600">Intereses, comisiones bancarias</td>
            <td className="py-3 px-4 text-gray-600">Fijos</td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium text-gray-900">Ambientales</td>
            <td className="py-3 px-4 text-gray-600">Gestión residuos, reducción emisiones</td>
            <td className="py-3 px-4 text-gray-600">Sostenibles</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 font-medium text-gray-900">Sociales</td>
            <td className="py-3 px-4 text-gray-600">Programas de bienestar, capacitación</td>
            <td className="py-3 px-4 text-gray-600">Sostenibles</td>
          </tr>
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>




 

  
    <div className="space-y-6">
      {/* 🔹 Asociación con Centros de Costo */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Asociación con Centros de Costo
          </CardTitle>
          <p className="text-sm text-gray-500">
            Relación de ingresos y gastos con las áreas de la organización
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Movimiento</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Monto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Centro de Costo</th>
                </tr>
              </thead>
              <tbody>
                {costCenters.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{item.fecha}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{item.movimiento}</td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {item.monto.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.centro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  
    <div className="p-6">
      {/* Registro de Impacto Ambiental */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
             Registro de actividades de impacto ambiental
          </CardTitle>
          
        </CardHeader>
  <CardContent>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Fecha</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actividad</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Categoría</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Cantidad</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Responsable</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Estado</th>
            </tr>
          </thead>
          <tbody>
            {impactoAmbiental.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-600">{item.fecha}</td>
                <td className="py-3 px-4 font-medium text-gray-900">{item.actividad}</td>
                <td className="py-3 px-4 text-gray-600">{item.categoria}</td>
                <td className="py-3 px-4 text-gray-600">{item.cantidad}</td>
                <td className="py-3 px-4 text-gray-600">{item.responsable}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    item.estado === "Ejecutado"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {item.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </CardContent>
      </Card>
    </div>
  




      {/* Column Detection */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Detección de Columnas</CardTitle>
          <p className="text-sm text-audit-medium-gray">Análisis automático de estructura de datos</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Columna</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tipo Detectado</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Confianza</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {detectedColumns.map((column, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{column.nombre}</td>
                    <td className="py-3 px-4 text-gray-600">{column.tipo}</td>
                    <td className="py-3 px-4 text-center">{getStatusBadge(column.estado)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end">
                        {getStatusIcon(column.estado)}
                        <span className="ml-2 font-medium">{column.confianza}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invalid Records */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Registros Inválidos</CardTitle>
          <p className="text-sm text-audit-medium-gray">Errores detectados que requieren corrección</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fila</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Error</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Valor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Sugerencia</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invalidRecords.map((record, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{record.fila}</td>
                    <td className="py-3 px-4 text-red-600">{record.error}</td>
                    <td className="py-3 px-4 font-mono text-gray-900 bg-gray-100 rounded px-2 py-1 max-w-xs truncate">
                      {record.valor}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{record.sugerencia}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button variant="outline" size="sm">
                          Corregir
                        </Button>
                        <Button variant="outline" size="sm">
                          Ignorar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-audit-medium-gray">
              Mostrando 5 de {processingStats.registrosInvalidos} errores
            </p>
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
