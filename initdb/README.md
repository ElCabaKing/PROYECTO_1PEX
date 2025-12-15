# InitDB - PROYECTO_1PEX

Scripts SQL para inicializar la base de datos MySQL del sistema de reparaciones.

## Archivos

- `01_schema.sql`: Crea tablas y estructura de la DB.
- `02_data.sql`: Inserta datos iniciales (usuarios, roles).
- `03_stProcess.sql`: Procedimientos almacenados.

## Uso

Ejecuta en orden en tu servidor MySQL:

```sql
SOURCE 01_schema.sql;
SOURCE 02_data.sql;
SOURCE 03_stProcess.sql;
```

O usa Docker Compose para automatizar.