import { routerPageNameAuth } from "@/domains/auth/router";
import { routerPageNameNavigation } from "@/domains/navigation/router";

export const routerPageName = Object.freeze({
	...routerPageNameAuth,
	...routerPageNameNavigation,
});
