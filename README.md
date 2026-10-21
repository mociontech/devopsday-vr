# Fútbol VR · registro (DevOps Days Bogotá 2026)

React + Vite + TypeScript. Despliegue independiente (Netlify) con su propio servidor.

```bash
npm install
npm run dev        # http://127.0.0.1:5501 (sirve también /api/*)
npm run build      # genera dist/ (tipos + bundle)
```

- Pantallas: `src/screens/` · llamadas al servidor: `src/lib/api.ts` · contenido de la experiencia: `src/experience.ts`.
- Rutas por hash: `#/registro`, `#/agrega-id`, `#/tu-id`.
- Al terminar el registro se dispara el evento `registro:completo` en `window`.

## Servidor propio (`server/`)

Este proyecto es **autónomo**: trae su propio servidor y sus propias variables de entorno. Lo único compartido con las
otras experiencias es la **base de datos** (Supabase, mismas tablas); el código no se comparte, se replica.

- `server/registros.ts`: todo el acceso a datos (base + Evius). La experiencia (`vr`) es la única línea que cambia entre proyectos.
- `server/handler.ts`: la API (`POST /api/registrar`, `GET /api/participante/:id`, `POST /api/participacion`).
- El navegador solo habla con `/api/*` del mismo origen; **las claves nunca llegan al navegador**.
- El ID (`321-321`) lo genera la base. Un correo ya registrado devuelve el ID de esa persona (no se duplica).
- El acceso rápido devuelve solo el nombre. El servidor lee el contacto de la base y registra a la persona en Evius
  (`/attendees` y luego `/experiences`); si Evius falla, queda pendiente en la base y se reintenta con espera creciente.
- Participar vale **100 puntos**: la participación se registra al inscribirse o entrar con el ID y sale a Evius con `score: 100`.

Variables (`.env` local o panel del hosting; ver `.env.example`):

| Variable | Para qué |
|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Base compartida. La clave de servicio (secret key) va **solo** en el servidor. |
| `EVIUS_MODE` | `live` activa el envío a Evius; con cualquier otro valor no se manda nada. |
| `EVIUS_URL`, `EVIUS_TOKEN`, `EVIUS_EVENT_ID`, `EVIUS_EXPERIENCE_ID`, `EVIUS_SOURCE` | Evius (Datahub). |

**Requiere** que la migración `backend/supabase/migrations/20261021_003_autonomo.sql` esté aplicada en Supabase.

**Despliegue en Netlify:** `netlify.toml` ya define el build; `netlify/functions/api.mts` sirve `/api/*` y
`netlify/functions/reintentar.mts` reintenta lo pendiente hacia Evius cada minuto. Carga las variables de la tabla en
*Site configuration → Environment variables*.

Prueba sin tocar nada real (base y Evius falsos), desde la carpeta del evento: `PW=$(npm root -g)/playwright node backend/tests/autonomo.cjs vr`.
