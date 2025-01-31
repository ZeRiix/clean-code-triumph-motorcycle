import { routerPageNameAuth } from "@/domains/auth/router";
import { routerPageNameBike } from "@/domains/bike/router";
import { routerPageNameBikeModel } from "@/domains/bikeModel/router";
import { routerPageNameNavigation } from "@/domains/navigation/router";

export const routerPageName = Object.freeze({
	...routerPageNameAuth,
	...routerPageNameNavigation,
	...routerPageNameBike,
	...routerPageNameBikeModel,
});
