/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser, IUserCreate } from '@/types/user.d';

const users: IUser[] = [];

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') return res.status(405).send({msg: 'Metódo não suportado'});
	let { name, email } = JSON.parse(req.body);

	if (!name || !email) return res.status(400).send({msg: 'Parâmetros inválidos'});

	let lastId: number = Math.max(...users.map(user => user.id));
	if (lastId === Number.NEGATIVE_INFINITY) lastId = 0;
	let user: IUser = { id: ++lastId, name: name, email: email };
	users.push(user);

	return res.status(200).json(users);
};
