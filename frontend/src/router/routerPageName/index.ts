import { routerPageNameAuth } from "@/domains/auth/router";
import { routerPageNameBike } from "@/domains/bike/router";
import { routerPageNameBikeModel } from "@/domains/bikeModel/router";
import { routerPageNameClient } from "@/domains/client/router";
import { routerPageNameNavigation } from "@/domains/navigation/router";

export const routerPageName = Object.freeze({
	...routerPageNameAuth,
	...routerPageNameNavigation,
	...routerPageNameBike,
	...routerPageNameBikeModel,
	...routerPageNameClient,
});
