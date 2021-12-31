import React from "react"
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from "react-icons/fa"

function RepoItem({ repo }) {
	//destructure repo prop
	const {
		name,
		description,
		html_url,
		forks,
		open_issues,
		watchers_count,
		stargazers_count,
	} = repo

	return (
		<div className="mb-2 rounded-md card bg-neutral hover:bg-gray-900">
			<div className="card-body">
				<h3 className="mb-2 text-xl text-zinc-100 font-semibold">
					<a href={html_url}>
						<FaLink className="inline mr-1" />
						{name}
					</a>
				</h3>
				<p className="mb-3 text-zinc-200">{description}</p>
				<div>
					<div className="mr-2 badge badge-info badge-lg">
						<FaEye className="mr-2" /> {watchers_count}
					</div>
					<div className="mr-2 badge badge-success badge-lg">
						<FaStar className="mr-2" /> {stargazers_count}
					</div>
					<div className="mr-2 badge badge-error badge-lg">
						<FaInfo className="mr-2" /> {open_issues}
					</div>
					<div className="mr-2 badge badge-warning badge-lg">
						<FaUtensils className="mr-2" /> {forks}
					</div>
				</div>
			</div>
		</div>
	)
}

export default RepoItem
