# Sistema de Inspección de Farmacias (SIF)

Grupo 4: Sistema de Inspección de Farmacias (SIF)

Por Implementar:
Frontend:
- Admin:
  -La tabla de inspectores y de solicitudes no le están llegando los datos necesarios del backend para consumar la funcionalidad (es decir hay datos del backend que faltan por conectar, el procedure se hizo hoy)
  -Falta eliminar del modal el campo de ID a la hora de crear el Usuario
- Propietario:
  - El usuario puede visualizar las solicitudes, pero no puede realizarlas.
- Inspector:
  - La aplicacion puede visualizar las inspecciones que le corresponden, pero no puede hacer las correspondientes observaciones.

Backend:
  - Falta de RequestController: Cambio de Nombre, Cambio de Propietario, y Cambio de Dirección
----- 

# Requerimientos

# Gestión de Usuarios

## Registro de Propietarios de Farmacias
- Proporcionar un formulario para que los propietarios registren sus datos personales y profesionales, incluyendo información legal requerida.

## Registro de Inspectores Estatales
- Habilitar el registro de inspectores con credenciales verificadas para acceder a las funcionalidades de evaluación.

## Autenticación y Autorización
- Implementar mecanismos de inicio de sesión seguros y asignación de roles para controlar el acceso a diferentes módulos de la plataforma.

# Gestión de Farmacias

## Registro de Información
- Permitir a los propietarios ingresar detalles de la farmacia, como ubicación, tipo de establecimiento (retail, hospitalario), responsables técnicos, licencias y permisos.

# Historial de Operaciones
- Mantener un registro de inspecciones, sanciones y renovaciones de licencias asociadas a cada farmacia.

# Gestión de Documentación

## Estado de Documentación
- Registrar y gestionar el estado de la evaluación documental, asegurando que los documentos enviados por las farmacias sean verificados y marcados como conformes o no conformes.

## Historial de Documentación
- Mantener un historial de las revisiones documentales realizadas para cada farmacia, incluyendo fechas, evaluador y observaciones.

# Gestión de Inspecciones

## Estatus de Inspecciones
- Integrar un módulo para registrar los resultados de inspecciones (cumple/no cumple) y observaciones relevantes.

## Notificación de Seguimiento
- Implementar notificaciones automáticas para recordar inspecciones pendientes o vencidas.

## Reinspecciones Automáticas
- Programar automáticamente reinspecciones en caso de incumplimientos detectados.

# Certificación

## Generación Automática de Certificados
- Crear certificados electrónicos basados en la evaluación documental y de inspección.

## Control de Vencimientos
- Registrar las fechas de emisión y vencimiento de los certificados.

# Auditoría y Seguimiento

## Seguimiento Centralizado
- Proveer una vista consolidada del estado de las farmacias, incluyendo trámites en curso, vencimientos y resultados de inspecciones.

## Registro de Actividades
- Mantener un registro de todas las actividades relacionadas con cada farmacia, incluyendo actualizaciones en la documentación, inspecciones y certificaciones.

# Interfaz para Evaluadores

## Manejo de Observaciones
- Incluir un campo para que los evaluadores registren observaciones específicas durante las inspecciones o evaluaciones documentales.

## Validación de Datos
- Asegurar que los evaluadores puedan validar automáticamente las fechas ingresadas para evitar errores.








