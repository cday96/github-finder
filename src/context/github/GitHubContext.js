import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
	const initialState = {
		//state for users returned from search result
		users: [],
		//state for an indivdual user when following UserProfile route
		user: {},
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

	// Get specifc user when 'View Profile' clicked
	const fetchUser = async (login) => {
		setLoading()

		const res = await fetch(`${GITHUB_URL}/users/${login}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		})

		if (res.status === 404) {
			//redirect if no matching user exists
			window.location = "/notfound"
		} else {
			//destructure to get items array from data returned
			const data = await res.json()

			// dispatch the action type and payload to the declared reducer above - githubReducer
			dispatch({
				type: "GET_USER",
				payload: data,
			})
		}
	}

	//clear users returned from search result state
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
				user: state.user,
				loading: state.loading,
				fetchSearchedUsers: fetchSearchedUsers,
				fetchUser: fetchUser,
				clearSearchedUsers: clearSearchedUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
