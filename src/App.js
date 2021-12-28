import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { GithubProvider } from "./context/github/GithubContext"
import { AlertProvider } from "./context/alert/AlertContext"
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import UserProfile from "./pages/UserProfile"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Alert from "./components/layout/Alert"

function App() {
	return (
		// Wrap in provider to allow use of Github context
		<GithubProvider>
			<AlertProvider>
				<Router>
					<div className="flex flex-col justify-between h-screen">
						<Navbar />
						<main className="container mx-auto px-3 pb-12">
							<Alert />
							{/* setup routes for pages with a catch all for if go to no exist */}
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/about" element={<About />} />
								<Route
									path="/user/:login"
									element={<UserProfile />}
								/>
								<Route
									path="/notfound"
									element={<NotFound />}
								/>
								<Route path="/*" element={<NotFound />} />
							</Routes>
						</main>
						<Footer />
					</div>
				</Router>
			</AlertProvider>
		</GithubProvider>
	)
}

export default App
