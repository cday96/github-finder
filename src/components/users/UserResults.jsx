import React from "react"
import { useEffect, useState } from "react"
import Spinner from "../layout/Spinner"

function UserResults() {
	const [loading, setLoading] = useState(true)
	const [users, setUsers] = useState([])

	// fetch users on load
	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
			},
		})

		const data = await res.json()

		setUsers(data)
		setLoading(false)
	}
	if (!loading) {
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{users.map((user) => (
					<h3>{user.login}</h3>
				))}
			</div>
		)
	} else {
		return <Spinner />
	}
}

export default UserResults
