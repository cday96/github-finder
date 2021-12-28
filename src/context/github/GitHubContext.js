import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
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

	// Get searched Users coming from text state of form submit
	const fetchSearchedUsers = async (text) => {
		setLoading()

		const params = new URLSearchParams({
			q: text,
		})

		const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		})

		//destructure to get items array from data returned
		const { items } = await res.json()

		// dispatch the action type and payload to the declared reducer above - githubReducer
		dispatch({
			type: "GET_USERS",
			payload: items,
		})
	}

	//clear users from state
	const clearSearchedUsers = () =>
		dispatch({
			type: "CLEAR_USERS",
			payload: [],
		})

	//Set loading
	const setLoading = () => dispatch({ type: "SET_LOADING" })

	return (
		//update provider to delcare the state object for users and loading now that using reducers
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				fetchSearchedUsers: fetchSearchedUsers,
				clearSearchedUsers: clearSearchedUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
