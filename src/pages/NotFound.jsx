import React from "react"
import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"

function NotFound() {
	return (
		<div className="hero">
			<div clasName="text-center hero-content">
				<div className="max-w-lg">
					<h1 className="text-6xl font-bold mb-8">
						Oops! These Aren't the Droids You're Looking For...
					</h1>
					<p className="text-3xl mb-8">404 - Page Not Found!</p>
					<Link to="/" className="btn btn-primary btn-lg">
						<FaHome className="mr-2" /> Return Home
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound
