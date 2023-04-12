import { client } from './db';

export const getAllPositions = () => {
	return client.query(`
    SELECT * 
    FROM public."Positions"
  `)
}