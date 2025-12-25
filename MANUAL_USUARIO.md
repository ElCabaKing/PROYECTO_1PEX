# Manual de Usuario - PROYECTO_1

## Sistema de Gestión de Reparaciones

### Introducción

PROYECTO_1 es un sistema completo para la gestión de reparaciones de equipos. Permite a los usuarios y administradores gestionar trabajos de reparación, controlar el progreso, mantener un historial completo de todas las operaciones y comunicarse en tiempo real a través de un sistema de chat integrado. Incluye funcionalidades avanzadas como aprobación de partes y seguimiento detallado de reparaciones.

## Primeros Pasos

### 1. Acceso al Sistema

1. Abra su navegador web
2. Navegue a la URL del sistema (proporcionada por su administrador)
3. Ingrese sus credenciales de usuario

### 2. Recuperación de Contraseña

Si olvidó su contraseña:
1. En la pantalla de login, haga clic en "¿Olvidó su contraseña?"
2. Ingrese su nombre de usuario y su codigo de seguridad
3. Si todo esta correcta proceda a cambiar su contraseña

### 3. Consulta de Reparación por Código (Clientes)

Si es un cliente y tiene un código de reparación:
1. En la página principal, ingrese el código en el campo "Código"
2. Haga clic en "Buscar"
3. Verá los detalles de su reparación y podrá chatear con el equipo técnico

## Funcionalidades Principales

### Dashboard Principal

Después del login, accederá al menú principal con las siguientes opciones:

- **Mis Trabajos**: Ver trabajos asignados
- **Usuarios**: Gestión de usuarios (solo administradores)
- **Servicios**: Gestión de servicios (solo administradores)
- **Repuestos**: Gestión de repuestos (solo administradores)
- **Historial**: Ver trabajos pendientes y completados

### Consulta de Reparación (Clientes)

1. Ingrese el código de reparación proporcionado
2. Verá los detalles: ID, cliente, fecha de inicio, estado, total
3. Podrá chatear con el equipo técnico para consultas o actualizaciones

### Sistema de Chat

#### Chatear con el Equipo Técnico

1. Desde la vista de detalles de reparación, acceda al chat
2. Envíe mensajes escribiendo en el campo de texto y presionando "ENVIAR"
3. Reciba respuestas del equipo técnico en tiempo real

#### Aprobación de Partes (Clientes)

Cuando el técnico solicite aprobación para una parte:
1. Aparecerán botones "Aceptar" y "Rechazar" en el mensaje correspondiente
2. Haga clic en "Aceptar" para aprobar la solicitud de parte
3. Haga clic en "Rechazar" para denegar la solicitud
4. El estado se actualizará automáticamente ("APROBADA" o "RECHAZADA")

### Gestión de Reparaciones

### Gestión de Reparaciones

#### Ver Lista de Reparaciones Pendientes

1. Desde el menú principal, seleccione la opción correspondiente
2. Verá una lista de equipos pendientes de reparación
3. Cada entrada muestra: ID, problema, fecha de ingreso

#### Aceptar un Trabajo de Reparación

1. Seleccione un trabajo de la lista
2. Haga clic para "Aceptar"
3. El trabajo pasará a estado "En Progreso"

#### Gestionar Detalles de Reparación

Una vez aceptado un trabajo:

1. **Ver Información del Trabajo**:
   - ID del pedido
   - Problema reportado
   - Estado actual
   - Total acumulado

2. **Agregar Detalles de Reparación**:
   - Haga clic en el botón "+" en la tabla
   - Seleccione el tipo de detalle (Servicio o Repuesto)
   - En caso de ser un Repuesto especificar unidades (en caso de no
   especificar sera entendido por 1 unidad)
   - Guarde los cambios

3. **Finalizar Reparación**:
   - Una vez completado todo el trabajo
   - Haga clic en "Terminar"
   - El trabajo pasará a estado "Completado"

4. **Entrega del equipo**
   - Una vez el cliente venga  a retirar su equipo seleccione la opcion Historia
   en el menu de inicio
   - En caso de ser el tecnico designado puede acceder desde sus tareas
   - En caso de ser un servicio seleccione el deseado haciendo doble click
   - Dar en la opcion ENTREGAR y suministre el dispositivo al cliente
   - El trabajo pasara a estado "Entregado"


### Gestión de Usuarios (Solo Administradores)

#### Ver Lista de Usuarios

1. Acceda al módulo "Usuarios"
2. Verá una tabla con todos los usuarios registrados
3. Información mostrada: Nombre, Apellido, Usuario, Rol, Estado

#### Crear Nuevo Usuario

1. Haga clic en "Crear Usuario"
2. Complete el formulario:
   - Nombre
   - Apellido
   - Usuario (se genera automáticamente)
   - Rol (Admin/Técnico/Usuario)
3. Guarde los cambios

#### Modificar Usuario

1. Seleccione un usuario de la lista
2. Modifique la información necesaria
3. Cambie el rol si es necesario
4. Active/desactive el usuario según corresponda


### Historial de Reparaciones

1. Acceda al módulo "Historial"
2. Verá todos los trabajos enlistado

## Roles y Permisos

### Administrador
- Acceso completo al sistema
- Gestión de usuarios
- Ver todos los trabajos
- Modificar cualquier reparación
- Acceso a todos los chats activos
- Administrar Servicios
- Administrar stock de repuestos

### Usuario (Técnico)
- Acceso limitado al sistema
- Ver trabajos asignados
- Gestionar reparaciones en progreso
- Agregar detalles técnicos
- Finalizar trabajos
- Acceso a chats de reparaciones asignadas
- Solicitar aprobación de partes a clientes

## Consejos de Uso

### Mejores Prácticas

1. **Actualice regularmente**: Mantenga los detalles de reparación actualizados
2. **Sea específico**: Describa claramente los trabajos realizados
3. **Verifique costos**: Asegúrese de que los costos sean precisos
4. **Complete trabajos**: No deje trabajos pendientes sin finalizar
6. **Revise solicitudes de partes(Clientes)**: Aprobar o rechazar partes solicitadas de manera oportuna


## Solución de Problemas

### Problemas Comunes

#### No puedo acceder al sistema
- Verifique sus credenciales
- Contacte al administrador si el problema persiste

#### Error al guardar cambios
- Verifique conexión a internet
- Intente nuevamente
- Contacte soporte técnico

#### Datos no se actualizan
- Actualice la página (F5)
- Verifique permisos de usuario

#### Problemas con el chat
- Asegúrese de tener conexión a internet
- Los mensajes se actualizan automáticamente
- Si no ve botones de aprobación, recargue la página

#### Código de reparación no encontrado
- Verifique que el código sea correcto
- Contacte al técnico asignado si el problema persiste

---

*Versión 1.1 - Diciembre 2025*
*Incluye funcionalidades de chat y aprobación de partes*
