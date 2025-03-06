import React from "react";
import { useState, useEffect } from 'react';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import './MostrarTarefaKan.css';
import DeleteTarefa from "../DataManipulation/Delete";
import EditarTarefa from "../DataManipulation/Editar";
import AdicionarTarefa from '../AdicionarTarefa';

function MostrarTarefaKan({ moverTarefa }) {
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

	return (
		<div className="kanban-container">

			<AdicionarTarefa onTaskAdded={() => { }} />

			<div className="kanban">
				<div className="kanban-fazer">
					<h2>COMEÇAR</h2>
					{tarefas.filter(tarefa => tarefa.statusTarefa === 'A comecar').map(tarefa => (
						<div key={tarefa.id}>
							<strong>Tarefa: {tarefa.nomeTarefa}</strong > <br/>
							<strong>Dia: {tarefa.diaTarefa}</strong>
							<div className="kanban-button">
								<button onClick={() => moverTarefa(tarefa.id, 'EmProgresso')}>M</button>
								<DeleteTarefa id={tarefa.id} />
								<EditarTarefa id={tarefa.id} />
							</div>
						</div>
					))}
				</div>

				<div className="kanban-andamento">
					<h2>EM ANDAMENTO</h2>
					{tarefas.filter(tarefa => tarefa.statusTarefa === 'EmProgresso').map(tarefa => (
						<div key={tarefa.id}>
							<strong>Tarefa: {tarefa.nomeTarefa}</strong> <br/>
							<strong>Dia: {tarefa.diaTarefa}</strong>
							<button onClick={() => moverTarefa(tarefa.id, 'Acabados')}>Mover para finalizadas</button>
							<DeleteTarefa id={tarefa.id} />
							<EditarTarefa id={tarefa.id} />
						</div>
					))}
				</div>

				<div className="kanban-finalizada">
					<h2>COMPLETAS</h2>
					{tarefas.filter(tarefa => tarefa.statusTarefa === 'Acabados').map(tarefa => (
						<div key={tarefa.id}>
							<strong>Tarefa: {tarefa.nomeTarefa}</strong> <br/>
							<strong>dia: {tarefa.diaTarefa}</strong>
							<DeleteTarefa id={tarefa.id} />
							<EditarTarefa id={tarefa.id} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default MostrarTarefaKan;