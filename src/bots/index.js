function* user1() {
  const name = yield `Greetings! Welcome to social! What's your name?`
  const gender = yield `Great! Welcome to social, ${name}! We'd also like to personalize your social experience. What is your gender?`

}

export default { user1 }


const logs = [
  {
    sender: 'u0',
    message: 'Greetings! Welcome to social! What\'s your name?'
  },
  {
    sender: 'u1',
    message: 'steve'
  }
]


const convo = {
  first: { msg: 'first thing', next: 'second' },
  second: { msg: 'second thing', next: 'third' },
  third: {
    msg: 'third thing',
    nextLogState: (state, response) => {
      return {
        ...state, name: 'response', next: 'second'
      }
    }
  },
}

const logState = {
  next: 'first'
}

const getNextState = (convo, logState) => {

}
