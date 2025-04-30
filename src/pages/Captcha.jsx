import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  Stack,
  Typography,
  IconButton,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import { Refresh, VolumeUp } from "@mui/icons-material";
import { useState } from "react";

const Captcha = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(
      { length: 5 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };
  const [captcha, setCaptcha] = useState(generateCaptcha());

  return (
    <>
      <Stack className="captcha_block">
        <FormLabel htmlFor="captcha">
          Type the code (case sensitive){" "}
          <Typography component="span" color="error">
            *
          </Typography>
        </FormLabel>
        <Stack direction="row">
          <Controller
            name="captcha"
            control={control}
            rules={{
              required: "Please enter the CAPTCHA",
              validate: (value) =>
                value.toUpperCase() === captcha || "CAPTCHA does not match",
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                value={controllerField.value ?? ""}
                size="small"
                id={`captcha-reg-form`}
                variant="outlined"
                className="captcha_field"
                fullWidth
                placeholder="Enter CAPTCHA"
                error={!!errors["captcha"]}
                helperText={errors.captcha?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className="captcha">
                      <Typography>{captcha}</Typography>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Stack>
            <IconButton
              size="small"
              onClick={() => setCaptcha(generateCaptcha())}
            >
              <Refresh />
            </IconButton>
            {/* <IconButton size="small">
              <VolumeUp />
            </IconButton> */}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Captcha;
