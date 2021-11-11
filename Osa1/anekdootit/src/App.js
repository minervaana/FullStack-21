import React, { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Voting = ({ max, anecdotes, most }) => {
  if (max === 0) {
    return (
      <div>
        <Header text='No votes given yet' />
      </div>
    )
  } else {
    return (
      <div>
        <Header text='Anecdote with the most votes' />
        {anecdotes[most]} <br />
        Has {max} votes.
      </div>

    )
  }

}

const App = () => {

  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMost] = useState(-1)
  const [max, setMax] = useState(0)

  const handleOneClick = () => {
    const random = Math.floor(Math.random() * 7)
    setSelected(random)
  }

  const handleVote = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    if (copy[selected] > max) {
      setMax(copy[selected])
      setMost(selected)
    }
  }

  return (
    <div>
      <div>
        <Header text='Anecdote of the day' />
        {anecdotes[selected]} <br />
        Has {votes[selected]} votes. <br />
      </div>
      <div>
        <Button handleClick={handleOneClick} text='next anecdote' />
        <Button handleClick={handleVote} text='vote' />
        <Voting max={max} anecdotes={anecdotes} most={mostVoted} />
      </div>
    </div>
  )
}

export default App