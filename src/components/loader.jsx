import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
    return (
        <Box sx={{ zIndex: 1000, display: "grid", placeItems: 'center', backgroundColor: "rgba(255,255,255,0.6)", position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh" }}><CircularProgress /></Box>
    )
}
