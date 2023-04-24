import { Request, Response } from 'express'
import formidable from 'formidable'
import { getAllUsers, getUserById, uploadUser } from '../services/users'
import { QueryResult } from 'pg'
import { QueryError } from 'sequelize'
import { uploadImage } from '../services/aws';
import { imageResizer } from '../services/image'
import { isValidData } from '../helpers/isValidData'

const getAll = async (req: Request, res: Response) => {
  const data: any = await getAllUsers();

  res.send(data.rows)
  res.end();
}

const getById = async (req: Request, res: Response) => {
	const { userId } = req.params;

	const data = await getUserById(+userId);

	res.send(data.rows);
	res.end();
};

const uploadNewUser = async (req: Request, res: Response) => {
	const form = formidable({ multiples: true, maxFileSize: 5 * 1024 * 1024 });
	form.parse(req, async (err: any, fields: any, files: any) => {
		if (err) {
			console.error(err);
			res.status(500).send(err);
			return;
		}

		const { name, email, phone, position_id } = fields;
		const { photo } = files;


		if (isValidData(name, email, phone, position_id) !== 'all data valid') {
			console.error(isValidData(name, email, phone, position_id));
			res.status(422).send(isValidData(name, email, phone, position_id));
			res.end();
			return;
		}

		const photoFile = Array.isArray(photo) ? photo[0] : photo;

		const resizedImage = await imageResizer(photoFile.filepath);

		const compressedImage = resizedImage.toString('base64');

		const imageUrl = await uploadImage(compressedImage);

		uploadUser(name, email, phone, position_id, imageUrl)
			.then((result: QueryResult) => {
				const newUser = result.rows[0];
				res.send(`New user created with ID ${newUser.id}`);
				res.end();
			})
			.catch((err: QueryError) => {
				console.error('Error creating new user:', err);
				res.status(500).send('Error creating new user');
				res.end();
			})
	});
}

module.exports = {
		getAll, getById, uploadNewUser
};