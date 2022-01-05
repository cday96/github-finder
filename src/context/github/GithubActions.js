const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
//const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Get searched Users coming from text state of form submit
export const fetchSearchedUsers = async (text) => {
	const params = new URLSearchParams({
		q: text,
	})

	const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
		// headers: {
		// 	Authorization: `token ${GITHUB_TOKEN}`,
		// },
	})

	//destructure to get items array from data returned
	const { items } = await res.json()

	return items
}

// Get specifc user when 'View Profile' clicked
export const fetchUser = async (login) => {
	const res = await fetch(`${GITHUB_URL}/users/${login}`, {
		// headers: {
		//     Authorization: `token ${GITHUB_TOKEN}`,
		// },
	})

	if (res.status === 404) {
		//redirect if no matching user exists
		window.location = "/notfound"
	} else {
		const data = await res.json()

		// dispatch the action type and payload to the declared reducer above - githubReducer
		// dispatch({
		//     type: "GET_USER",
		//     payload: data,
		// })
		return data
	}
}

// Get user repos
export const fetchUserRepos = async (login) => {
	const params = new URLSearchParams({
		sort: "created",
		per_page: 10,
	})

	const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
		// headers: {
		// 	Authorization: `token ${GITHUB_TOKEN}`,
		// },
	})

	const data = await res.json()

	return data
}
