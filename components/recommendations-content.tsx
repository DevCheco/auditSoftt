"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Leaf, Shield, DollarSign, CheckCircle, Clock } from "lucide-react"

// AI Recommendations data
const recommendations = [
  {
    id: 1,
    titulo: "Reducir Gastos Operativos",
    descripcion:
      "Se detectó un incremento del 15% en gastos operativos. Revisar contratos de servicios y optimizar procesos.",
    categoria: "Financiero",
    prioridad: "alta",
    impactoEstimado: "€12,000/mes",
    fechaCreacion: "2024-01-20",
    estado: "pendiente",
    acciones: [
      "Revisar contratos de proveedores",
      "Implementar sistema de control de gastos",
      "Negociar tarifas de servicios públicos",
    ],
  },
  {
    id: 2,
    titulo: "Implementar Eficiencia Energética",
    descripcion: "El consumo energético ha aumentado 8%. Considerar inversión en tecnologías más eficientes.",
    categoria: "Sostenibilidad",
    prioridad: "media",
    impactoEstimado: "€8,500/año",
    fechaCreacion: "2024-01-19",
    estado: "en_progreso",
    acciones: ["Auditoría energética completa", "Instalación de sistemas LED", "Optimización de sistemas HVAC"],
  },
  {
    id: 3,
    titulo: "Plan de Reducción de Emisiones",
    descripcion: "Para cumplir objetivos de carbono neutralidad, implementar plan de reducción de emisiones CO₂.",
    categoria: "Sostenibilidad",
    prioridad: "alta",
    impactoEstimado: "50 tCO₂/año",
    fechaCreacion: "2024-01-18",
    estado: "pendiente",
    acciones: ["Transición a energías renovables", "Programa de movilidad sostenible", "Compensación de emisiones"],
  },
  {
    id: 4,
    titulo: "Fortalecer Controles Internos",
    descripcion: "Se identificaron 8 transacciones de alto riesgo. Reforzar sistemas de detección de fraudes.",
    categoria: "Riesgos",
    prioridad: "alta",
    impactoEstimado: "Reducir riesgo 40%",
    fechaCreacion: "2024-01-17",
    estado: "completado",
    acciones: [
      "Implementar autenticación de dos factores",
      "Revisar límites de transacciones",
      "Capacitación en detección de fraudes",
    ],
  },
  {
    id: 5,
    titulo: "Optimizar Flujo de Caja",
    descripcion: "Mejorar la rotación de cartera y reducir días de cobro para optimizar liquidez.",
    categoria: "Financiero",
    prioridad: "media",
    impactoEstimado: "€25,000 liquidez",
    fechaCreacion: "2024-01-16",
    estado: "en_progreso",
    acciones: [
      "Automatizar proceso de facturación",
      "Implementar descuentos por pronto pago",
      "Revisar políticas de crédito",
    ],
  },
]

function getPriorityBadge(prioridad: string) {
  switch (prioridad) {
    case "alta":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Alta</Badge>
    case "media":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Media</Badge>
    case "baja":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Baja</Badge>
    default:
      return <Badge variant="secondary">Desconocida</Badge>
  }
}

function getStatusBadge(estado: string) {
  switch (estado) {
    case "pendiente":
      return <Badge variant="destructive">Pendiente</Badge>
    case "en_progreso":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En Progreso</Badge>
    case "completado":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completado</Badge>
    default:
      return <Badge variant="secondary">{estado}</Badge>
  }
}

function getCategoryIcon(categoria: string) {
  switch (categoria) {
    case "Financiero":
      return <DollarSign className="w-5 h-5 text-audit-bright-blue" />
    case "Sostenibilidad":
      return <Leaf className="w-5 h-5 text-green-500" />
    case "Riesgos":
      return <Shield className="w-5 h-5 text-audit-red" />
    default:
      return <Lightbulb className="w-5 h-5 text-audit-orange" />
  }
}

export function RecommendationsContent() {
  const pendingCount = recommendations.filter((r) => r.estado === "pendiente").length
  const inProgressCount = recommendations.filter((r) => r.estado === "en_progreso").length
  const completedCount = recommendations.filter((r) => r.estado === "completado").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recomendaciones IA</h1>
          <p className="text-audit-medium-gray mt-1">Sugerencias inteligentes para optimizar el rendimiento</p>
        </div>
        <Button className="bg-audit-bright-blue hover:bg-blue-600">
          <Lightbulb className="w-4 h-4 mr-2" />
          Generar Nuevas
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-red-50 border-red-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <div className="text-sm font-medium text-red-800">Pendientes</div>
                  <div className="text-xs text-red-600">Requieren atención</div>
                </div>
              </div>
              <span className="text-2xl font-bold text-red-600">{pendingCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-yellow-500 mr-3" />
                <div>
                  <div className="text-sm font-medium text-yellow-800">En Progreso</div>
                  <div className="text-xs text-yellow-600">Implementándose</div>
                </div>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{inProgressCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <div className="text-sm font-medium text-green-800">Completadas</div>
                  <div className="text-xs text-green-600">Implementadas</div>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">{completedCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <Card key={recommendation.id} className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">{getCategoryIcon(recommendation.categoria)}</div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900">{recommendation.titulo}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{recommendation.descripcion}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getPriorityBadge(recommendation.prioridad)}
                  {getStatusBadge(recommendation.estado)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Impacto Estimado</h4>
                  <p className="text-lg font-bold text-audit-bright-blue">{recommendation.impactoEstimado}</p>
                  <p className="text-xs text-gray-500 mt-1">Creado: {recommendation.fechaCreacion}</p>
                </div>
                <div className="lg:col-span-2">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Acciones Recomendadas</h4>
                  <ul className="space-y-1">
                    {recommendation.acciones.map((accion, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-audit-bright-blue rounded-full mr-2" />
                        {accion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
                <Button size="sm" className="bg-audit-bright-blue hover:bg-blue-600">
                  Implementar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
