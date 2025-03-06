import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'; // Para formatar a data selecionada
import Calendar from 'react-calendar';

function DatePickerModal() {
	const [showModal, setShowModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	return (
	












		{/* <div>
			<button onClick={() => setShowModal(true)}>Selecionar Data</button>

			{showModal && (
				<div>
					<div>
						<h2>Selecionar Data</h2>
						<DatePicker
							selected={selectedDate}
							onChange={handleDateChange}
							dateFormat="dd/MM/yyyy"
						/>
						<button onClick={() => setShowModal(false)}>Fechar</button>
					</div>

				</div>
			)}

			<h1>Data selecionada: {format(selectedDate, 'dd/MM/yyyy')}</h1>
		</div>
		*/}
	);
}


export default DatePickerModal;
