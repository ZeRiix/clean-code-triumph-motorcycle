import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export function errorToast(message: string) {
	toast({
		title: "Error",
		description: message,
		variant: "destructive",
	});
}
