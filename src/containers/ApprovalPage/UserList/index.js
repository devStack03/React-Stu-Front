import "./style.css";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import ApiHelper from "../../../helpers/apiHelper";
import IconButton from '@mui/material/IconButton';
import { FaUserEdit, FaTrash } from "react-icons/fa"
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Logo from '../../../assets/img/new_logo.png'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { connect } from 'react-redux';
import { setUserRole } from '../../../redux/actions/auth';
import * as variable from "../../../variables/variables";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UserList = (props) => {
    const [open, setOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editUser, setEditUser] = useState({})
    const [roles, setrole] = useState(0);

    const openEditModal = (e, data) => {
        e.stopPropagation();
        handleOpen();
        setEditUser(data);
        setrole(data.role);
    }

    const handleChange = (e) => {
        e.stopPropagation();
        setrole(e.target.value);
    }


    const saveUserInfo = (e) => {
        e.stopPropagation();
        // let user_role = e.target.value;
        props.setUserRole(editUser.id, roles).then((res) => {
            ApiHelper.get(`${variable.API_URL}/api/domains/users/`).then(
                (res) => {
                    setUserList(res.data);
                }
            );
        })
    }

    const columns = [
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            valueGetter: (params) =>
                `${params.row.first_name || ''} ${params.row.last_name || ''}`,
        },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <div>
                            <p>{params.row.role === 0 ? <p>User</p> : null}</p>
                            <p>{params.row.role === 1 ? <p>Admin</p> : null}</p>
                        </div>
                    </>
                );
            },
        },
        {
            field: "permission",
            headerName: "Permission",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <FaUserEdit onClick={(e) => openEditModal(e, params.row)} />
                        </IconButton>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <FaTrash style={{ fontSize: "18px" }} />
                        </IconButton>
                    </>
                );
            },
        }
    ];

    useEffect(() => {
        ApiHelper.get(`${variable.API_URL}/api/domains/users/`).then(
            (res) => {
                setUserList(res.data);
            }
        );
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-md-2" style={{ background: "#212529" }}>
                    <div className="leftbar"></div>
                </div>
                <div className="col-md-10" id="userlisthg">
                    <h1 className="userHeader">UserList</h1>
                    <DataGrid
                        rows={userList}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal_logo">
                        <img src={Logo} alt="logo" id="modal_logo" />
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {editUser.email}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {
                            editUser.first_name + " " + editUser.last_name
                        }
                    </Typography>
                    <br />
                    <Typography>
                        {
                            editUser.role === 0 ? <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={roles}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>User</MenuItem>
                                    <MenuItem value={1}>Admin</MenuItem>
                                    <MenuItem value={2}>SuperAdmin</MenuItem>
                                </Select>
                            </FormControl> : null
                        }
                        {
                            editUser.role === 1 ? <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={roles}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>User</MenuItem>
                                    <MenuItem value={1}>Admin</MenuItem>
                                    <MenuItem value={2}>SuperAdmin</MenuItem>
                                </Select>
                            </FormControl> : null
                        }
                    </Typography>
                    <br />
                    <br />
                    <Typography style={{ textAlign: "right" }}>
                        <Button color="success" variant="contained" onClick={saveUserInfo}>Save</Button>&nbsp;&nbsp;&nbsp;
                        <Button color="primary" variant="contained" onClick={handleClose}>Cancel</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

// const mapStateToProps = (state) => ({
//         userRole: state.auth.userRole
// })

const mapDispatchToProps = (dispatch) => ({
    setUserRole: (id, role) => dispatch(setUserRole(id, role))
});

export default connect(null, mapDispatchToProps)(UserList);