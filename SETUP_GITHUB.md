# Cómo subir esto a GitHub (repo privado)

Sigue estos pasos UNA SOLA VEZ desde tu terminal en la carpeta `app/`.

---

## Paso 1 — Instalar dependencias (incluyendo Supabase)

```bash
npm install
```

---

## Paso 2 — Inicializar Git

```bash
git init
git add .
git commit -m "feat: scaffold inicial Routa MVP"
```

---

## Paso 3 — Crear el repo privado en GitHub

Ve a [github.com/new](https://github.com/new) y crea el repo con:
- **Owner:** routaapp (tu organización)
- **Name:** routaapp
- **Visibility:** ✅ Private
- **NO** inicialices con README ni .gitignore (ya los tenemos)

---

## Paso 4 — Conectar y subir

```bash
git remote add origin git@github.com:routaapp/routaapp.git
git branch -M main
git push -u origin main
```

> Si usas HTTPS en lugar de SSH:
> ```bash
> git remote add origin https://github.com/routaapp/routaapp.git
> ```

---

## Paso 5 — Conectar Vercel para deploy automático

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa el repo `routaapp/routaapp` (GitHub)
3. En **Environment Variables**, agrega todas las variables de tu `.env.local`
4. Deploy → cada push a `main` despliega automáticamente

---

## Workflow de trabajo diario

```bash
# Antes de trabajar, traer cambios del remoto
git pull

# Trabajar... hacer cambios...

# Ver qué cambió
git status

# Subir cambios
git add .
git commit -m "feat: descripción de lo que hiciste"
git push
```

> Tip: usa prefijos en los commits para tenerlos organizados:
> - `feat:` — nueva funcionalidad
> - `fix:` — corrección de bug
> - `chore:` — cambios de configuración
> - `docs:` — documentación
