import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";

import ProTip from "../components/pro-tip";
import Link from "../components/link";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Built with love by the `}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Material-UI
      </MuiLink>
      {` team.`}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography
          data-testid="about-message"
          variant="h4"
          component="h1"
          gutterBottom
        >
          Gatsby example
        </Typography>
        <Link to="/">Go to the main page</Link>
        <ProTip />
        <MadeWithLove />
      </Box>
    </Container>
  );
}
