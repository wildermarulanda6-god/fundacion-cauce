# Fundación Cauce

App móvil (React Native + Expo SDK 58 + TypeScript) para una fundación ficticia. Dominio: `donors`, `projects`, `beneficiaries`, `reports`. Proyecto de aprendizaje basado en la guía bc-reactnative.

## Pantallas
- Inicio: encabezado de marca, buscador, filtro por estado, resumen de entidades y lista de proyectos con avance, donantes, beneficiarios e informes.

## Decisiones de diseño
- Paleta propia "Cauce" (verde petróleo, agua, sol) y franja lateral que codifica el estado del proyecto.
- Búsqueda sin distinguir mayúsculas ni tildes; estado vacío con salida para limpiar filtros.
- Sin estilos inline ni librerías de UI: todo con `StyleSheet.create` y constantes de tema.

## Ejecutar
pnpm install
pnpm start

## Convenciones
pnpm con versiones exactas · Conventional Commits (commitlint + husky) · una rama por semana (`week-XX`).