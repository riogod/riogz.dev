import { FC } from "react";
import { IProps } from "./interfaces.tsx";

import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { AccordionSummaryStyled } from "./AccordeonSummaryStyled.tsx";
import { AccordionStyled } from "./AccordeonStyled.tsx";
import MenuButton from "../MenuButton";

const ItemAccordion: FC<IProps> = ({ item }) => {
  const { children, text } = item;

  return (
    <AccordionStyled>
      <AccordionSummaryStyled aria-controls={text}>
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
