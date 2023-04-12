const { Client } = require('pg');
export const client = new Client({
  user: "victoria-kovalenko",
  password: "bz0odCuy6msa",
  database: "neondb",
  host: "ep-snowy-pond-231923.eu-central-1.aws.neon.tech",
  ssl: true
});
client.connect();