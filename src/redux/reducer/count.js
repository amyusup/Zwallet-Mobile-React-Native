const initState = {
  count: 0
}

const countReducer = (state = initState, action) => {
  const { type } = action
  switch (type) {
    case 'INCREMENT':
      return {
        count: ++state.count
      }

    case 'DECREMENT':
      return {
        count: --state.count
      }

    default:
      return state
  }
}

export default countReducer