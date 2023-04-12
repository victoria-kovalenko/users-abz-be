import { Request, Response } from 'express'
import { getAllPositions } from '../services/positions'

const getAll = async (req: Request, res: Response) => {
	const data = await getAllPositions();
	res.send(data.rows)
	res.end();
}

module.exports = {
  getAll
}