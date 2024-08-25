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
	<Root className="h-screen w-screen px-44 flex flex-col items-center justify-center">
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first-name">First name</Label>
							<Input id="first-name" placeholder="Max" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input id="last-name" placeholder="Robinson" required />
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" />
					</div>
					<Button type="submit" className="w-full">
						Create an account
					</Button>
					<Button variant="outline" className="w-full">
						Sign up with GitHub
					</Button>
				</div>
				<div className="text-center text-sm flex gap-2 pt-4 pl-0 pr-0 pb-0">
					<p>Already have an account?</p>
					<a href="/#" className="underline">
						Sign in
					</a>
				</div>
			</CardContent>
		</Card>
	</Root>,
);
