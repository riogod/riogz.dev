import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import { useRouter } from "react-router5";
import { IMenuItem } from "@riogz/lib.core";
import ItemAccordion from "./compponents/ItemAccordion";

const MenuBuilder: FC<IProps> = ({}) => {
  const routes = useRouter();
  const menuList: IMenuItem[] = routes.getDependencies().menu;
  menuList.sort(
    (a, b) => (a.sortOrder || Infinity) - (b.sortOrder || Infinity),
  );

  return (
    <>
      {menuList.map((item, index) => (
        <ItemAccordion key={item.text + index} item={item} />
      ))}
    </>
  );
};

export default MenuBuilder;
