import { Button, type ButtonProps } from "@mui/material";

export function BaseButton({
  children,
  ...props
}: ButtonProps & { children?: React.ReactNode }) {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        backgroundColor: `var(--mui-palette-${props.color}-main)`,
        border: `1px solid var(--mui-palette-${props.color}-dark)`,
        boxShadow: "none",
        "&:hover": {
          backgroundColor: `var(--mui-palette-${props.color}-dark)`,
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
}
