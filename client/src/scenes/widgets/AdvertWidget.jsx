import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="Adverb"
        src={`http://localhost:3001/assets/as.jpg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Astorija Office & Copy Center</Typography>
        <Typography color={medium}>
          <a href="https://astorija.netlify.app/">www.astorija.com</a>
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your best printing house! Order state-wide, we deliver to every
        Macedonian city!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
