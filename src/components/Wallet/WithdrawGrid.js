import { React, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CancelIcon from "@material-ui/icons/CancelRounded";
import CompleteIcon from "@material-ui/icons/CheckCircleRounded";
import PendingIcon from "@material-ui/icons/AccessTimeRounded";

const iconStyle = {
  fontSize: "1rem",
};

const avatarStyle = {
  height: "20px",
  width: "20px",
  backgroundColor: "white",
};

const CanceliconStyle = {
  color: "rgb(231, 39, 39)",
  fontSize: "1em",
};

const CompleteiconStyle = {
  color: "forestgreen",
  fontSize: "1rem",
};

const PendingiconStyle = {
  fontSize: "1rem",
  color: "rgb(252, 227, 6)",
};

const transactionIDStyle = {
  padding: "6px",
  backgroundColor: "rgba(0, 0, 0, 0.06)",
  borderRadius: "10px",
  cursor: "pointer",
};

const WithdrawGrid = (props) => {
  console.log(props.data);
  return (
    <>
      {props.data.map((request, idx) => (
        <Accordion key={idx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={iconStyle} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                overflowY: "auto",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={avatarStyle}>
                    {request.status === "INITIATED" ? (
                      <PendingIcon style={PendingiconStyle} />
                    ) : request.status === "CANCELLED" ? (
                      <CancelIcon style={CanceliconStyle} />
                    ) : (
                      <CompleteIcon style={CompleteiconStyle} />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <i className="fas fa-rupee-sign" /> {request.amount}
                    </>
                  }
                />
                <ListItemText
                  primary={request.bankAccountDetails}
                  secondary={
                    request.createdAt.substr(0, 10) +
                    " | " +
                    request.createdAt.substr(11, 8)
                  }
                />
              </ListItem>
            </List>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              justifyContent="space-evenly"
            >
              <Typography>{request.status}</Typography>
              <Typography>
                Request ID : <b style={transactionIDStyle}>{request._id}</b>
              </Typography>
              {request.adminMessage ? (
                <Typography>Msg : {request.adminMessage}</Typography>
              ) : null}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
export default WithdrawGrid;
