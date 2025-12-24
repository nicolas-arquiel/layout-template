import React, { useMemo } from 'react';
import AnalyticalCube from '@core/components/analytical-cube/AnalyticalCube';

const AnalyticalCubeDemo = () => {
  // Mock Data
  const dimensions = useMemo(() => [
    {
      id: 'carrera',
      idCampo: 'id_carrera',
      campo: 'nombre_carrera',
      nombre: 'Carrera',
      tipo: 'dimension',

    },
    {
      id: 'plan',
      idCampo: 'id_plan',
      campo: 'nombre_plan',
      nombre: 'Plan de Estudio',
      tipo: 'dimension',

    },
    {
      id: 'materia',
      idCampo: 'id_materia',
      campo: 'nombre_materia',
      nombre: 'Materia',
      tipo: 'dimension',

    },
    {
      id: 'anio_cursada',
      idCampo: 'anio',
      campo: 'anio',
      nombre: 'Año Cursada',
      tipo: 'dimension',

    },
    {
      id: 'sede',
      idCampo: 'id_sede',
      campo: 'nombre_sede',
      nombre: 'Sede',
      tipo: 'dimension',

    }
  ], []);

  const measures = useMemo(() => [
    {
      id: 'inscriptos',
      campo: 'cant_inscriptos',
      nombre: 'Inscripciones',
      tipo: 'medida',

    },
    {
      id: 'aprobados',
      campo: 'cant_aprobados',
      nombre: 'Aprobados',
      tipo: 'medida',

    },
    {
      id: 'desaprobados',
      campo: 'cant_desaprobados',
      nombre: 'Desaprobados',
      tipo: 'medida',

    },
    {
      id: 'ausentes',
      campo: 'cant_ausentes',
      nombre: 'Ausentes',
      tipo: 'medida',

    }
  ], []);

  const data = useMemo(() => {
    const records = [];
    const carreras = [
      { id: 1, nombre: 'Ingeniería en Sistemas' },
      { id: 2, nombre: 'Licenciatura en Administración' },
      { id: 3, nombre: 'Abogacía' }
    ];
    
    const sedes = [
      { id: 1, nombre: 'Sede Central' },
      { id: 2, nombre: 'Sede Norte' }
    ];

    // Generar datos aleatorios
    for (let c of carreras) {
      for (let s of sedes) {
        for (let anio = 2020; anio <= 2024; anio++) {
            // Planes
            const planId = c.id * 100 + 1; // Un plan por carrera pa simplificar
            const planNombre = `Plan ${c.nombre} 2010`;
            
            // Materias (3 materias por carrera)
            for (let m = 1; m <= 3; m++) {
                const materiaId = planId * 100 + m;
                const materiaNombre = `Materia ${m} de ${c.nombre}`;
                
                records.push({
                    id_carrera: c.id,
                    nombre_carrera: c.nombre,
                    id_plan: planId,
                    nombre_plan: planNombre,
                    id_materia: materiaId,
                    nombre_materia: materiaNombre,
                    anio: anio,
                    id_sede: s.id,
                    nombre_sede: s.nombre,
                    
                    // Medidas random
                    cant_inscriptos: Math.floor(Math.random() * 50) + 10,
                    cant_aprobados: Math.floor(Math.random() * 40),
                    cant_desaprobados: Math.floor(Math.random() * 10),
                    cant_ausentes: Math.floor(Math.random() * 5)
                });
            }
        }
      }
    }
    return records;
  }, []);

  return (
    <div className="p-4 h-full w-full">
      <AnalyticalCube 
        title="Demo Cubo Académico"
        data={data}
        dimensions={dimensions}
        measures={measures}
        initialConfig={{
            medidas: ['inscriptos'],
            filas: ['carrera', 'plan'],
            columnas: ['anio_cursada'],
            filtros: []
        }}
      />
    </div>
  );
};

export default AnalyticalCubeDemo;
