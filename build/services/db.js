"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const { Client } = require('pg');
exports.client = new Client({
    user: "victoria-kovalenko",
    password: "bz0odCuy6msa",
    database: "neondb",
    host: "ep-snowy-pond-231923.eu-central-1.aws.neon.tech",
    ssl: true
});
exports.client.connect();
