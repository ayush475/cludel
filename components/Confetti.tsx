import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
	const [hasWon, setHasWon] = useState(false);
	const [confetti, setConfetti] = useState([]);

	const handleWin = () => {
		setHasWon(true);
		generateConfetti();
		setTimeout(() => setHasWon(false), 5000);
	};

	const generateConfetti = () => {
		let newConfetti = [];
		for (let i = 0; i < 50; i++) {
			newConfetti.push({
				left: Math.random() * 100 + "vw",
				animationDelay: Math.random() * 2 + "s",
				color: getRandomColor(),
			});
		}
		setConfetti(newConfetti);
	};

	const getRandomColor = () => {
		const colors = ["#f39c12", "#e74c3c", "#2ecc71", "#3498db", "#9b59b6"];
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<div className="game-container">
			<button onClick={handleWin}>You Win!</button>
			{hasWon && <div className="win-animation">🎉 You Won! 🎉</div>}

			{/* Render Confetti */}
			{confetti.map((confettiPiece, index) => (
				<div
					key={index}
					className="confetti"
					style={{
						left: confettiPiece.left,
						backgroundColor: confettiPiece.color,
						animationDelay: confettiPiece.animationDelay,
					}}
				></div>
			))}
		</div>
	);
};

export default App;
