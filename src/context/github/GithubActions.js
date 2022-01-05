import axios from "axios"

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
//const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
	baseURL: GITHUB_URL,
	// headers: {
	// 	Authorization: `token ${GITHUB_TOKEN}`,
	// },
})

// Get searched Users coming from text state of form submit
export const fetchSearchedUsers = async (text) => {
	const params = new URLSearchParams({
		q: text,
	})

	const res = await github.get(`/search/users?${params}`)
	return res.data.items

	// const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
	// 	// headers: {
	// 	// 	Authorization: `token ${GITHUB_TOKEN}`,
	// 	// },
	// })

	// //destructure to get items array from data returned
	// const { items } = await res.json()

	// return items
}

// Get specifc user and repos when 'View Profile' clicked
export const fetchUserAndRepos = async (login) => {
	const [user, repos] = await Promise.all([
		github.get(`/users/${login}`),
		github.get(`/users/${login}/repos`),
	])

	//return the user and repo as the user data and repo data fetched above
	return { user: user.data, repos: repos.data }
}
