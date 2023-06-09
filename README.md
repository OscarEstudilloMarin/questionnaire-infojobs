# AUTO CUESTIONARIO - INFOJOBS HACKATÓN

Proyecto realizado por:

-   Estudillo Marín, Óscar
-   García Gil, Guillem
-   Qiu, Longbo

## PROBLEMA IDENTIFICADO

Algunas empresas reciben tantas candidaturas que es dificil o imposible analizarlas todas --> Se debe poder preordenar las candidaturas de forma automática.

## SOLUCIÓN PROPUESTA

Hemos implementado una funcionalidad que dados unos temas, genera distintas preguntas que los candidatos deberán responder. Las respuestas son analizadas automáticamente para ordenar las candidaturas en función de la nota obtenida.

### DEMO

[ENLACE A VERCEL](https://questionnaire-infojobs.vercel.app/)

Podéis crear una cuenta o bien usar los siguientes usuarios de test:

CANDIDATE:  
Username: candidate@test.com  
Password: Candidate123!

EMPLOYER:  
Username: employer@test.com  
Password: Employer123!

**¿Cómo probar al completo la funcionalidad?**

1. Iniciar sesión como employer
2. Crear oferta con formulario auto generado
3. Cerrar sesión e iniciar como candidate
4. Acceder a la oferta creada e inscribirse
5. Volver a iniciar sesión como employer
6. Acceder a la oferta creada y ver las inscripciones

#### TECNOLOGÍAS USADAS

En el proyecto se han usado nuevas tecnologías con tal de aprender.

-   NextJS 13 App directory
-   Supabase
-   useSWR, react-hook-form, Shadcn UI, Zod, tailwindCSS, typescript

#### USO REAL

Creemos que esta funcionalidad tendría mucho sentido dentro de Infojobs, y añadiría un gran valor a grandes clientes.

Como posibles mejoras:

-   Podría relacionarse con los conocimientos necesarios (tags) u otros campos para ser una funcionalidad todavía más fácil de integrar en la oferta.
-   Poder presentar estadísticas sobre qué tipos de aplicantes tienen sus ofertas, cómo de bien responden las preguntas y clasificarlos según la calidad de sus respuestas.

#### MEJORAS DEL CÓDIGO

El uso de auth no está bien controlado, debería usarse un hook para obtener la información de user en todo momento y sincronizarlo con la sesión.

Se deben extraer algunos componentes para mejorar la reutilización del código y el uso de server side components.

Mejorar el prompt.
