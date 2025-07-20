export const formMappings = {
  "animales": {
    "description": "Formularios relacionados con la gestión de animales.",
    "forms": [
      {
        "id": "createAnimalForm",
        "triggerButtonLabel": "Crear Animal",
        "title": "Registrar Nuevo Animal",
        "endpoint": "POST /admin/animales/crear",
        "fields": [
          { "name": "nombre", "label": "Nombre", "type": "text", "placeholder": "Ej: Firulais", "required": true },
          { "name": "especie", "label": "Especie", "type": "text", "placeholder": "Ej: Perro", "required": true },
          { "name": "raza", "label": "Raza", "type": "text", "placeholder": "Ej: Labrador", "required": true },
          { "name": "edad", "label": "Edad (años)", "type": "number", "placeholder": "Ej: 3", "required": true },
          { "name": "sexo", "label": "Sexo", "type": "select", "options": [{ "value": "macho", "text": "Macho" }, { "value": "hembra", "text": "Hembra" }], "required": true },
          { "name": "color", "label": "Color", "type": "text", "placeholder": "Ej: Negro", "required": true },
          { "name": "tamanio", "label": "Tamaño", "type": "select", "options": [{ "value": "pequenio", "text": "Pequeño" }, { "value": "mediano", "text": "Mediano" }, { "value": "grande", "text": "Grande" }], "required": true },
          { "name": "esta_castrado", "label": "Está Castrado", "type": "checkbox", "required": false },
          { "name": "foto", "label": "Foto del Animal", "type": "file", "required": false },
          { "name": "observaciones", "label": "Observaciones", "type": "textarea", "placeholder": "Cualquier detalle relevante sobre el animal...", "required": false }
        ]
      },
      {
        "id": "editAnimalForm",
        "triggerButtonLabel": "Editar",
        "title": "Editar Información del Animal",
        "endpoint": "PUT /animales/:id",
        "fields": [
          { "name": "nombre", "label": "Nombre", "type": "text", "placeholder": "Ej: Firulais", "required": true },
          { "name": "especie", "label": "Especie", "type": "text", "placeholder": "Ej: Perro", "required": true },
          { "name": "raza", "label": "Raza", "type": "text", "placeholder": "Ej: Labrador", "required": true },
          { "name": "edad", "label": "Edad (años)", "type": "number", "placeholder": "Ej: 3", "required": true },
          { "name": "sexo", "label": "Sexo", "type": "select", "options": [{ "value": "macho", "text": "Macho" }, { "value": "hembra", "text": "Hembra" }], "required": true },
          { "name": "color", "label": "Color", "type": "text", "placeholder": "Ej: Negro", "required": true },
          { "name": "tamanio", "label": "Tamaño", "type": "select", "options": [{ "value": "pequenio", "text": "Pequeño" }, { "value": "mediano", "text": "Mediano" }, { "value": "grande", "text": "Grande" }], "required": true },
          { "name": "esta_castrado", "label": "Está Castrado", "type": "checkbox", "required": false },
          { "name": "observaciones", "label": "Observaciones", "type": "textarea", "placeholder": "Cualquier detalle relevante sobre el animal...", "required": false }
        ]
      },
      {
        "id": "patentarAnimalForm",
        "triggerButtonLabel": "Patentar",
        "title": "Confirmar Patentamiento",
        "endpoint": "POST /animales/:id/patentar",
        "confirmationText": "¿Estás seguro de que deseas generar una nueva patente para este animal?"
      },
      {
        "id": "deactivateAnimalForm",
        "triggerButtonLabel": "Baja",
        "title": "Dar de Baja Animal",
        "endpoint": "PUT /animales/:id/deshabilitar",
        "fields": [
          { "name": "motivo", "label": "Motivo de la baja", "type": "textarea", "placeholder": "Ej: Fallecido, Transferido, etc.", "required": true }
        ]
      },
      {
        "id": "activateAnimalForm",
        "triggerButtonLabel": "Alta",
        "title": "Dar de Alta Animal",
        "endpoint": "PUT /animales/:id/activar",
        "fields": [
          { "name": "motivo", "label": "Motivo de la reactivación", "type": "textarea", "placeholder": "Ej: Encontrado, Corrección de error, etc.", "required": true }
        ]
      },
      {
        "id": "assignOwnerForm",
        "triggerButtonLabel": "Propietario",
        "title": "Asignar/Cambiar Propietario",
        "endpoint": "PUT /adopciones/actualizar/:id",
        "fields": [
          { "name": "id_propietario", "label": "ID del Usuario Propietario", "type": "number", "placeholder": "Introduce el ID numérico del usuario", "required": true }
        ]
      }
    ]
  },
  "usuarios": {
    "description": "Formularios relacionados con la gestión de usuarios.",
    "forms": [
      {
        "id": "editUserForm",
        "triggerButtonLabel": "Editar",
        "title": "Editar Usuario",
        "endpoint": "PUT /admin/usuarios/:id",
        "fields": [
          { "name": "nombre", "label": "Nombre", "type": "text", "required": true },
          { "name": "apellido", "label": "Apellido", "type": "text", "required": true },
          { "name": "domicilio", "label": "Domicilio", "type": "text", "required": true },
          { "name": "telefono", "label": "Teléfono", "type": "text", "required": true },
          { "name": "dni", "label": "DNI", "type": "text", "required": true },
          { "name": "email", "label": "Email", "type": "email", "required": true },
          { "name": "categoria", "label": "Categoría/Rol", "type": "select", "options": [{ "value": "admin", "text": "Admin" }, { "value": "ciudadano", "text": "Ciudadano" }, { "value": "inspector", "text": "Inspector" }], "required": true }
        ]
      },
      {
        "id": "toggleUserStatusForm",
        "triggerButtonLabel": "Activar/Desactivar",
        "title": "Cambiar Estado del Usuario",
        "endpoint": "DELETE /usuarios/:id (para desactivar) o PUT /usuarios/:id/activar (para activar)",
        "confirmationText": "Elige una acción para este usuario. La desactivación es una baja lógica."
      }
    ]
  },
  "denuncias": {
    "description": "Formularios para gestionar denuncias.",
    "forms": [
      {
        "id": "viewComplaintDetailsForm",
        "triggerButtonLabel": "Detalle",
        "title": "Detalle de la Denuncia",
        "fields": [
          { "name": "id", "label": "ID Denuncia", "type": "text" },
          { "name": "denunciante", "label": "Denunciante", "type": "text" },
          { "name": "ubicacion", "label": "Ubicación", "type": "text" },
          { "name": "tipo", "label": "Tipo de denuncia", "type": "text" },
          { "name": "descripcion", "label": "Descripción", "type": "textarea" },
          { "name": "estado", "label": "Estado", "type": "text" }
        ]
      },
      {
        "id": "changeComplaintStatusForm",
        "triggerButtonLabel": "Cambiar Estado",
        "title": "Actualizar Estado de la Denuncia",
        "endpoint": "PUT /admin/denuncias/:id/estado",
        "fields": [
          { "name": "nuevo_estado", "label": "Nuevo Estado", "type": "select", "options": [{ "value": "pendiente", "text": "Pendiente" }, { "value": "en_proceso", "text": "En Proceso" }, { "value": "resuelto", "text": "Resuelto" }, { "value": "desestimado", "text": "Desestimado" }], "required": true }
        ]
      }
    ]
  },
  "turnos": {
    "description": "Formularios para la gestión de pre-turnos.",
    "forms": [
      {
        "id": "confirmAppointmentForm",
        "triggerButtonLabel": "Confirmar",
        "title": "Confirmar Pre-Turno",
        "endpoint": "PUT /admin/pre-turnos/:id/confirmar",
        "fields": [
          { "name": "fecha_turno", "label": "Fecha y Hora del Turno", "type": "datetime-local", "required": true },
          { "name": "instrucciones", "label": "Instrucciones para el ciudadano", "type": "textarea", "placeholder": "Ej: Presentarse 10 minutos antes...", "required": false }
        ]
      },
      {
        "id": "cancelAppointmentForm",
        "triggerButtonLabel": "Cancelar",
        "title": "Cancelar Pre-Turno",
        "endpoint": "PUT /admin/pre-turnos/:id/cancelar",
        "fields": [
          { "name": "motivo_cancelacion", "label": "Motivo de la cancelación", "type": "textarea", "placeholder": "Explica por qué se cancela el turno...", "required": true }
        ]
      }
    ]
  },
  "adopciones": {
    "description": "Formularios para la gestión de publicaciones de adopción.",
    "forms": [
      {
        "id": "createAdoptionForm",
        "triggerButtonLabel": "Agregar Adopción",
        "title": "Publicar Animal para Adopción",
        "endpoint": "POST /admin/animales/crear (o similar)",
        "comment": "Este formulario es idéntico a 'createAnimalForm'. Se debe crear un animal sin propietario para que esté disponible para adopción."
      },
      {
        "id": "editAdoptionForm",
        "triggerButtonLabel": "Editar",
        "title": "Editar Publicación de Adopción",
        "endpoint": "PUT /adopciones/actualizar/:id",
        "fields": [
          { "name": "detalle", "label": "Detalles adicionales de la adopción", "type": "textarea", "placeholder": "Ej: Ahora está desparasitado...", "required": false },
          { "name": "url", "label": "URL externa (opcional)", "type": "url", "placeholder": "https://link.a/red/social", "required": false }
        ]
      },
      {
        "id": "endAdoptionForm",
        "triggerButtonLabel": "Eliminar",
        "title": "Finalizar Publicación de Adopción",
        "endpoint": "PUT /adopciones/actualizar/:id",
        "comment": "Para finalizar, se envía `disponible: false`. Esto se puede hacer en un modal de confirmación.",
        "fields": [
          { "name": "disponible", "label": "Disponible para adopción", "type": "hidden", "value": false }
        ],
        "confirmationText": "¿Estás seguro de que quieres dar de baja esta publicación de adopción (marcar como no disponible)?"
      }
    ]
  }
}
