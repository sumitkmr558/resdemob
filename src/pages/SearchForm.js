import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  Stack,
  CardActions,
  FormLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Captcha from "./Captcha";

function SearchForm() {
  const [rollNo, setRollNo] = useState("");
  console.log("rollNo : ", rollNo);
  const [regNo, setRegNo] = useState("");
  console.log("regNo : ", regNo);
  const [captcha, setCaptcha] = useState("");
  console.log("captcha : ", captcha);
  const navigate = useNavigate();
  const methods = useForm({ mode: "all", defaultValues: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    const { captcha, rollNo, regNo } = data;
    setRollNo(rollNo);
    setCaptcha(captcha);
    setRegNo(regNo);
    navigate("/result", {
      state: { rollNo, regNo },
    });
  };

  return (
    <>
      <Container sx={{ mt: 8 }}>
        <Card
          className="card_primary"
          sx={{ maxWidth: "640px", margin: "auto" }}
        >
          <CardHeader title={"Search Your Results"} />
          <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <CardContent
                sx={{ backgroundColor: "rgba(221, 230, 242, 0.20)" }}
              >
                <Stack spacing={1}>
                  <FormControl>
                    <FormLabel htmlFor="email_id">
                      Enter your Roll No{" "}
                      <Typography component="span" color="error">
                        *
                      </Typography>
                    </FormLabel>
                    <TextField
                      type="number"
                      id="roll"
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 40, // ← change this value to your desired height
                        },
                      }}
                      variant="outlined"
                      placeholder="Roll No"
                      fullWidth
                      {...register("rollNo", {
                        required: "Roll number is required.",
                        min: {
                          value: 1,
                          message: "Roll number must be positive.",
                        },
                      })}
                      error={!!errors.rollNo}
                      helperText={errors.rollNo?.message}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="email_id">
                      Enter your Registration No{" "}
                      <Typography component="span" color="error">
                        *
                      </Typography>
                    </FormLabel>
                    <TextField
                      type="string"
                      id="regNo"
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 40, // ← change this value to your desired height
                        },
                      }}
                      variant="outlined"
                      placeholder="Reg No"
                      fullWidth
                      {...register("regNo", {
                        required: "Reg number is required.",
                        min: {
                          value: 1,
                          message: "Reg number must be positive.",
                        },
                      })}
                      error={!!errors.regNo}
                      helperText={errors.regNo?.message}
                    />
                  </FormControl>
                  <Captcha />
                </Stack>
              </CardContent>

              <CardActions>
                <Stack
                  direction="row"
                  width="100%"
                  sx={{ justifyContent: "space-between", alignItems: "Center" }}
                >
                  <Stack direction="row" spacing={1}>
                    <Typography></Typography>
                    <Typography></Typography>
                  </Stack>

                  {/* <Button type="submit" variant="primary">
                    View Result
                  </Button> */}
                  <Button type="submit" variant="contained">
                    Search Result
                  </Button>
                </Stack>
              </CardActions>
            </Box>
          </FormProvider>
        </Card>
      </Container>
    </>
  );
}

export default SearchForm;
