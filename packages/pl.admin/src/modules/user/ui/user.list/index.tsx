import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useVM } from "../../../../ui/hooks/useVM.ts";
import { UsersViewModel } from "../../view_model/users.viewmodel.ts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "email", width: 130 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "roles", headerName: "Roles", width: 130 },
  { field: "actions", headerName: "Actions", width: 130 },
];

const UserList: FC<IProps> = () => {
  const user = useVM<UsersViewModel>(UsersViewModel);

  return (
    <>
      User List
      <br />
      <DataGrid
        rows={user.userList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </>
  );
};

export default observer(UserList);
