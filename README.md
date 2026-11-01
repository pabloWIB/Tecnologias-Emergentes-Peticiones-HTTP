Esta es la actividad individual n°3, peticiones http

Tecnologías emergentes, universidad de manizales
Pablo Nieto Pérez

Es el mismo panel de la actividad n°2 pero ahora los estudiantes y los profesores se guardan en una base de datos real, se crean, se listan, se editan y se eliminan con fetch y async/await contra la api, que tiene las mismas rutas que la api de la materia (/api/teachers y /api/students) pero corre en vercel y guarda en postgres de neon, las tablas se crean solas la primera vez con lo que está en api/_lib/esquema.js

Está en línea en https://peticiones.wib.digital

Para correrlo en local se usa npm install y luego npm run dev, el archivo .env.development ya apunta a la api en línea
