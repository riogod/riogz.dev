import { createElement, FC } from "react";
import { IProps } from "./interfaces.tsx";
import { useRouter } from "react-router5";
import { IMenuItem } from "@riogz/lib.core";
import ItemAccordion from "./compponents/ItemAccordion";
import { useVM } from "../../../../hooks/useVM.ts";
import { observer } from "mobx-react-lite";
import { UserProjectsViewModel } from "../../../../../modules/user.project/view_model/projects.viewmodel.ts";

const MenuBuilder: FC<IProps> = ({}) => {
  const routes = useRouter();
  const menuList: IMenuItem[] = routes.getDependencies().menu;
  menuList.sort(
    (a, b) => (a.sortOrder || Infinity) - (b.sortOrder || Infinity),
  );

  const ui = useVM<UserProjectsViewModel>(UserProjectsViewModel);
  if (!ui.loaded) {
    return null;
  }
  return (
    <>
      {menuList.map((item, index) => {
        if (item.menuComponent) {
          return createElement(item.menuComponent, { key: "i" + index });
        }

        return <ItemAccordion key={item.text + index} item={item} />;
      })}
    </>
  );
};

export default observer(MenuBuilder);
