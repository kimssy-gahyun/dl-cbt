import { useState, useCallback } from 'react'
import './App.css'
import allQuestions from './data/questions.js'

const LABELS = ['①', '②', '③', '④']

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

export default function App() {
  const [questions, setQuestions] = useState(() => pickRandom(allQuestions, 10))
  const [answers, setAnswers] = useState({})
  const [graded, setGraded] = useState(false)

  const handleSelect = (qIndex, choiceIndex) => {
    if (graded) return
    setAnswers(prev => ({ ...prev, [qIndex]: choiceIndex }))
  }

  const handleGrade = () => {
    setGraded(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setQuestions(pickRandom(allQuestions, 10))
    setAnswers({})
    setGraded(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const score = graded
    ? questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0)
    : null

  return (
    <div className="app">
      <header className="app-header">
        <h1>딥러닝기초 중간고사 CBT</h1>
        {graded && (
          <div className="header-score">
            {score} / 10 &nbsp;({score * 10}점)
          </div>
        )}
      </header>

      {graded && (
        <div className={`score-banner ${score >= 8 ? 'pass' : score >= 6 ? 'soso' : 'fail'}`}>
          {score >= 8 ? '합격권!' : score >= 6 ? '조금 더 공부하자' : '열심히 공부하자...'}&nbsp;
          {score}문제 정답 ({score * 10}점)
        </div>
      )}

      <main className="app-main">
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.answer
          const isAnswered = answers[i] !== undefined

          return (
            <div
              key={i}
              className={`question-card ${graded ? (isCorrect ? 'correct' : 'wrong') : ''}`}
            >
              <p className="question-text">
                {graded && (
                  <span className={`badge ${isCorrect ? 'badge-correct' : 'badge-wrong'}`}>
                    {isCorrect ? '✓ 정답' : '✗ 오답'}
                  </span>
                )}
                <span className="q-num">Q{i + 1}.</span> {q.question}
              </p>

              <ul className="choices">
                {q.choices.map((choice, j) => {
                  let cls = 'choice'
                  if (answers[i] === j) cls += ' selected'
                  if (graded) {
                    if (j === q.answer) cls += ' answer'
                    else if (answers[i] === j) cls += ' my-wrong'
                  }
                  return (
                    <li key={j} className={cls} onClick={() => handleSelect(i, j)}>
                      <span className="choice-label">{LABELS[j]}</span>
                      {choice}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}

        <div className="bottom-buttons">
          {!graded ? (
            <button className="btn btn-submit" onClick={handleGrade}>
              채점하기 ({Object.keys(answers).length}/10 답변)
            </button>
          ) : (
            <button className="btn btn-reset" onClick={handleReset}>
              새 문제 10개 뽑기
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
