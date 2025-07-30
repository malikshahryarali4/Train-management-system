import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { green100 } from "material-ui/styles/colors";

const TicketReservation = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TICKET
          </Typography>
          <Typography color="textPrimary" variant="h3">
            Reservations
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green100[600],
              height: 56,
              width: 56,
            }}
          >
            <ConfirmationNumberIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TicketReservation;
