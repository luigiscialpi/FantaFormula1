import { Outlet, useLocation, Navigate } from "react-router";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { useAuth } from "../contexts/AuthContext";

const pageTitles: Record<string, string | undefined> = {
	"/": undefined,
	"/squadra": "La Mia Squadra",
	"/classifica": "Classifica",
	"/mercato": "Mercato",
	"/calendario": "Calendario",
};

export function Layout() {
	const location = useLocation();
	const { user, loading } = useAuth();
	const title = pageTitles[location.pathname];

	if (loading) {
		return <div>Caricamento...</div>;
	}

	if (!user) {
		return <Navigate to="/auth" replace />;
	}

	return (
		<div
			className="flex justify-center min-h-screen"
			style={{ background: "#050505" }}
		>
			<div
				className="w-full max-w-md relative flex flex-col min-h-screen"
				style={{ background: "#0A0A0A" }}
			>
				<Header title={title} />
				<main className="flex-1 overflow-y-auto">
					<Outlet />
				</main>
				<BottomNav />
			</div>
		</div>
	);
}
