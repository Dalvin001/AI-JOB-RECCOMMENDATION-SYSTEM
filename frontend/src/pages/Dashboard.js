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
  CircularProgress,
  Alert,
  Box,
  Chip
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
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        window.location.href = "/";
        return;
      }

      try {
        setLoading(true);

        const profileRes = await axios.get(
          "http://127.0.0.1:8000/profile/",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!profileRes.data) {
          window.location.href = "/complete-profile";
          return;
        }

        setProfile(profileRes.data);

        let userSkills = profileRes.data.skills;

        if (!userSkills || userSkills.trim() === "") {
          userSkills = "software developer";
        } else {
          userSkills = userSkills
            .split(",")
            .map(s => s.trim())
            .filter(Boolean)
            .join(",");
        }

        const [jobsRes, skillsRes, marketRes] =
          await Promise.allSettled([
            axios.get(
              `http://127.0.0.1:8000/jobs/recommend?skills=${encodeURIComponent(userSkills)}`,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            ),
            axios.get(
              "http://127.0.0.1:8000/skills/recommend",
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            ),
            axios.get("http://127.0.0.1:8000/market/insights")
          ]);

        if (jobsRes.status === "fulfilled") {
          setJobs(Array.isArray(jobsRes.value.data)
            ? jobsRes.value.data
            : []);
        }

        if (skillsRes.status === "fulfilled") {
          setSkills(skillsRes.value.data?.recommended_skills || []);
        }

        if (marketRes.status === "fulfilled") {
          setMarket(marketRes.value.data || null);
        }

      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }

        if (err.response?.status === 404) {
          window.location.href = "/complete-profile";
          return;
        }

        setError(err.response?.data?.detail || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <Box sx={loadingStyle}>
        <CircularProgress sx={{ color: "#2ecc71" }} />
        <Typography mt={2} fontWeight="bold">
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const chartData = market
    ? {
        labels: market.top_skills?.map(s => s[0]) || [],
        datasets: [
          {
            label: "Market Demand",
            data: market.top_skills?.map(s => s[1]) || [],
            backgroundColor: "#f1c40f"
          }
        ]
      }
    : null;

  return (
    <Box sx={pageStyle}>
      <Container>

        {/* HEADER */}
        <Typography variant="h4" fontWeight="bold" mb={1} color="#145a32">
          Welcome, {profile?.name || "User"}
        </Typography>

        <Typography variant="h5" mb={4} color="#b7950b">
          AI Career Dashboard
        </Typography>

        <Grid container spacing={3}>

          {/* PROFILE */}
          <Grid item xs={12} md={4}>
            <Card sx={cardStyle}>
              <CardContent>

                <Avatar sx={avatarStyle}>
                  {profile?.email?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>

                <Typography variant="h6" fontWeight="bold">
                  {profile?.name || profile?.email}
                </Typography>

                <Typography color="#555">
                  📍 {profile?.location || "Unknown"}
                </Typography>

                <Typography color="#555">
                  💼 {profile?.industry || "Not set"}
                </Typography>

                <Box mt={2}>
                  {(profile?.skills || "")
                    .split(",")
                    .map(s => s.trim())
                    .filter(Boolean)
                    .slice(0, 6)
                    .map((skill, i) => (
                      <Chip
                        key={i}
                        label={skill}
                        sx={chipStyle}
                      />
                    ))}
                </Box>

              </CardContent>
            </Card>
          </Grid>

          {/* JOBS */}
          <Grid item xs={12} md={4}>
            <Card sx={cardStyle}>
              <CardContent>

                <Typography variant="h6" fontWeight="bold" mb={2}>
                  💼 Recommended Jobs
                </Typography>

                <List>
                  {jobs.length > 0 ? jobs.slice(0, 5).map((job, i) => (
                    <ListItem key={i} sx={listItemStyle}>
                      <ListItemText
                        primary={
                          <Typography fontWeight="bold">
                            {job.title}
                          </Typography>
                        }
                        secondary={job.company || "Unknown"}
                      />
                    </ListItem>
                  )) : (
                    <Typography>No jobs found</Typography>
                  )}
                </List>

              </CardContent>
            </Card>
          </Grid>

          {/* SKILLS */}
          <Grid item xs={12} md={4}>
            <Card sx={cardStyle}>
              <CardContent>

                <Typography variant="h6" fontWeight="bold" mb={2}>
                  🧠 Skills to Learn
                </Typography>

                <List>
                  {skills.length > 0 ? skills.map((s, i) => (
                    <ListItem key={i} sx={listItemStyle}>
                      <ListItemText
                        primary={
                          <Typography fontWeight="bold">
                            {s}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )) : (
                    <Typography>No suggestions</Typography>
                  )}
                </List>

              </CardContent>
            </Card>
          </Grid>

          {/* MARKET */}
          <Grid item xs={12}>
            <Card sx={cardStyle}>
              <CardContent>

                <Typography variant="h6" fontWeight="bold" mb={2}>
                  📊 Job Market Insights
                </Typography>

                {chartData ? (
                  <Bar data={chartData} />
                ) : (
                  <Typography>No data available</Typography>
                )}

              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

/* 🎨 GREEN + GOLD THEME */

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #e8f8f5, #fef9e7)",
  py: 6
};

const loadingStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "18px",
  boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 35px rgba(0,0,0,0.15)"
  }
};

const avatarStyle = {
  width: 70,
  height: 70,
  mb: 2,
  bgcolor: "#27ae60",
  fontWeight: "bold",
  fontSize: "1.5rem"
};

const chipStyle = {
  mr: 1,
  mt: 1,
  backgroundColor: "#f1c40f",
  color: "#000",
  fontWeight: "bold"
};

const listItemStyle = {
  borderBottom: "1px solid #eee"
};

export default Dashboard;