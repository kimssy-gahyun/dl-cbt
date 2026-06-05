import { useState } from 'react'
import './App.css'
import midtermQuestions from './data/questions.js'
import finalQuestionsRaw from './data/finalQuestions.json'

const LABELS = ['①', '②', '③', '④']

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

function getChoices(q) {
  return q.options || q.choices || []
}

function isCorrect(q, ans) {
  if (q.type === 'multiple') {
    if (!Array.isArray(ans) || ans.length !== q.answer.length) return false
    const a = [...ans].sort((x, y) => x - y)
    const b = [...q.answer].sort((x, y) => x - y)
    return a.every((v, i) => v === b[i])
  }
  return ans === q.answer
}

function isAnswered(q, ans) {
  if (q.type === 'multiple') return Array.isArray(ans) && ans.length === q.answer_count
  return ans !== undefined
}

function HomeScreen({ onSelect }) {
  return (
    <div className="home-wrap">
      <div className="home-card">
        <h1 className="home-title">딥러닝 기초</h1>
        <p className="home-sub">시험 유형을 선택하세요</p>
        <div className="home-buttons">
          <button className="btn-exam midterm" onClick={() => onSelect('midterm')}>
            중간고사
          </button>
          <button className="btn-exam final" onClick={() => onSelect('final')}>
            기말고사
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [graded, setGraded] = useState(false)

  const handlePageSelect = (selected) => {
    if (selected === 'midterm') {
      setQuestions(pickRandom(midtermQuestions, 10))
    } else if (selected === 'final') {
      setQuestions(pickRandom(finalQuestionsRaw, 10))
    }
    setAnswers({})
    setGraded(false)
    setPage(selected)
  }

  if (page === 'home') {
    return <HomeScreen onSelect={handlePageSelect} />
  }

  const handleSelect = (qIndex, choiceIndex) => {
    if (graded) return
    const q = questions[qIndex]
    if (q.type === 'multiple') {
      setAnswers(prev => {
        const current = prev[qIndex] || []
        const exists = current.includes(choiceIndex)
        const next = exists
          ? current.filter(i => i !== choiceIndex)
          : [...current, choiceIndex].sort((a, b) => a - b)
        return { ...prev, [qIndex]: next }
      })
    } else {
      setAnswers(prev => ({ ...prev, [qIndex]: choiceIndex }))
    }
  }

  const handleGrade = () => {
    setGraded(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    const pool = page === 'final' ? finalQuestionsRaw : midtermQuestions
    setQuestions(pickRandom(pool, 10))
    setAnswers({})
    setGraded(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleHome = () => {
    setAnswers({})
    setGraded(false)
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const title = page === 'final' ? '딥러닝기초 기말고사 CBT' : '딥러닝기초 중간고사 CBT'

  const score = graded
    ? questions.reduce((acc, q, i) => acc + (isCorrect(q, answers[i]) ? 1 : 0), 0)
    : null

  const answeredCount = questions.filter((q, i) => isAnswered(q, answers[i])).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>{title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {graded && (
            <div className="header-score">
              {score} / 10 &nbsp;({score * 10}점)
            </div>
          )}
          <button className="btn-home" onClick={handleHome}>홈으로</button>
        </div>
      </header>

      {graded && (
        <div className={`score-banner ${score >= 8 ? 'pass' : score >= 6 ? 'soso' : 'fail'}`}>
          {score >= 8 ? '합격권!' : score >= 6 ? '조금 더 공부하자' : '열심히 공부하자...'}&nbsp;
          {score}문제 정답 ({score * 10}점)
        </div>
      )}

      <main className="app-main">
        {questions.map((q, i) => {
          const correct = isCorrect(q, answers[i])
          const choices = getChoices(q)
          const selectedArr = q.type === 'multiple' ? (answers[i] || []) : []

          return (
            <div
              key={i}
              className={`question-card ${graded ? (correct ? 'correct' : 'wrong') : ''}`}
            >
              <p className="question-text">
                {graded && (
                  <span className={`badge ${correct ? 'badge-correct' : 'badge-wrong'}`}>
                    {correct ? '✓ 정답' : '✗ 오답'}
                  </span>
                )}
                <span className="q-num">Q{i + 1}.</span> {q.question}
                {q.type === 'multiple' && (
                  <span className="multi-hint"> (정답 {q.answer_count}개)</span>
                )}
              </p>

              <ul className="choices">
                {choices.map((choice, j) => {
                  const isSelected = q.type === 'multiple'
                    ? selectedArr.includes(j)
                    : answers[i] === j
                  const isAnswerKey = q.type === 'multiple'
                    ? Array.isArray(q.answer) && q.answer.includes(j)
                    : j === q.answer
                  const isMyWrong = q.type === 'multiple'
                    ? selectedArr.includes(j) && !q.answer.includes(j)
                    : answers[i] === j && j !== q.answer

                  let cls = 'choice'
                  if (isSelected) cls += ' selected'
                  if (graded) {
                    if (isAnswerKey) cls += ' answer'
                    else if (isMyWrong) cls += ' my-wrong'
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
              채점하기 ({answeredCount}/10 답변)
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
