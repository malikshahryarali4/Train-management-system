import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "./Logo";

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <div
      style={{
        color: "black",
        fontSize: "30px",
        alignItems: "center",
        overflow: "inherit",
        marginTop: "15px",
        marginLeft: "100px",
        position: "absolute",
      }}
    >
      Pakistan Railway
    </div>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
