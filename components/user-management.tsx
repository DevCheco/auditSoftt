"use client"

import { useState } from "react"
import { Edit, Trash2, Plus, X } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "Auditor" | "Gerente financiero" | "Docente" | "Estudiante"
  status: boolean
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "María González",
    email: "maria.gonzalez@auditsoft.com",
    role: "Auditor",
    status: true,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@auditsoft.com",
    role: "Gerente financiero",
    status: true,
  },
  {
    id: "3",
    name: "Ana Martínez",
    email: "ana.martinez@auditsoft.com",
    role: "Docente",
    status: false,
  },
  {
    id: "4",
    name: "Luis Pérez",
    email: "luis.perez@auditsoft.com",
    role: "Estudiante",
    status: true,
  },
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "" as User["role"] | "",
    status: true,
  })

  const handleCreateUser = () => {
    setEditingUser(null)
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      status: true,
    })
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    })
    setIsModalOpen(true)
  }

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.role) return

    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData, role: formData.role as User["role"] } : user,
        ),
      )
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role as User["role"],
        status: formData.status,
      }
      setUsers([...users, newUser])
    }

    setIsModalOpen(false)
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      status: true,
    })
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: !user.status } : user)))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-audit-dark-blue">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">Administración de perfiles y roles</p>
        </div>
        <button
          onClick={handleCreateUser}
          className="bg-audit-bright-blue hover:bg-audit-bright-blue/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Crear Usuario
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Nombre</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Correo electrónico</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Rol asignado</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
              <th className="text-right py-3 px-4 font-medium text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as User["role"])}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-audit-bright-blue"
                  >
                    <option value="Auditor">Auditor</option>
                    <option value="Gerente financiero">Gerente financiero</option>
                    <option value="Docente">Docente</option>
                    <option value="Estudiante">Estudiante</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.status}
                        onChange={() => handleToggleStatus(user.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-audit-bright-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-audit-bright-blue"></div>
                    </label>
                    <span className={`text-sm ${user.status ? "text-green-600" : "text-red-600"}`}>
                      {user.status ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-audit-bright-blue hover:text-audit-bright-blue/80 p-1 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre completo"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-audit-bright-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="usuario@auditsoft.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-audit-bright-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingUser ? "Dejar vacío para mantener actual" : "Contraseña"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-audit-bright-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as User["role"] })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-audit-bright-blue"
                >
                  <option value="">Seleccionar rol</option>
                  <option value="Auditor">Auditor</option>
                  <option value="Gerente financiero">Gerente financiero</option>
                  <option value="Docente">Docente</option>
                  <option value="Estudiante">Estudiante</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-audit-bright-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-audit-bright-blue"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">Usuario activo</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveUser}
                className="px-4 py-2 bg-audit-bright-blue text-white rounded-lg hover:bg-audit-bright-blue/90 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
