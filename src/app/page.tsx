import { Logo } from "@/components/icons/Logo";
import { Badge } from "@/components/ui-editor/badge";
import { buttonVariants } from "@/components/ui-editor/button";
import { Separator } from "@/components/ui-editor/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center container max-w-4xl">
        <Link
          href="/"
          className="flex items-center justify-center gap-2"
          prefetch={false}
        >
          <Logo className="h-10 w-10" />
          <span className="text-xl font-bold">VBuild</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="#features"
            className={cn(
              buttonVariants({ size: "sm", variant: "link" }),
              "text-muted-editor-foreground"
            )}
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="https://github.com/alwurts/vbuild"
            className={cn(
              buttonVariants({ size: "sm", variant: "link" }),
              "text-muted-editor-foreground"
            )}
            target="_blank"
            prefetch={false}
          >
            GitHub
          </Link>
          <Link
            href="/composer"
            className={buttonVariants({ size: "sm" })}
            prefetch={false}
          >
            Try VBuild
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="container h-[90dvh] max-w-5xl flex flex-col items-center justify-center px-10 md:px-16">
          <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-16">
            <h1 className="w-full md:flex-1 lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Unleash Your Creativity with VBuild
            </h1>

            <div className="md:flex-1 flex flex-col items-start space-y-4">
              <p className="mx-auto text-muted-editor-foreground md:text-xl">
                VBuild is an open-source visual UI builder that empowers
                developers to create stunning React applications with Tailwind
                CSS and Shadcn/UI components.
              </p>
              <Link
                href="/composer"
                className={buttonVariants()}
                prefetch={false}
              >
                Try VBuild
              </Link>
            </div>
          </div>
        </section>
        <section
          className="container max-w-5xl pt-6 pb-12 md:pb-20 space-y-12 md:space-y-16 px-10 md:px-16"
          id="features"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Features that Empower Your Workflow
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                VBuild provides a comprehensive set of tools to streamline your
                UI development process.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Visual Design Interface</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop components, adjust styles, and see your changes in
                real-time.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Tailwind-first Components</h3>
              <p className="text-sm text-muted-foreground">
                Build your UI with Tailwind CSS, the utility-first CSS
                framework.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Shadcn/UI Components</h3>
              <p className="text-sm text-muted-foreground">
                Access a library of beautifully designed, accessible components.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Real-time Code Preview</h3>
              <p className="text-sm text-muted-foreground">
                See your changes instantly reflected in the code editor.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Easy Copy-and-Paste</h3>
              <p className="text-sm text-muted-foreground">
                Quickly copy the generated code and paste it into your project.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Open-source and Free</h3>
              <p className="text-sm text-muted-foreground">
                VBuild is an open-source project, available for everyone to use
                and contribute to.
              </p>
            </div>
          </div>
        </section>
        <Separator className="mx-auto w-[90dvw] md:w-[85dvw] max-w-5xl" />
        <section className="container max-w-5xl py-12 md:py-20 px-10 md:px-16">
          <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
            <div className="space-y-4">
              <Badge>GitHub</Badge>
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Contribute to VBuild
              </h2>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <Badge>Open-source</Badge>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                VBuild is an open-source project, and we welcome contributions
                from the community. Whether you&apos;re a seasoned developer or
                just starting out, you can help shape the future of VBuild.
              </p>
              <Link
                href="https://github.com/alwurts/vbuild"
                className={buttonVariants({ variant: "outline" })}
                target="_blank"
                prefetch={false}
              >
                Contribute
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Separator className="mx-auto w-[96dvw]" />
      <footer className="flex flex-col gap-2 sm:flex-row pt-6 pb-4 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 VBuild. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-2">
          <Link
            href="#"
            className={cn(
              buttonVariants({ size: "sm", variant: "link" }),
              "text-muted-editor-foreground text-xs"
            )}
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className={cn(
              buttonVariants({ size: "sm", variant: "link" }),
              "text-muted-editor-foreground text-xs"
            )}
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
