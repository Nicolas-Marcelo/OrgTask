import { db } from '../../firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

export async function moverTarefa(id, status) {
	if (!id) {
		alert("ID da tarefa é indefinido ou nulo!");
		return;
	}
	const infoTarefa = doc(db, "tarefas", id);
	await updateDoc(infoTarefa, {
		statusTarefa: status
	});
}

