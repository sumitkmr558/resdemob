import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
function StudentResult() {
  const [rollNo, setRollNo] = useState("");
  const [regNo, setRegNo] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/search-result/",
        {
          roll_no: rollNo,
          reg_no: regNo,
        }
      );
      setResult(response.data);
    } catch (error) {
      alert("Result not found!");
      setResult(null);
    }
  };

  return (
    <>
      <Card className="card_primary">
        <CardHeader
          title={<Typography variant="h6">Registration</Typography>}
        />

        <CardContent></CardContent>
      </Card>

      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Check Your Result
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Roll Number"
                fullWidth
                variant="outlined"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Registration Number"
                fullWidth
                variant="outlined"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Search Result
              </Button>
            </Grid>
          </Grid>
        </form>

        {result && (
          <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
            <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 5 }}>
              <Table>
                <TableBody>
                  {[
                    ["Roll No.", result.roll_no],
                    ["Reg. No.", result.reg_no],
                    ["Name", result.name],
                    ["College", result.college],
                    ["Faculty", result.faculty],
                    ["Hons. Subject", result.hons_subject],
                    ["Part-I(Hons. Total)", result.part1_total],
                    ["Part-II(Hons. Total)", result.part2_total],
                    ["Hons. Paper 5 Marks", result.paper5_marks],
                    ["Hons. Paper 6 Marks", result.paper6_marks],
                    ["Hons. Paper 7 Marks", result.paper7_marks],
                    ["Hons. Paper 8 Marks", result.paper8_marks],
                    ["Hons. Practical Marks", result.practical_marks],
                    ["GS Marks", result.gs_marks],
                    ["Grand Total", result.grand_total],
                    ["Result", result.result_status],
                    ["Remarks", result.remarks],
                    ["Marks Sheet No.", result.marks_sheet_no],
                    [
                      "Result Publication Date",
                      new Date(
                        result.result_publication_date
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }),
                    ],
                  ].map(([label, value], i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                        {label}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Container>
    </>
  );
}

export default StudentResult;
