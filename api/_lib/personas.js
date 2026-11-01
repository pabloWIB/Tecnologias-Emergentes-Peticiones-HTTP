import { neon } from '@neondatabase/serverless';

import { ESQUEMA } from './esquema.js';

const sql = neon(process.env.DATABASE_URL);

let tablasListas = null;
const prepararTablas = () => {
  tablasListas ??= (async () => {
    for (const consulta of ESQUEMA) await sql.query(consulta);
  })().catch((error) => {
    tablasListas = null;
    throw error;
  });
  return tablasListas;
};

const CAMPOS = [
  ['name', 'name'],
  ['lastName', 'last_name'],
  ['email', 'email'],
  ['phone', 'phone'],
  ['address', 'address'],
  ['age', 'age'],
  ['gender', 'gender'],
  ['typeDocument', 'type_document'],
  ['typeSubject', 'type_subject'],
  ['numberDocument', 'number_document'],
  ['dateBirth', 'date_birth']
];

const TABLAS = {
  teachers: { tabla: 'teachers', nombre: 'teacher', campos: [...CAMPOS, ['code', 'code']], obligatorios: ['code'] },
  students: { tabla: 'students', nombre: 'student', campos: CAMPOS, obligatorios: [] }
};

const OBLIGATORIOS = ['name', 'lastName', 'email', 'phone', 'address', 'typeDocument', 'typeSubject', 'numberDocument'];
const DOCUMENTOS = ['passport', 'identification_card'];
const MATERIAS = ['software_development', 'machine_learning', 'mathematics'];
const GENEROS = ['female', 'male', 'other'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const columnas = (config) =>
  ['id as "_id"', ...config.campos.map(([campo, columna]) => (campo === columna ? columna : `${columna} as "${campo}"`))].join(', ');

const limpiar = (config, body) => {
  const datos = {};
  for (const [campo] of config.campos) {
    const valor = body?.[campo];
    if (valor === undefined || valor === null || valor === '') continue;
    datos[campo] = campo === 'age' ? Number(valor) : String(valor).trim();
  }
  return datos;
};

const validar = (config, datos) => {
  const faltan = [...OBLIGATORIOS, ...config.obligatorios].filter((campo) => !datos[campo]);
  if (faltan.length) return `Missing fields: ${faltan.join(', ')}.`;
  if (!EMAIL.test(datos.email)) return 'The email is not valid.';
  if (!/^\d{10}$/.test(datos.phone)) return 'The phone must have 10 digits.';
  if (!DOCUMENTOS.includes(datos.typeDocument)) return 'The document type is not valid.';
  if (!MATERIAS.includes(datos.typeSubject)) return 'The subject is not valid.';
  if (datos.gender && !GENEROS.includes(datos.gender)) return 'The gender is not valid.';
  if (datos.age !== undefined && (!Number.isInteger(datos.age) || datos.age < 1 || datos.age > 120)) return 'The age is not valid.';
  if (datos.dateBirth && !/^\d{4}-\d{2}-\d{2}$/.test(datos.dateBirth)) return 'The date of birth must be YYYY-MM-DD.';
  return null;
};

const responder = (res, estado, cuerpo) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (cuerpo === undefined) return res.status(estado).end();
  return res.status(estado).json(cuerpo);
};

const errorDeBase = (res, config, error) => {
  if (error?.code === '23505') {
    return responder(res, 409, { message: `There is already a ${config.nombre} with that document number.` });
  }
  console.error(error);
  return responder(res, 500, { message: 'The database did not answer, try again.' });
};

export const listaYCrear = (recurso) => async (req, res) => {
  const config = TABLAS[recurso];
  if (req.method === 'OPTIONS') return responder(res, 204);

  try {
    await prepararTablas();

    if (req.method === 'GET') {
      const filas = await sql.query(`select ${columnas(config)} from ${config.tabla} order by created_at desc`);
      return responder(res, 200, filas);
    }

    if (req.method === 'POST') {
      const datos = limpiar(config, req.body);
      const problema = validar(config, datos);
      if (problema) return responder(res, 400, { message: problema });

      const campos = config.campos.filter(([campo]) => campo in datos);
      const filas = await sql.query(
        `insert into ${config.tabla} (${campos.map(([, columna]) => columna).join(', ')})
         values (${campos.map((_, i) => `$${i + 1}`).join(', ')})
         returning ${columnas(config)}`,
        campos.map(([campo]) => datos[campo])
      );
      return responder(res, 201, filas[0]);
    }
  } catch (error) {
    return errorDeBase(res, config, error);
  }

  return responder(res, 405, { message: 'Method not allowed.' });
};

export const porId = (recurso) => async (req, res) => {
  const config = TABLAS[recurso];
  if (req.method === 'OPTIONS') return responder(res, 204);

  const { id } = req.query;
  const noExiste = () => responder(res, 404, { message: `The ${config.nombre} does not exist.` });
  if (!UUID.test(String(id))) return noExiste();

  try {
    await prepararTablas();

    if (req.method === 'GET') {
      const filas = await sql.query(`select ${columnas(config)} from ${config.tabla} where id = $1`, [id]);
      return filas[0] ? responder(res, 200, filas[0]) : noExiste();
    }

    if (req.method === 'PUT') {
      const datos = limpiar(config, req.body);
      const problema = validar(config, datos);
      if (problema) return responder(res, 400, { message: problema });

      const valores = config.campos.map(([campo]) => datos[campo] ?? null);
      const filas = await sql.query(
        `update ${config.tabla}
         set ${config.campos.map(([, columna], i) => `${columna} = $${i + 2}`).join(', ')}, updated_at = now()
         where id = $1
         returning ${columnas(config)}`,
        [id, ...valores]
      );
      return filas[0] ? responder(res, 200, filas[0]) : noExiste();
    }

    if (req.method === 'DELETE') {
      const filas = await sql.query(`delete from ${config.tabla} where id = $1 returning ${columnas(config)}`, [id]);
      return filas[0] ? responder(res, 200, filas[0]) : noExiste();
    }
  } catch (error) {
    return errorDeBase(res, config, error);
  }

  return responder(res, 405, { message: 'Method not allowed.' });
};
