import React from "react";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function DeleteTarefa({ id }) {
	async function excluirTarefa() {
		if(!id){
			alert('Id não encontrado');
			return;
		}

		const tarefaDeletar = doc(db, 'tarefas', id);
		await deleteDoc(tarefaDeletar).then(() => {
			console.log('A tarefa foi deletada com sucesso');
		}).catch((error) => {
			console.log(error);
		})
	}

	return (
		<button onClick={() => excluirTarefa()}>D</button>
	);
}

export default DeleteTarefa;