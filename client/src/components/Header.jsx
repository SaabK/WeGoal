import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector(store => store.auth);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>WeGoal</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className='btn' onClick={handleLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to='/login'>
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<FaUser /> Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}

export default Header;
