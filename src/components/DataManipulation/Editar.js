import React from "react";
import { useState } from 'react';

import { db } from '../../firebaseConfig';

import { doc, updateDoc } from 'firebase/firestore';
import InputTarefa from "../InputTarefa/InputTarefa";
import './Editar.css';

function EditarTarefa({ id }) {
	const [nomeTarefa, setNomeTarefa] = useState('');
	const [abrir, setAbrir] = useState(false);

	const aberto = () => setAbrir(!abrir)
	const tarefaAeditar = doc(db, 'tarefas', id);

	async function Editar() {
		try {
			await updateDoc(tarefaAeditar, {
				nomeTarefa: nomeTarefa,
			});
			setNomeTarefa('');
			setAbrir(false);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<div>
				<button onClick={aberto}>E</button>

				{abrir && (
					<div className="modalOverlay">
						<div className="modalContent">
							<button onClick={aberto}>Fechar</button>
							<InputTarefa
								type='text'
								placeholder='Digite o nome da tarefa'
								onChange={(e) => setNomeTarefa(e.target.value)} />
							<p>Conteudo em paragrafo da caixa</p>
							<button onClick={() => Editar()} className="modalClose">Salvar</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default EditarTarefa;