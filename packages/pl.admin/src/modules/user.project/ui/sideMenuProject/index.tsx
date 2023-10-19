import { FC, useState } from "react";
import { IProps } from "./interfaces.tsx";
import { useVM } from "../../../../ui/hooks/useVM.ts";
import { UserProjectsViewModel } from "../../view_model/projects.viewmodel.ts";
import { observer } from "mobx-react-lite";
import { Box, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddNewProject from "./addNewProject";
import ItemAccordion from "../../../../ui/components/SideMenu/components/MenuBuilder/compponents/ItemAccordion";
import { PROJECT_ROUTES } from "../../config/routes.ts";

const SideMenuProject: FC<IProps> = ({}) => {
  const projectList = useVM<UserProjectsViewModel>(UserProjectsViewModel);
  const [addNewItem, setAddNewItem] = useState(false);

  const onSaveHandler = async (text: string) => {
    await projectList.create(text);
    setAddNewItem(false);
  };
  const handleAddButton = (
    <>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ p: 0, pl: 1.5, pr: 1.5, mt: 1 }}
        onClick={() => setAddNewItem(true)}
      >
        new
      </Button>
    </>
  );

  return (
    <Box>
      {projectList.list.map((item, index) => (
        <ItemAccordion
          key={item.name + index}
          item={{
            text: item.name,
            path: "/project/" + item.id,
            navigate: {
              id: String(item.id),
              path: PROJECT_ROUTES.PROJECTS,
            },
          }}
        />
        // <div key={index}>{item.name}</div>
      ))}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
          mb: 2,
          ml: 2,
          mr: 2,
        }}
      >
        {addNewItem ? (
          <AddNewProject
            onCancel={() => {
              setAddNewItem(false);
            }}
            onSave={onSaveHandler}
          />
        ) : (
          handleAddButton
        )}
      </Box>
      <Divider />
    </Box>
  );
};

export default observer(SideMenuProject);
