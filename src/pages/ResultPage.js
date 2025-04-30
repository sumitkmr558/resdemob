import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Chip,
  Stack,
  Divider,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  autocompleteClasses,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import staticdata from "./data.json";
import { CenterFocusStrong } from "@mui/icons-material";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rollNo, regNo } = location.state || {};
  const [result, setResult] = useState(null);
  console.log("result : ", result);
  // useEffect(() => {
  //   if (rollNo && regNo) {
  //     axios
  //       .post("http://localhost:8000/search-result/", {
  //         roll_no: rollNo,
  //         reg_no: regNo,
  //       })
  //       .then((res) => setResult(res.data))
  //       .catch(() => {
  //         alert("Result not found!");
  //         navigate("/");
  //       });
  //   } else {
  //     navigate("/");
  //   }
  // }, [rollNo, regNo, navigate]);

  useEffect(() => {
    const fetchFromApi = () =>
      axios
        .post("http://localhost:8000/search-result/", {
          roll_no: rollNo,
          reg_no: regNo,
        })
        .then((res) => {
          setResult(res.data);
        });

    const fetchFromJson = async () => {
      try {
        // const resp = await fetch("/data.json");
        // console.log("resp : ", resp);
        const allResults = staticdata;
        console.log("allresults : ", allResults);
        const found = allResults.find(
          (r) => r.roll_no === rollNo && r.reg_no === regNo
        );
        if (found) {
          setResult(found);
        } else {
          throw new Error("Not found in local JSON");
        }
      } catch (e) {
        alert("Result not found anywhere!");
        navigate("/");
      }
    };

    if (rollNo && regNo) {
      fetchFromApi().catch(() => {
        // If API fails, try local JSON
        fetchFromJson();
      });
    } else {
      navigate("/");
    }
  }, [rollNo, regNo, navigate]);

  if (!result) return null;

  const data = [
    ["Part I (Hons)", result.part1_total],
    ["Part II (Hons)", result.part2_total],
    ["Paper 5", result.paper5_marks],
    ["Paper 6", result.paper6_marks],
    ["Paper 7", result.paper7_marks],
    ["Paper 8", result.paper8_marks],
    ["Practical", result.practical_marks],
    ["General Studies", result.gs_marks],
    ["Grand Total", result.grand_total],
  ];

  const formatValue = (value) => (value === 0 ? "" : value);

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Card
          className="card_primary"
          sx={{ maxWidth: "640px", margin: "auto" }}
        >
          <CardHeader
            title={"MARKSHEET"}
            titleTypographyProps={{ variant: "h6", sx: { fontWeight: 700 } }}
            action={
              <IconButton
                onClick={() => window.print()}
                sx={{ "@media print": { display: "none" } }}
              >
                <PrintIcon />
              </IconButton>
            }
          />
          <CardContent sx={{ backgroundColor: "rgba(221, 230, 242, 0.20)" }}>
            <Typography sx={{ textAlign: "center", fontWeight: 800, mb: 2 }}>
              Babasaheb Bhimrao Ambedkar Bihar University, Muzaffarpur <br></br>{" "}
              TDC Part-III Session 2018-19 Provisional Result
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 1,
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: "grey.50",
                  width: 700,
                  mx: "auto",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="center" // centers Grid items horizontally
                  textAlign="center" // centers text in all children>
                >
                  <Grid item xs={8}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {result.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Roll No.
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {result.roll_no}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Reg. No.
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {result.reg_no}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      College
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {result.college}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Faculty
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {result.faculty}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
            <TableContainer
              component={Paper}
              elevation={1}
              sx={{ borderRadius: 2, overflow: "hidden", mb: 1 }}
            >
              <Table size="small" sx={{ "& th, & td": { border: 0, py: 0.5 } }}>
                <TableHead sx={{ backgroundColor: "primary.light" }}>
                  <TableRow sx={{ "& td": { py: 0.5 } }}>
                    <TableCell sx={{ fontWeight: 700 }}>
                      Subject / Component
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, textAlign: "right" }}>
                      Marks Obtained
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(([label, value], idx) => (
                    <TableRow
                      key={idx}
                      sx={{ backgroundColor: idx % 2 ? "grey.100" : "white" }}
                    >
                      <TableCell>{label}</TableCell>
                      <TableCell
                        sx={{
                          textAlign: "right",
                          fontWeight: label === "Grand Total" ? 700 : 500,
                        }}
                      >
                        {formatValue(value)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ "& td": { py: 0.5 } }}>
                    <TableCell sx={{ fontWeight: 700 }}>
                      Result Status
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <Chip
                        label={result.result_status}
                        color={
                          result.result_status &&
                          result.result_status.toLowerCase().includes("pass")
                            ? "success"
                            : "error"
                        }
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Remarks</TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      {result.remarks || ""}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>
                      Publication Date
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      {new Date(
                        result.result_publication_date
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography>
              <b> NOTE:</b> In case of any problem please submit an application
              with relevant documents to your college within 15 days of
              publication of result. <br />
              <b>NOTICE: </b>This is provisional result. Marks mentioned against
              Part-1 & 2 are based on the entry done by the students. If any
              descripency found any time result will be cancelled. Students are
              directed to report if any descripency found in Part-1 & 2 marks as
              soon as possible.
            </Typography>
          </CardContent>
          <CardActions sx={{ "@media print": { display: "none" } }}>
            <Stack
              direction="row"
              width="100%"
              sx={{ justifyContent: "space-between", alignItems: "Center" }}
            >
              <Stack direction="row" spacing={1}>
                <Typography></Typography>
                <Typography></Typography>
              </Stack>

              <Button
                variant="contained"
                size="medium"
                onClick={() => navigate("/")}
              >
                Check Next Result
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
