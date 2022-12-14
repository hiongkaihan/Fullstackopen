import { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad
  const average = (good * 1 + bad * -1) / total
  const positive = good / total * 100

  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} sign="%" />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value, sign }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {sign}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header/>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App