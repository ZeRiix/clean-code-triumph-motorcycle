import { iWantFindManagerById } from "@checkers/manager";
import { mustBeConnectedProcess } from "./mustBeConnected";

export const mustBeManagerProcess = useBuilder()
	.createProcess("mustBeManager")
	.execute(
		mustBeConnectedProcess,
		{ pickup: ["tokenContent"] },
	)
	.presetCheck(
		iWantFindManagerById.rewriteIndexing("currentManager"),
		(pickup) => pickup("tokenContent").userId,
	)
	.exportation(["currentManager"]);
