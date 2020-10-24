import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import app from "./base"
import { AuthContext } from "./Auth.js";
import firebase from "firebase"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': {
            margin: theme.spacing(1.5),
            width: '30ch',
        },
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [detail, setDetail] = React.useState(true)
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [muser, setMuser] = useState('')
    const [mpass, setMpass] = useState('')

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const addToClient = async()=>{
        console.log("+++++++++++++++++++++++++++")
        console.log(user)
        console.log(pass)
        console.log(muser)
        console.log(mpass)
        console.log(currentUser.email)
        // await firebase.database().ref("data").set({user:"tarun"})
        await firebase.database().ref(`/clients/${currentUser.email.split('@')[0]}/admin`).set({user, pass})
        await firebase.database().ref(`/clients/${currentUser.email.split('@')[0]}/management`).set({muser, mpass})
    }

    const drawer = (
        <div>
            <div style={{ textAlign: "center", marginTop: 20, fontSize: 30, color: 'red' }}>Facegenie</div>
            <div className={classes.toolbar} />
            <List>
                {['Client Management', 'Add Client', 'AI management', 'Setting'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Add Client
                    </Typography>
                    <Button style={{marginLeft: 100}} variant="contained" color="secondary" onClick={()=>app.auth().signOut()}>
                        LogOut
                    </Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main style={{marginLeft: 300}} className={classes.content}>
                <div className={classes.toolbar} />
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => { setDetail(true) }}>General Detail</Button>
                    <Button>Owner Detail</Button>
                    <Button>Point of Contact 1</Button>
                    <Button>Point of Contact 2</Button>
                    <Button onClick={() => { setDetail(false) }}>Login Credential</Button>
                </ButtonGroup>
                {
                    detail ? <div>
                        <div>
                            <TextField
                                id="filled-textarea"
                                label="Company Name"
                                placeholder="Placeholder"
                                multiline
                                variant="filled"
                            />
                        </div>
                        <div>
                            <TextField
                                id="filled-textarea"
                                label="Type of Business"
                                placeholder="Placeholder"
                                multiline
                                variant="filled"
                            />
                        </div>
                        <div>
                            <TextField
                                id="filled-textarea"
                                label="Email Id"
                                placeholder="Placeholder"
                                multiline
                                variant="filled"
                            />
                        </div>
                        <div>
                            <TextField
                                id="filled-textarea"
                                label="Phone Number"
                                placeholder="Placeholder"
                                multiline
                                variant="filled"
                            />
                        </div>
                        <div>
                            <TextField
                                id="filled-textarea"
                                label="Address"
                                placeholder="Placeholder"
                                multiline
                                variant="filled"
                            />
                        </div>
                    </div> : <div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div>
                                    <div style={{ color: 'red', paddingLeft: 15, paddingTop: 10 }}>Admin Credential</div>
                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                        <TextField
                                            id="filled-textarea"
                                            label="Admin Username"
                                            placeholder="Placeholder"
                                            multiline
                                            onChange={(e)=>setUser(e.target.value)}
                                            variant="filled"
                                        />
                                        <TextField
                                            id="filled-textarea"
                                            label="Admin Password"
                                            placeholder="Placeholder"
                                            multiline
                                            onChange={(e)=>setPass(e.target.value)}
                                            variant="filled"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: 'red', paddingLeft: 15, paddingTop: 10 }}>Management Credential</div>
                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                        <TextField
                                            id="filled-textarea"
                                            label="Management Username"
                                            placeholder="Placeholder"
                                            multiline
                                            onChange={(e)=>setMuser(e.target.value)}
                                            variant="filled"
                                        />
                                        <TextField
                                            id="filled-textarea"
                                            label="Management Password"
                                            placeholder="Placeholder"
                                            multiline
                                            onChange={(e)=>setMpass(e.target.value)}
                                            variant="filled"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div style={{ color: 'red', paddingLeft: 15, paddingTop: 10 }}>Local Server Credential</div>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <TextField
                                    disabled
                                    id="filled-textarea"
                                    label="None"
                                    placeholder="None"
                                    multiline
                                    variant="filled"
                                />
                                <TextField
                                    disabled
                                    id="filled-textarea"
                                    label="*************"
                                    placeholder="*********"
                                    multiline
                                    variant="filled"
                                />
                            </div>
                            <div style={{paddingLeft: 10}}>
                            <Button onClick={()=>{addToClient()}} variant="contained" color="secondary">
                                Add Client
                            </Button>
                            </div>
                        </div>
                }
                {/* <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
        </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                    facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                    tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                    consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                    vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                    hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                    tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                    nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
