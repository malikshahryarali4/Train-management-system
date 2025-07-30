import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkeletonModel() {
  return (
    <Stack spacing={1} mt={3}>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="text" width={210} />
      <Skeleton variant="text" width={180} />
    </Stack>
  );
}
