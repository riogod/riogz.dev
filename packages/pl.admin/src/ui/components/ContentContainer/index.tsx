import { createElement, FC, Suspense } from "react";
import { IProps } from "./interfaces.tsx";
import { useRoute } from "react-router5";
import { IMenuItem } from "@riogz/lib.core";
import { findSegment } from "./util.ts";

const ContentContainer: FC<IProps> = () => {
  const route = useRoute();

  const segmentsArray = route.route.name.split(".");

  const appRoutes = route.router.getDependencies().menu as IMenuItem[];

  const pageComponent = findSegment(appRoutes, segmentsArray);

  return pageComponent ? (
    <Suspense fallback={<div>Loading</div>}>
      {createElement(pageComponent)}
    </Suspense>
  ) : null;
};

export default ContentContainer;
