import React, { useState } from 'react';

import { fetchQuizQuestions } from './API';

import QuestionCard from './components/QuestionCard';

import { QuestionState, Difficulty } from './API';

import { GlobalStyle, Wrapper } from './APP.styles';

export type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
};

const TOTAL_QUESTIONS: number = 10;

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty._EASY));

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			Difficulty._EASY
		);

		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			// Users answers
			const answer = e.currentTarget.value;
			// Check answer against the correct answer
			const correct = questions[number].correct_answer === answer;
			// Add score if answerr is correct
			if (correct) setScore((prev) => prev + 100);
			// Save answer in the array for user answers
			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};
			setUserAnswers((prev) => [...prev, answerObject]);
		}
	};

	const nextQuestion = () => {
		// Move onto the next question if not the last question
		const nextQuestion = number + 1;

		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	};

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<h1 style={{color: '#fff'}}>My Quiz</h1>
				{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
					<button className='start' onClick={startTrivia}>
						Begin !!!
					</button>
				) : null}

				{!gameOver ? <p className='score'>Score: {score} </p> : null}
				{loading && <p className='Loader'>Loading Trivia Q's.... </p>}
				{!loading && !gameOver && (
					<QuestionCard
						question={questions[number].question}
						answers={questions[number].answers}
						callback={checkAnswer}
						userAnswer={userAnswers ? userAnswers[number] : undefined}
						questionNum={number + 1}
						totalQuestions={TOTAL_QUESTIONS}
					/>
				)}
				{!gameOver &&
				!loading &&
				userAnswers.length === number + 1 &&
				number !== TOTAL_QUESTIONS - 1 ? (
					<button className='next' onClick={nextQuestion}>
						Next Q
					</button>
				) : null}
			</Wrapper>
		</>
	);
}

export default App;
