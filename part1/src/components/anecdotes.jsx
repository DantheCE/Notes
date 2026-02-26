import { useState } from 'react'
import { createLogger } from 'vite'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({text, numberOfVotes}) => {
  return (
    <>
      {text}
      <br />
      <p>has {numberOfVotes} votes</p>
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const addVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  
  const getRandomAnec = () => {
    const rando = Math.floor(Math.random() * anecdotes.length)
    setSelected(rando)
  }

  const maxVoteCount = Math.max(...votes)
  const highestAnecdoteIndex = votes.indexOf(maxVoteCount)
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]}  numberOfVotes={votes[selected]} />

      <Button text='next anecdote' onClick={getRandomAnec} />
      <Button text='vote' onClick={addVotes} />


      <h1>Anecdotes with the most votes</h1>
      {
        maxVoteCount === 0 ? (
          <p>No votes yet</p>
        ) : (
          <Anecdote text={anecdotes[highestAnecdoteIndex]} numberOfVotes={votes[highestAnecdoteIndex]} />
        )
      }
    </div>
  )
}

export default App