import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from "@mui/material";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {

  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [market, setMarket] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {

    async function fetchData() {

      try {

        const profileRes = await axios.get(
          "http://127.0.0.1:8000/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(profileRes.data);

        const jobsRes = await axios.get(
          "http://127.0.0.1:8000/jobs/recommend",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setJobs(jobsRes.data);

        const skillsRes = await axios.get(
          "http://127.0.0.1:8000/skills/recommend",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setSkills(skillsRes.data.recommended_skills || []);

        const marketRes = await axios.get(
          "http://127.0.0.1:8000/market/insights"
        );

        setMarket(marketRes.data);

      } catch (error) {

        console.error("Dashboard data error:", error);

      } finally {

        setLoading(false);

      }

    }

    fetchData();

  }, [token]);

  if (loading) {

    return (
      <Container style={{ marginTop: 50, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading dashboard...</Typography>
      </Container>
    );

  }

  const chartData = market
    ? {
        labels: market.top_skills?.map((s) => s[0]) || [],
        datasets: [
          {
            label: "Market Demand",
            data: market.top_skills?.map((s) => s[1]) || []
          }
        ]
      }
    : null;

  return (

    <Container style={{ marginTop: 40 }}>

      <Typography variant="h4" gutterBottom>
        AI Career Dashboard
      </Typography>

      <Grid container spacing={3}>

        {/* PROFILE CARD */}

        <Grid item xs={12} md={4}>

          <Card elevation={4}>

            <CardContent>

              <Avatar
                sx={{ width: 80, height: 80, marginBottom: 2 }}
              >
                {profile?.email?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h6">
                {profile?.email}
              </Typography>

              <Typography>
                Skills: {profile?.skills || "Not set"}
              </Typography>

              <Typography>
                Experience: {profile?.experience || "Not set"}
              </Typography>

              <Typography>
                Location: {profile?.location || "Not set"}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        {/* JOB RECOMMENDATIONS */}

        <Grid item xs={12} md={4}>

          <Card elevation={4}>

            <CardContent>

              <Typography variant="h6" gutterBottom>
                Recommended Jobs
              </Typography>

              <List>

                {jobs.length > 0 ? (
                  jobs.map((job, index) => (

                    <ListItem key={index}>

                      <ListItemText
                        primary={job.title}
                        secondary={`Match Score: ${job.score}`}
                      />

                    </ListItem>

                  ))
                ) : (
                  <Typography>No job recommendations yet.</Typography>
                )}

              </List>

            </CardContent>

          </Card>

        </Grid>

        {/* SKILL RECOMMENDATIONS */}

        <Grid item xs={12} md={4}>

          <Card elevation={4}>

            <CardContent>

              <Typography variant="h6" gutterBottom>
                Skills to Learn
              </Typography>

              <List>

                {skills.length > 0 ? (
                  skills.map((skill, index) => (

                    <ListItem key={index}>
                      <ListItemText primary={skill} />
                    </ListItem>

                  ))
                ) : (
                  <Typography>No skill suggestions yet.</Typography>
                )}

              </List>

            </CardContent>

          </Card>

        </Grid>

        {/* MARKET INSIGHTS */}

        <Grid item xs={12}>

          <Card elevation={4}>

            <CardContent>

              <Typography variant="h6" gutterBottom>
                Job Market Insights
              </Typography>

              {chartData ? (
                <Bar data={chartData} />
              ) : (
                <Typography>No market insights available.</Typography>
              )}

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Container>

  );

}

export default Dashboard;