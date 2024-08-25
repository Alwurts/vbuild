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
		<div className="mx-auto max-w-4xl grid grid-cols-2 gap-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Course Information</CardTitle>
					<CardDescription>
						Enter details about your courses.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="course-name">Course Name</Label>
							<Input id="course-name" placeholder="Introduction to Psychology" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="course-code">Course Code</Label>
							<Input id="course-code" placeholder="PSY101" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="credits">Credits</Label>
							<Input id="credits" type="number" placeholder="3" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="instructor">Instructor Name</Label>
							<Input id="instructor" placeholder="Dr. John Doe" />
						</div>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Semester Information</CardTitle>
					<CardDescription>
						Enter details about your current semester.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="semester">Semester</Label>
							<Input id="semester" placeholder="Fall 2024" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="grade">Current Grade</Label>
							<Input id="grade" placeholder="A-" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="start-date">Start Date</Label>
							<Input id="start-date" type="date" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="end-date">End Date</Label>
							<Input id="end-date" type="date" required />
						</div>
					</div>
				</CardContent>
			</Card>
			<div className="col-span-2">
				<Button type="submit" className="w-full">
					Save Semester Information
				</Button>
			</div>
		</div>
	</Root>,
);
