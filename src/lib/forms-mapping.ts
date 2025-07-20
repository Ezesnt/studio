
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
          { "name": "observaciones", "label": "Observaciones", "type": "textarea", "placeholder": "Cualquier detalle relevante sobre el animal...", "required": false },
          { "name": "foto", "label": "Foto del Animal", "type": "file", "required": false }
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
          { "name": "id_propietario", "label": "Propietario", "type": "combobox", "placeholder": "Selecciona un propietario", "required": true, "options": [
              { "value": "2", "text": "Maria Lopez (30.555.666)" }, 
              { "value": "3", "text": "Juan Martínez (40.111.222)" }
            ] 
          }
        ]
      },
      {
        "id": "agregarAnimalForm",
        "title": "Agregar Animal",
        "fields": [
          { "name": "nombre", "label": "Nombre", "type": "text", "required": true },
          { "name": "especie", "label": "Especie", "type": "select", "options": [{"value": "perro", "text": "Perro"}, {"value": "gato", "text": "Gato"}, {"value": "ave", "text": "Ave"}], "required": true },
          { "name": "edad", "label": "Edad (años)", "type": "number", "min": 0, "required": true },
          { "name": "raza", "label": "Raza", "type": "text", "required": false },
          { "name": "sexo", "label": "Sexo", "type": "select", "options": [{ "value": "macho", "text": "Macho" }, { "value": "hembra", "text": "Hembra" }], "required": true },
          { "name": "color", "label": "Color", "type": "text", "required": false },
          { "name": "tamanio", "label": "Tamaño", "type": "select", "options": [{ "value": "pequenio", "text": "Pequeño" }, { "value": "mediano", "text": "Mediano" }, { "value": "grande", "text": "Grande" }], "required": true },
          { "name": "esta_castrado", "label": "Está Castrado", "type": "checkbox", "required": false },
          { "name": "observaciones", "label": "Observaciones", "type": "textarea", "required": false }
        ]
      },
       {
        "id": "viewAnimalDetailsForm",
        "title": "Detalle del Animal",
        "fields": [
            { "name": "nombre", "label": "Nombre", "type": "text" },
            { "name": "especie", "label": "Especie", "type": "text" },
            { "name": "edad", "label": "Edad", "type": "text" }
        ]
      },
      {
        "id": "addHealthRecordForm",
        "title": "Agregar Registro a Libreta Sanitaria",
        "endpoint": "POST /animales/:id/historial-clinico",
        "fields": [
          { "name": "fecha", "label": "Fecha del Registro", "type": "datetime-local", "required": true },
          { "name": "tipo", "label": "Tipo de Registro", "type": "select", "options": [
            { "value": "vacuna", "text": "Vacuna" },
            { "value": "desparasitacion", "text": "Desparasitación" },
            { "value": "consulta", "text": "Consulta" },
            { "value": "cirugia", "text": "Cirugía" },
            { "value": "otro", "text": "Otro" }
          ], "required": true },
          { "name": "descripcion", "label": "Descripción / Detalles", "type": "textarea", "placeholder": "Ej: Vacuna antirrábica, refuerzo anual", "required": true }
        ]
      },
      {
        "id": "viewAnimalHealthBookForm",
        "title": "Libreta Sanitaria",
        "endpoint": "GET /animales/:id/historial-clinico",
        "comment": "Este es un formulario especial para mostrar datos, no para ingresarlos."
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
          { "name": "nacionalidad", "label": "Nacionalidad", "type": "select", "options": [
              { "value": "argentina", "text": "Argentina" }, { "value": "boliviana", "text": "Boliviana" }, { "value": "brasilena", "text": "Brasileña" }, { "value": "chilena", "text": "Chilena" }, { "value": "colombiana", "text": "Colombiana" }, { "value": "ecuatoriana", "text": "Ecuatoriana" }, { "value": "espanola", "text": "Española" }, { "value": "estadounidense", "text": "Estadounidense" }, { "value": "mexicana", "text": "Mexicana" }, { "value": "paraguaya", "text": "Paraguaya" }, { "value": "peruana", "text": "Peruana" }, { "value": "uruguaya", "text": "Uruguaya" }, { "value": "venezolana", "text": "Venezolana" }
            ], "required": false 
          },
          { "name": "categoria", "label": "Categoría/Rol", "type": "select", "options": [{ "value": "admin", "text": "Admin" }, { "value": "ciudadano", "text": "Ciudadano" }, { "value": "inspector", "text": "Inspector" }], "required": true }
        ]
      },
      {
        "id": "toggleUserStatusForm",
        "triggerButtonLabel": "Activar/Desactivar",
        "title": "Cambiar Estado del Usuario",
        "endpoint": "DELETE /usuarios/:id (para desactivar) o PUT /usuarios/:id/activar (para activar)",
        "confirmationText": "Elige una acción para este usuario. La desactivación es una baja lógica."
      },
      {
        "id": "editCitizenUserForm",
        "title": "Editar Información Personal",
        "fields": [
          { "name": "nombre", "label": "Nombre", "type": "text", "required": true },
          { "name": "apellido", "label": "Apellido", "type": "text", "required": true },
          { "name": "dni", "label": "DNI", "type": "text", "required": true },
          { "name": "email", "label": "Email", "type": "email", "required": true },
          { "name": "domicilio", "label": "Domicilio", "type": "text", "required": true },
          { "name": "telefono", "label": "Teléfono", "type": "text", "required": true },
          { "name": "barrio", "label": "Barrio", "type": "select", "options": [
              {"value": "645_viviendas", "text": "645 Viviendas"}, {"value": "2_de_abril", "text": "2 de Abril"}, {"value": "10_de_diciembre", "text": "10 de Diciembre"}, {"value": "28_de_abril", "text": "28 de Abril"}, {"value": "60_viviendas", "text": "60 Viviendas"}, {"value": "400_viviendas", "text": "400 Viviendas"}, {"value": "aldea_del_este", "text": "Aldea del Este"}, {"value": "arrayanes", "text": "Arrayanes"}, {"value": "barrio_el_pilar_i", "text": "Barrio El Pilar I"}, {"value": "barrio_el_pilar_ii", "text": "Barrio El Pilar II"}, {"value": "barrio_el_pilar_iii", "text": "Barrio El Pilar III"}, {"value": "barrio_jockey_club", "text": "Barrio Jockey Club"}, {"value": "barrio_nahuel_hue", "text": "Barrio Nahuel Hue"}, {"value": "barrio_vivero", "text": "Barrio Vivero"}, {"value": "barrio_vuriloche", "text": "Barrio Vuriloche"}, {"value": "belgrano", "text": "Belgrano"}, {"value": "belgrano_sudeste", "text": "Belgrano Sudeste"}, {"value": "casa_de_piedra_ruca_cura", "text": "Casa de Piedra/Ruca Cura"}, {"value": "carihue", "text": "Carihue"}, {"value": "cerro_chico", "text": "Cerro Chico"}, {"value": "coop_258", "text": "Coop 258"}, {"value": "covibar", "text": "Covibar"}, {"value": "el_condor", "text": "El Condor"}, {"value": "el_faldeo", "text": "El Faldeo"}, {"value": "el_frutillar", "text": "El Frutillar"}, {"value": "el_maiten", "text": "El Maiten"}, {"value": "el_mirador", "text": "El Mirador"}, {"value": "el_progreso", "text": "El Progreso"}, {"value": "gastronomico_2_de_agosto", "text": "Gastronómico 2 de Agosto"}, {"value": "islas_malvinas", "text": "Islas Malvinas"}, {"value": "jardin_botanico", "text": "Jardín Botánico"}, {"value": "jockey_club", "text": "Jockey Club"}, {"value": "la_cumbre", "text": "La Cumbre"}, {"value": "la_cascada", "text": "La Cascada"}, {"value": "la_colina", "text": "La Colina"}, {"value": "las_margaritas", "text": "Las Margaritas"}, {"value": "las_quintas", "text": "Las Quintas"}, {"value": "las_vertientes", "text": "Las Vertientes"}, {"value": "las_victorias", "text": "Las Victorias"}, {"value": "levalle", "text": "Levalle"}, {"value": "los_cipresales", "text": "Los Cipresales"}, {"value": "los_maitenes", "text": "Los Maitenes"}, {"value": "los_retamos", "text": "Los Retamos"}, {"value": "lomas_de_monteverde", "text": "Lomas de Monteverde"}, {"value": "melipal", "text": "Melipal"}, {"value": "nueva_esperanza", "text": "Nueva Esperanza"}, {"value": "nueva_jamaica", "text": "Nueva Jamaica"}, {"value": "nireco", "text": "Ñireco"}, {"value": "omega", "text": "Omega"}, {"value": "parque_lago_moreno", "text": "Parque Lago Moreno"}, {"value": "parques_nacionales", "text": "Parques Nacionales"}, {"value": "peninsula_san_pedro", "text": "Península San Pedro"}, {"value": "peumayen", "text": "Peumayen"}, {"value": "pinar_del_lago", "text": "Pinar del Lago"}, {"value": "pinar_de_festa", "text": "Pinar de Festa"}, {"value": "playa_bonita", "text": "Playa Bonita"}, {"value": "playa_serena", "text": "Playa Serena"}, {"value": "quimey_hue", "text": "Quimey Hue"}, {"value": "rancho_grande", "text": "Rancho Grande"}, {"value": "san_ignacio_del_cerro", "text": "San Ignacio del Cerro"}, {"value": "san_francisco", "text": "San Francisco"}, {"value": "sara_maria_furman", "text": "Sara María Furman"}, {"value": "valle_azul", "text": "Valle Azul"}, {"value": "villa_catedral", "text": "Villa Catedral"}, {"value": "villa_don_orione", "text": "Villa Don Orione"}, {"value": "villa_lago_gutierrez", "text": "Villa Lago Gutierrez"}, {"value": "villa_los_coihues", "text": "Villa Los Coihues"}, {"value": "virgen_de_las_nieves", "text": "Virgen de las Nieves"}, {"value": "virgen_misionera", "text": "Virgen Misionera"}, {"value": "villa_nahuel_malal", "text": "Villa Nahuel Malal"}, {"value": "villa_verde", "text": "Villa Verde"}, {"value": "otro", "text": "Otro"}
            ], "required": true }
        ]
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
          { "name": "tipo_denuncia", "label": "Tipo de denuncia", "type": "text", "omitInView": false },
          { "name": "fecha", "label": "Fecha", "type": "text", "omitInView": false },
          { "name": "ubicacion", "label": "Ubicación", "type": "text", "omitInView": false },
          { "name": "barrio", "label": "Barrio", "type": "text", "omitInView": false },
          { "name": "descripcion", "label": "Descripción", "type": "textarea", "omitInView": false },
          { "name": "estado", "label": "Estado", "type": "text", "omitInView": false }
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
      },
      {
        "id": "agregarDenunciaForm",
        "title": "Agregar Denuncia",
        "fields": [
          { "name": "tipo_denuncia", "label": "Tipo de Denuncia", "type": "select", "options": [
              {"value": "maltrato_animal", "text": "Maltrato Animal"}, {"value": "abandono", "text": "Abandono"}, {"value": "perros_sueltos", "text": "Perros Sueltos"}, {"value": "sintomas_rabia", "text": "Síntomas de Rabia"}, {"value": "mordedura", "text": "Mordedura"}, {"value": "basura_roedores", "text": "Basura y Roedores"}, {"value": "garrapatas", "text": "Garrapatas"}, {"value": "animal_muerto", "text": "Animal Muerto"}, {"value": "fauna_urbana", "text": "Fauna Urbana"}, {"value": "alimentacion_fauna", "text": "Alimentación de Fauna"}, {"value": "tenencia_ilegal", "text": "Tenencia Ilegal"}, {"value": "caza_furtiva", "text": "Caza Furtiva"}, {"value": "atropello_fauna", "text": "Atropello de Fauna"}, {"value": "veterinarias_ilegales", "text": "Veterinarias Ilegales"}, {"value": "molestias_vecinales", "text": "Molestias Vecinales"}, {"value": "emergencia_animal", "text": "Emergencia Animal"}, {"value": "otro", "text": "Otro"}
            ], "required": true 
          },
          { "name": "barrio", "label": "Barrio", "type": "select", "options": [
              {"value": "645_viviendas", "text": "645 Viviendas"}, {"value": "2_de_abril", "text": "2 de Abril"}, {"value": "10_de_diciembre", "text": "10 de Diciembre"}, {"value": "28_de_abril", "text": "28 de Abril"}, {"value": "60_viviendas", "text": "60 Viviendas"}, {"value": "400_viviendas", "text": "400 Viviendas"}, {"value": "aldea_del_este", "text": "Aldea del Este"}, {"value": "arrayanes", "text": "Arrayanes"}, {"value": "barrio_el_pilar_i", "text": "Barrio El Pilar I"}, {"value": "barrio_el_pilar_ii", "text": "Barrio El Pilar II"}, {"value": "barrio_el_pilar_iii", "text": "Barrio El Pilar III"}, {"value": "barrio_jockey_club", "text": "Barrio Jockey Club"}, {"value": "barrio_nahuel_hue", "text": "Barrio Nahuel Hue"}, {"value": "barrio_vivero", "text": "Barrio Vivero"}, {"value": "barrio_vuriloche", "text": "Barrio Vuriloche"}, {"value": "belgrano", "text": "Belgrano"}, {"value": "belgrano_sudeste", "text": "Belgrano Sudeste"}, {"value": "casa_de_piedra_ruca_cura", "text": "Casa de Piedra/Ruca Cura"}, {"value": "carihue", "text": "Carihue"}, {"value": "cerro_chico", "text": "Cerro Chico"}, {"value": "coop_258", "text": "Coop 258"}, {"value": "covibar", "text": "Covibar"}, {"value": "el_condor", "text": "El Condor"}, {"value": "el_faldeo", "text": "El Faldeo"}, {"value": "el_frutillar", "text": "El Frutillar"}, {"value": "el_maiten", "text": "El Maiten"}, {"value": "el_mirador", "text": "El Mirador"}, {"value": "el_progreso", "text": "El Progreso"}, {"value": "gastronomico_2_de_agosto", "text": "Gastronómico 2 de Agosto"}, {"value": "islas_malvinas", "text": "Islas Malvinas"}, {"value": "jardin_botanico", "text": "Jardín Botánico"}, {"value": "jockey_club", "text": "Jockey Club"}, {"value": "la_cumbre", "text": "La Cumbre"}, {"value": "la_cascada", "text": "La Cascada"}, {"value": "la_colina", "text": "La Colina"}, {"value": "las_margaritas", "text": "Las Margaritas"}, {"value": "las_quintas", "text": "Las Quintas"}, {"value": "las_vertientes", "text": "Las Vertientes"}, {"value": "las_victorias", "text": "Las Victorias"}, {"value": "levalle", "text": "Levalle"}, {"value": "los_cipresales", "text": "Los Cipresales"}, {"value": "los_maitenes", "text": "Los Maitenes"}, {"value": "los_retamos", "text": "Los Retamos"}, {"value": "lomas_de_monteverde", "text": "Lomas de Monteverde"}, {"value": "melipal", "text": "Melipal"}, {"value": "nueva_esperanza", "text": "Nueva Esperanza"}, {"value": "nueva_jamaica", "text": "Nueva Jamaica"}, {"value": "nireco", "text": "Ñireco"}, {"value": "omega", "text": "Omega"}, {"value": "parque_lago_moreno", "text": "Parque Lago Moreno"}, {"value": "parques_nacionales", "text": "Parques Nacionales"}, {"value": "peninsula_san_pedro", "text": "Península San Pedro"}, {"value": "peumayen", "text": "Peumayen"}, {"value": "pinar_del_lago", "text": "Pinar del Lago"}, {"value": "pinar_de_festa", "text": "Pinar de Festa"}, {"value": "playa_bonita", "text": "Playa Bonita"}, {"value": "playa_serena", "text": "Playa Serena"}, {"value": "quimey_hue", "text": "Quimey Hue"}, {"value": "rancho_grande", "text": "Rancho Grande"}, {"value": "san_ignacio_del_cerro", "text": "San Ignacio del Cerro"}, {"value": "san_francisco", "text": "San Francisco"}, {"value": "sara_maria_furman", "text": "Sara María Furman"}, {"value": "valle_azul", "text": "Valle Azul"}, {"value": "villa_catedral", "text": "Villa Catedral"}, {"value": "villa_don_orione", "text": "Villa Don Orione"}, {"value": "villa_lago_gutierrez", "text": "Villa Lago Gutierrez"}, {"value": "villa_los_coihues", "text": "Villa Los Coihues"}, {"value": "virgen_de_las_nieves", "text": "Virgen de las Nieves"}, {"value": "virgen_misionera", "text": "Virgen Misionera"}, {"value": "villa_nahuel_malal", "text": "Villa Nahuel Malal"}, {"value": "villa_verde", "text": "Villa Verde"}, {"value": "otro", "text": "Otro"}
            ], "required": true
          },
          { "name": "direccion", "label": "Dirección del incidente", "type": "text", "placeholder": "Ej: Calle Falsa 123, entre Av. Siempreviva y Calle 4", "required": true },
          { "name": "descripcion", "label": "Descripción detallada", "type": "textarea", "placeholder": "Describe la situación con el mayor detalle posible.", "required": true },
          { "name": "archivos", "label": "Adjuntar fotos o videos (PDF, JPG, PNG, MP4)", "type": "file", "required": false }
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
      },
      {
        "id": "solicitarPreturnoForm",
        "title": "Solicitar Pre-turno",
        "fields": [
          { "name": "id_animal", "label": "Selecciona tu animal", "type": "select", "options": [
              {"value": "1", "text": "Firulais (Perro)"}, 
              {"value": "2", "text": "Mishi (Gato)"}
            ], "required": true 
          },
          { "name": "motivo", "label": "Tipo de Turno", "type": "select", "options": [
              {"value": "castracion_canino_macho", "text": "Castración Canino Macho"}, {"value": "castracion_canino_hembra", "text": "Castración Canino Hembra"}, {"value": "castracion_felino_macho", "text": "Castración Felino Macho"}, {"value": "castracion_felino_hembra", "text": "Castración Felino Hembra"}, {"value": "vacunacion_antirrabica", "text": "Vacunación Antirrábica"}, {"value": "desparasitacion", "text": "Desparasitación"}, {"value": "consulta_veterinaria_primaria", "text": "Consulta Veterinaria Primaria"}, {"value": "identificacion_microchip", "text": "Identificación por Microchip"}, {"value": "tratamiento_sarna", "text": "Tratamiento de Sarna"}, {"value": "otro", "text": "Otro"}
            ], "required": true 
          }
        ]
      },
      {
        "id": "viewAppointmentDetailsForm",
        "title": "Detalle del Turno Confirmado",
        "fields": [
          { "name": "fechaConfirmada", "label": "Fecha y Hora", "type": "text" },
          { "name": "profesional", "label": "Profesional Asignado", "type": "text" },
          { "name": "instrucciones", "label": "Instrucciones", "type": "textarea" }
        ]
      }
    ]
  },
  "adopciones": {
    "description": "Formularios para la gestión de publicaciones de adopción.",
    "forms": [
      {
        "id": "viewAdoptionDetailsForm",
        "title": "Detalles de la Adopción",
        "comment": "Este formulario es especial, renderiza una vista detallada del animal en adopción."
      },
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
