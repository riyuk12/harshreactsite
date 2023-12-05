import { useEffect } from "react";

export default function useRemoveModal() {
	useEffect(() => {
		const modal = document.querySelector(".modal-backdrop");

		if (modal) {
			modal.removeAttribute("class");
		}
	}, []);
}
