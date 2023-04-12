import { client } from './db';

export const getAllUsers = () => {
  return client.query(`
    SELECT * 
    FROM public."Users"
  `)
};

export const getUserById = (userId: number) => {
  return client.query(`
    SELECT * 
    FROM public."Users"
    WHERE public."Users"."id" = '${userId}'
  `)
};

export const uploadUser = async (
  name: string | string[],
  email: string | string[],
  phone: string | string[],
  position_id: string | string[],
  imageUrl: string
) => {
  const nameFromForm = Array.isArray(name) ? name[0] : name;
  const emailFromForm = Array.isArray(email) ? email[0] : email;
  const phoneFromForm = Array.isArray(phone) ? phone[0] : phone;
  const positionFromForm = Array.isArray(position_id) ? +position_id[0] : +position_id;
  const data = await getAllUsers();
  let newId = 0;

  for (const row of data.rows) {
    if (row.id > newId) {
      newId = row.id;
    }
  };

  newId += 1;

  return client.query(`
    INSERT INTO public."Users"
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `,
    [newId, nameFromForm, emailFromForm, phoneFromForm, positionFromForm, imageUrl, new Date(), new Date()])
};