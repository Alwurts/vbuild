import type {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import type { TGenericComponentInfer } from "./elements";

export type TBreadcrumbComponent = TGenericComponentInfer<typeof Breadcrumb> & {
  type: "Breadcrumb";
};

export type TBreadcrumbListComponent = TGenericComponentInfer<
  typeof BreadcrumbList
> & {
  type: "BreadcrumbList";
};

export type TBreadcrumbItemComponent = TGenericComponentInfer<
  typeof BreadcrumbItem
> & {
  type: "BreadcrumbItem";
};

export type TBreadcrumbLinkComponent = TGenericComponentInfer<
  typeof BreadcrumbLink
> & {
  type: "BreadcrumbLink";
};

export type TBreadcrumbPageComponent = TGenericComponentInfer<
  typeof BreadcrumbPage
> & {
  type: "BreadcrumbPage";
};

export type TBreadcrumbSeparatorComponent = TGenericComponentInfer<
  typeof BreadcrumbSeparator
> & {
  type: "BreadcrumbSeparator";
};

export type TBreadcrumbEllipsisComponent = TGenericComponentInfer<
  typeof BreadcrumbEllipsis
> & {
  type: "BreadcrumbEllipsis";
};
