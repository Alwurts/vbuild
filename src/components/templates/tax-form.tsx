import jsxNodesToNodesAbstract from "@/lib/jsx/jsxToNodesAbstract";
import Root from "@/components/elements/Root";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const [
	ROOT_COMPONENT_ABSTRACT_DEFAULT,
	ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
] = jsxNodesToNodesAbstract(
	<Root className="h-screen w-screen py-10 px-0">
		<Card className="mx-auto max-w-lg">
			<CardHeader>
				<CardTitle className="text-xl">Tax Information</CardTitle>
				<CardDescription>
					Please enter your tax details below
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="income">Annual Income</Label>
						<Input
							id="income"
							type="number"
							placeholder="50000"
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="tax-rate">Tax Rate (%)</Label>
						<Input
							id="tax-rate"
							type="number"
							placeholder="15"
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="deductions">Deductions</Label>
						<Input
							id="deductions"
							type="number"
							placeholder="10000"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="state">State</Label>
						<Input
							id="state"
							placeholder="California"
							required
						/>
					</div>
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</div>
			</CardContent>
		</Card>
	</Root>,
);
