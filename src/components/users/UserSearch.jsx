import React from "react"
import { useState, useContext } from "react"
import GithubContext from "../../context/github/GithubContext"
import AlertContext from "../../context/alert/AlertContext"
import { fetchSearchedUsers } from "../../context/github/GithubActions"

function UserSearch() {
	const [text, setText] = useState("")

	const { users, dispatch } = useContext(GithubContext)

	const { setAlert } = useContext(AlertContext)

	const handleChange = (e) => {
		setText(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (text === "") {
			//call the setAlert fn from the AlertContext and give it a msg and type args to use
			setAlert("Please enter something", "Error")
		} else {
			//dispatch the action to the reducer from the component
			dispatch({ type: "SET_LOADING" })

			const users = await fetchSearchedUsers(text)

			dispatch({ type: "GET_USERS", payload: users })

			setText("")
		}
	}

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
			<div>
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<div className="relative">
							<input
								type="text"
								className="w-full pr-40 bg-neutral input input-lg text-zinc-300"
								placeholder="Search Users..."
								value={text}
								onChange={handleChange}
							/>
							<button
								type="submit"
								className="absolute top-0 right-0 w-36 btn btn-lg"
							>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>
			{users.length > 0 && (
				<div>
					<button
						className="btn btn-ghost btn-lg"
						onClick={() =>
							dispatch({ type: "CLEAR_USERS", payload: [] })
						}
					>
						Clear
					</button>
				</div>
			)}
		</div>
	)
}

export default UserSearch
