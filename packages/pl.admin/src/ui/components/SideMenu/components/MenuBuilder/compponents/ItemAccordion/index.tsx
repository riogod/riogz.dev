import { FC, SyntheticEvent, useEffect, useState } from "react";
import { IProps } from "./interfaces.tsx";

import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { AccordionSummaryStyled } from "./AccordeonSummaryStyled.tsx";
import { AccordionStyled } from "./AccordeonStyled.tsx";
import MenuButton from "../MenuButton";
import { useRoute, useRouter } from "react-router5";

const ItemAccordion: FC<IProps> = ({ item }) => {
  const { children, text } = item;
  const route = useRoute().route;
  const routeNameSplited = route.name.split(".")[0];
  // const route = useRoute().route.path;
  const router = useRouter();
  const [expanded, setExpanded] = useState<boolean>(
    routeNameSplited === item.path ||
      !!item.menuAlwaysExpand ||
      item.path === route.path,
  );

  useEffect(() => {
    if (item.navigate && item.path !== route.path) {
      setExpanded(false);
    }
  }, [route.path]);

  const handleChange = (_event: SyntheticEvent, expand: boolean) => {
    if (!item.navigate) {
      setExpanded(expand);
      return;
    }
    if (item.navigate && item.path !== route.path) {
      setExpanded(true);
      router.navigate(item.navigate.path, { id: item.navigate.id });
      return;
    }
  };

  return (
    <AccordionStyled expanded={expanded} onChange={handleChange}>
      <AccordionSummaryStyled aria-controls={text} id={item.text}>
        <Typography
          variant="body2"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {text}
        </Typography>
      </AccordionSummaryStyled>
      <AccordionDetails sx={{ px: 1, pt: 0 }}>
        {children?.map((child, index) => (
          <MenuButton key={index} text={child.text} navigate={child.navigate} />
        ))}
      </AccordionDetails>
    </AccordionStyled>
  );
};

export default ItemAccordion;
