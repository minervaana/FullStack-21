import React, { useState } from 'react'
const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <td>{text} {value}</td>
  )
}

const Statistics = ({ good, neutral, bad, allClicks }) => {

  const CalculateAverage = ({ allClicks }) => {

    let sum = 0
    let average = 0

    allClicks.forEach(value => {
      if (value === 'B') {
        sum -= 1
      }
      if (value === 'G') {
        sum += 1
      }
    });

    average = sum / allClicks.length

    return (
      <div>{average}</div>

    )
  }

  const calculatePositive = ({ allClicks }) => {
    let good = 0
    let positive = 0

    allClicks.forEach(value => {
      if (value === 'G') {
        good += 1
      }

      positive = good * 100 / allClicks.length

    })

    return (
      <div>{positive} %</div>

    )
  }

  if (allClicks.length === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
        <tr><StatisticLine text='good' value={good} /></tr>
        <tr><StatisticLine text='neutral' value={neutral} /></tr>
        <tr><StatisticLine text='bad' value={bad} /></tr>
        <tr><StatisticLine text='all' value={allClicks.length} /></tr>
        <tr><StatisticLine text='average' value={CalculateAverage(allClicks = { allClicks })} /></tr>
        <tr><StatisticLine text='positive' value={calculatePositive(allClicks)} /></tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks.concat('G'))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks.concat('N'))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks.concat('B'))
  }

  return (
    <div>
      <Header title='give feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  )
}

export default App