"use serve"

/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { useEffect, useState } from 'react';

import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';

async function getList() {
	try {
		const response = await fetch('http://localhost:8080/api/cities/10');
		const data = await response.json();

		if (!response.ok) throw new Error('Erro ao obter os dados');

		return data as Array<ICity>;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getStaticProps() {
	let data = await getList();

	return {
		props: {
			data: data as Array<ICity>,
		},
	};
}

export default function Lista({ data }: { data: Array<ICity> }) {
	const [list, setUsers] = useState<Array<ICity>>([
		{
			id: new Date().getTime().toString(),
			name: 'São Paulo',
		},
	]);

	useEffect(() => {
		setUsers(data);
	}, [data]);

	useEffect(() => {
		setInterval(() => {
			getList().then(data => {
				setUsers(data);
			});
		}, 1000 * 60); // 1 minuto
	}, [list]);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{list.map((city) => (
						<div data-list-item key={city.id}>
							{city.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
