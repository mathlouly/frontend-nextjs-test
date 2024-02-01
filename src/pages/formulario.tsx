/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css';
import { IUserCreate } from '@/types/user';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export default function Form() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		let user: IUserCreate = {
			name: data.name,
			email: data.email
		};

		createUser(user);
	}

	async function createUser(user: IUserCreate) {
		try {
			const response = await fetch('/api/users/create', {
				method: 'POST',
				body: JSON.stringify(user)
			});
			const data = await response.json();

			if (!response.ok) throw new Error('Erro ao criar o usuário');

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="text" placeholder="Name" {...register("name", { required: true })} />
					{errors.name && <span data-error className={styles.label}>O nome é obrigatório</span>}
					<input type="email" placeholder="E-mail" {...register("email", { 
						required: true,
						pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
					})} />
					{errors.email?.type == "required" && <span data-error className={styles.label}>O e-mail é obrigatório</span>}
					{errors.email?.type == "pattern" && <span data-error className={styles.label}>O e-mail está inválido</span>}

					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
