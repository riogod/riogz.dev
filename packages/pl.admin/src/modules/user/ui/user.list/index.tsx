import { FC } from "react";
import { IProps } from "./interfaces.tsx";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { Observer } from "mobx-react-lite";
import { useVM } from "../../../../ui/hooks/useVM.ts";
import { UsersViewModel } from "../../view_model/users.viewmodel.ts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, maxWidth: 70 },
  { field: "email", headerName: "email", flex: 1 },
  { field: "firstName", headerName: "First name", flex: 1 },
  { field: "lastName", headerName: "Last name", flex: 1 },
  { field: "roles", headerName: "Roles", flex: 1 },
  { field: "actions", headerName: "Actions", flex: 1 },
];

const UserList: FC<IProps> = () => {
  const user = useVM<UsersViewModel>(UsersViewModel);

  return (
    <>
      User List
      <br />
      <Observer>
        {() => (
          <DataGrid
            rows={user.userList || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            sx={{
              [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                {
                  outline: "none",
                },
              [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                {
                  outline: "none",
                },
            }}
            isCellEditable={() => false}
            pageSizeOptions={[25, 50]}
            filterMode="server"
            paginationMode="server"
            rowSelection={false}
            rowCount={3}
            onPaginationModelChange={(p) => {
              console.log("onPaginationModelChange", p);
            }}
            // checkboxSelection
          />
        )}
      </Observer>
    </>
  );
};

export default UserList;
