import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

function GoalForm() {
	const dispatch = useDispatch();

	const [text, setText] = useState('');

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(createGoal({ text }));
		setText('');
	};

	return (
		<section className='form'>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='text'>Goal</label>
					<input
						type='text'
						id='text'
						name='text'
						value={text}
						onChange={e => setText(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<button className='btn btn-block' type='submit'>
						Add Goal
					</button>
				</div>
			</form>
		</section>
	);
}

export default GoalForm;
