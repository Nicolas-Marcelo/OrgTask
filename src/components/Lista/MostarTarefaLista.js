import React from "react";
import { useState, useEffect } from 'react';

import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import './MostrarTarefaLis.css';
import DeleteTarefa from "../DataManipulation/Delete";
import EditarTarefa from "../DataManipulation/Editar";
import AdicionarTarefa from '../AdicionarTarefa.js';
import InputTarefa from "../InputTarefa/InputTarefa.js";

function MostrarTarefaLis({ moverTarefa }) {
	const [tarefas, setTarefas] = useState([]);
	useEffect(() => {
		async function tasks() {
			const dados = (collection(db, "tarefas"));
			onSnapshot(dados, (snapShot) => {
				let listaTarefas = [];

				snapShot.forEach((doc) => {
					listaTarefas.push(
						{
							id: doc.id,
							nomeTarefa: doc.data().nomeTarefa,
							statusTarefa: doc.data().statusTarefa,
							diaTarefa: doc.data().diaTarefa
						});
				})
				setTarefas(listaTarefas);
			})
		}
		tasks();
	}, [])

	const EditarPorInput = async (IdTarefa, nome) => {
		const tarefaInfo = doc(db, "tarefas", IdTarefa);
		try {
			await updateDoc(tarefaInfo, { nomeTarefa: nome });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="lista-container">

			<AdicionarTarefa onTaskAdded={() => {}} />

			<div className="lista">
				<h2>COMEÇAR</h2>
				<div className="lista-fazer">
					{tarefas.filter(tarefa => tarefa.statusTarefa === 'A comecar').map(tarefa => (
						<div key={tarefa.id} className="tarefa-index-fazer">
							<strong className="tarefa-nome">Tarefa: <strong className="tarefa-texto-nome">
								<input
									type="text"
									className="tarefa-input"
									value={tarefa.nomeTarefa}
									onChange={(e) => EditarPorInput(tarefa.id, e.target.value)}
									 />
								</strong>
								</strong> <br />
							<strong className="tarefa-dia">Dia: {tarefa.diaTarefa}</strong>
							<div className="tarefa-botao">
								<button onClick={() => moverTarefa(tarefa.id, 'EmProgresso')}>M</button>
								<DeleteTarefa id={tarefa.id} />
								<EditarTarefa id={tarefa.id} />
							</div>
						</div>
					))}
				</div>

				<div className="lista-andamento">
					<h2>EM ANDAMENTO</h2>
					{tarefas.filter(tarefa => tarefa.statusTarefa === 'EmProgresso').map(tarefa => (
						<div key={tarefa.id}>
							<strong>Tarefa: {tarefa.nomeTarefa}</strong> <br />
							<strong>Dia: {tarefa.diaTarefa}</strong>
							<button onClick={() => moverTarefa(tarefa.id, 'Acabados')}>M</button>
							<DeleteTarefa id={tarefa.id} />
							<EditarTarefa id={tarefa.id} />
						</div>
					))}
				</div>

				<div className="lista-finalizada">
					<h2>FINALIZADAS</h2>
					{tarefas.filter(tarefa => tarefa.statusTarefa === 'Acabados').map(tarefa => (
						<div key={tarefa.id}>
							<strong>Tarefa: {tarefa.nomeTarefa}</strong> <br />
							<strong>Dia: {tarefa.nomeTarefa}</strong>
							<DeleteTarefa id={tarefa.id} />
							<EditarTarefa id={tarefa.id} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default MostrarTarefaLis;