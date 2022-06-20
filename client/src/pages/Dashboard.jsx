import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoalForm from '../components/GoalForm';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalSlice';
import GoalItem from '../components/GoalItem';

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector(store => store.auth);
	const { goals, isLoading, isError, message } = useSelector(
		store => store.goals,
	);

	useEffect(() => {
		if (isError) console.log(message);

		if (!user) navigate('/login');
		else dispatch(getGoals());

		return () => {
			dispatch(reset());
		};
	}, [user, isError, message, navigate, dispatch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<section className='heading'>
				<h1>Welcome {user && user.name}</h1>
				<p>Goals Dashboard</p>
			</section>
			<GoalForm />

			<section className='content'>
				{goals.length > 0 ? (
					<div className='goals'>
						{goals.map(goal => (
							<GoalItem key={goal._id} goal={goal} />
						))}
					</div>
				) : (
					<h3>You have not set any goals</h3>
				)}
			</section>
		</>
	);
}

export default Dashboard;
