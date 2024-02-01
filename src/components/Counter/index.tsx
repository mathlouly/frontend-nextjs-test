import EventEmitter from 'events';
import { useState, useEffect } from 'react';

type CounterProps = {
	initialCount: number;
};

export const Counter: React.FC<CounterProps> = ({ initialCount }) => {
	const [count, setCount] = useState(initialCount);

	const eventOnMount = new CustomEvent("onCounterMount");
	const eventOnUnmount = new CustomEvent("onCounterUnmount");
	const eventOnUpdate = new CustomEvent("onCounterUpdate", { detail: count });

	useEffect(() => {
		window.dispatchEvent(eventOnMount);

		return () => {
			window.dispatchEvent(eventOnUnmount);
		};
	}, []);

	useEffect(() => {
		window.dispatchEvent(eventOnUpdate);
	});

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<div>
			<h2>Contador: {count}</h2>
			<button onClick={handleIncrement}>Incrementar +</button>
		</div>
	);
};
