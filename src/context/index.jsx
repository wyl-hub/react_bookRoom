import { createContext } from "react"
import { useReducer } from "react"

function reducer(state, action) {
  switch (action.type) {
    case "update":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const ContextStore = createContext(null)

export const ContextProvider = ({ children }) => {
  const userInfo = JSON.parse(window.localStorage.getItem("user_info") || {})
  const [contextState, dispatch] = useReducer(reducer, {
    userInfo,
    menuType: 2,
  })

  return (
    <ContextStore.Provider value={{ contextState, dispatch }}>
      {children}
    </ContextStore.Provider>
  )
}
