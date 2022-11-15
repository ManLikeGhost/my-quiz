import React, { useState } from 'react';

import { fetchQuizQuestions } from './API';

import QuestionCard from './components/QuestionCard';

import { QuestionState, Difficulty } from './API';


const TOTAL_QUESTIONS: number = 10;

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty._EASY))

	const startTrivia = async () => {};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

	const nextQuestion = () => {};

	return (
		<div className='App'>
			<h1>My Quiz</h1>
			<button className='start' onClick={startTrivia}>
				Begin !!!
			</button>

			<p className='score'>Score: </p>
			<p className='Loader'>Loading Trivia Q's </p>
			{/* <QuestionCard
				question={questions[number].question}
				answers={questions[number].answers}
				callback={checkAnswer}
				userAnswer={userAnswers ? userAnswers[number] : undefined}
				questionNum={number + 1}
				totalQuestions={TOTAL_QUESTIONS}
			/> */}
			<button className='next' onClick={nextQuestion}>
				Next Q
			</button>
		</div>
	);
}

export default App;
