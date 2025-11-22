import { BookOpen, Users, Calendar, DollarSign } from 'react-feather'

/**
 * Componente de página Inscripción Curso
 * Formulario para inscribir estudiantes a cursos
 *
 * @returns {JSX.Element}
 */
export default function InscripcionCurso() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica de envío
  }

  const cursos = [
    { id: 1, nombre: 'Matemáticas Básicas', disponibles: 15 },
    { id: 2, nombre: 'Programación Web', disponibles: 8 },
    { id: 3, nombre: 'Diseño Gráfico', disponibles: 20 },
  ]

  const estudiantes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos López' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Inscripción a Curso
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Inscribe estudiantes en los cursos disponibles
          </p>
        </div>
        <BookOpen size={32} className="text-gray-400" />
      </div>

      {/* Form Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Selection */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Selección de Curso
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Curso */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Curso
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <BookOpen size={20} className="text-gray-400" />
                  </div>
                  <select
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Seleccionar curso...</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.nombre} ({curso.disponibles} disponibles)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Estudiante */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Estudiante
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Users size={20} className="text-gray-400" />
                  </div>
                  <select
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Seleccionar estudiante...</option>
                    {estudiantes.map((estudiante) => (
                      <option key={estudiante.id} value={estudiante.id}>
                        {estudiante.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Información de Horario
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Fecha Inicio */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fecha de Inicio
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Calendar size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Fecha Fin */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fecha de Finalización
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Calendar size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Horario */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Horario
                </label>
                <select className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <option>Matutino (8:00 - 12:00)</option>
                  <option>Vespertino (13:00 - 17:00)</option>
                  <option>Nocturno (18:00 - 22:00)</option>
                </select>
              </div>

              {/* Modalidad */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Modalidad
                </label>
                <select className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <option>Presencial</option>
                  <option>Virtual</option>
                  <option>Híbrido</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Información de Pago
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Costo */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Costo del Curso
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <DollarSign size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Método de Pago */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Método de Pago
                </label>
                <select className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <option>Efectivo</option>
                  <option>Tarjeta de Crédito</option>
                  <option>Transferencia Bancaria</option>
                  <option>Pago en Línea</option>
                </select>
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Observaciones
            </label>
            <textarea
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Notas adicionales sobre la inscripción..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              <BookOpen size={20} />
              <span>Confirmar Inscripción</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
