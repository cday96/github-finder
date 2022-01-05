import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
	const initialState = {
		//state for users returned from search result
		users: [],
		//state for an indivdual user when following UserProfile route
		user: {},
		//state for user repos
		repos: [],
		//state for if page loading or not
		loading: false,
	}

	// get a state and dispatch method, and input the reducer to use and intial state to use it on
	const [state, dispatch] = useReducer(githubReducer, initialState)

	// Get initial users (testing purposes)
	// const fetchUsers = async () => {
	// 	setLoading()

	// 	const res = await fetch(`${GITHUB_URL}/users`, {
	// 		headers: {
	// 			Authorization: `token ${GITHUB_TOKEN}`,
	// 		},
	// 	})

	// 	const data = await res.json()

	// 	// dispatch the action type and payload to the declared reducer above - githubReducer
	// 	dispatch({
	// 		type: "GET_USERS",
	// 		payload: data,
	// 	})
	// }

	return (
		//update provider to delcare the state object for users and loading now that using reducers
		<GithubContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
