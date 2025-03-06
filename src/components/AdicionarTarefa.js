import React from "react";
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import InputTarefa from "./InputTarefa/InputTarefa";

function AdicionarTarefa({ onTaskAdded }) {
	const [nomeTarefa, setNomeTarefa] = useState('');
	const [diaTarefa, setDiaTarefa] = useState('');

	async function adicionarTarefa() {
		await addDoc(collection(db, "tarefas"), {
			nomeTarefa: nomeTarefa,
			diaTarefa: diaTarefa,
			statusTarefa: 'A comecar',
		}).then(() => {
			setNomeTarefa('');
			setDiaTarefa('')
			if (onTaskAdded) onTaskAdded();
		}).catch((error) => {
			console.log(error)
		})
	}

	return (
		<div>
			<h1>Adicionar a coleção</h1>
			<InputTarefa
				type='text'
				placeholder='nome da tarefa'
				onChange={(e) => setNomeTarefa(e.target.value)} />
			<InputTarefa
				placeholder='dia da tarefa'
				onChange={(e) => setDiaTarefa(e.target.value)} 
				type='date'/>
			<button onClick={adicionarTarefa}>Salvar</button>
		</div>
	)
}

export default AdicionarTarefa;