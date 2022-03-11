import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export interface IProps {
  deleteUser(id: number): void;
  editUser(id: number, username: string): void;
  usersList: any;
}

function Users(props: IProps) {
  const { editUser, deleteUser, usersList } = props;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">username</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {usersList &&
                usersList.map((item: any) => {
                  return (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      {item.id}
                      </TableCell>
                      <TableCell align="right">{item.username}</TableCell>
                      <TableCell align="right">{item.role}</TableCell>
                      <TableCell align="right">
                        <Button variant="outlined" onClick={() => editUser(item.id, item.username)}>
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          onClick={() => deleteUser(item.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Users;
