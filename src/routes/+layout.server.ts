import type { PageServerLoad } from "./protected/$types";

export const load: PageServerLoad = ({ locals }) => {
	return {
	  initialState: JSON.parse(JSON.stringify(locals.auth))
	}
}
