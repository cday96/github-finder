import React from "react"
import UserSearch from "../components/users/UserSearch"
import UserResults from "../components/users/UserResults"

function Home() {
	return (
		<div>
			{/* SEARCH COMPONENT WILL GO HERE */}
			<UserSearch />
			{/* Display a list of users matching the search */}
			<UserResults />
		</div>
	)
}

export default Home
