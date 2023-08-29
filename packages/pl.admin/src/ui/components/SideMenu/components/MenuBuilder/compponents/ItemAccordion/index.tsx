import { FC, SyntheticEvent, useState } from "react";
import { IProps } from "./interfaces.tsx";

import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { AccordionSummaryStyled } from "./AccordeonSummaryStyled.tsx";
import { AccordionStyled } from "./AccordeonStyled.tsx";
import MenuButton from "../MenuButton";
import { useRoute } from "react-router5";

const ItemAccordion: FC<IProps> = ({ item }) => {
  const { children, text } = item;
  const route = useRoute().route.name.split(".")[0];

  const [expanded, setExpanded] = useState<boolean>(route === item.path);

  const handleChange = (_event: SyntheticEvent, expand: boolean) => {
    setExpanded(expand);
  };

  return (
    <AccordionStyled expanded={expanded} onChange={handleChange}>
      <AccordionSummaryStyled aria-controls={text} id={item.text}>
        <Typography variant="body2">{text}</Typography>
      </AccordionSummaryStyled>
      <AccordionDetails sx={{ px: 1, pt: 0 }}>
        {children?.map((child, index) => (
          <MenuButton
            key={index}
            text={child.text}
            navigate={child.navigate || ""}
          />
        ))}
      </AccordionDetails>
    </AccordionStyled>
  );
};

export default ItemAccordion;
