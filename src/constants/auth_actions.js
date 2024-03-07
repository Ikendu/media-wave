export const config = (accessToken) => {
  return {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

export const getNextMonth = () => {
  let d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()
  const nextMonth = new Date(year, month + 1, day)

  return nextMonth
}

export const addNewItems = (oldState, newItems) => {
  // Create a new state object using the spread operator
  const newState = { ...oldState }

  // Merge the new items into the items property of the new state
  newState.items = { ...oldState.items, ...newItems }

  return newState
}
