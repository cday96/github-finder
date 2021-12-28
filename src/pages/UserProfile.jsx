import React from "react"
import { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import GithubContext from "../context/github/GithubContext"

function UserProfile({}) {
	const { user, fetchUser } = useContext(GithubContext)

	const params = useParams()
	//fetch the user based on :login param from the route on page load
	useEffect(() => {
		fetchUser(params.login)
	}, [])

	return <div>{user.login}</div>
}

export default UserProfile
