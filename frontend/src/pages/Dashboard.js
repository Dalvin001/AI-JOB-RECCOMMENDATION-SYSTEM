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

        // ✅ PROFILE
        const profileRes = await axios.get(
          "http://127.0.0.1:8000/profile/me",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!profileRes.data) {
          window.location.href = "/complete-profile";
          return;
        }

        setProfile(profileRes.data);

        // ✅ FIX SKILLS (NO MORE "p,y,t,h,o,n")
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

        // ✅ API CALLS (ALL SAFE)
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

            axios.get(
              "http://127.0.0.1:8000/market/insights"
            )
          ]);

        // ✅ JOBS
        if (jobsRes.status === "fulfilled") {
          setJobs(Array.isArray(jobsRes.value.data)
            ? jobsRes.value.data
            : []);
        }

        // ✅ SKILLS
        if (skillsRes.status === "fulfilled") {
          setSkills(skillsRes.value.data?.recommended_skills || []);
        }

        // ✅ MARKET
        if (marketRes.status === "fulfilled") {
          setMarket(marketRes.value.data || null);
        }

      } catch (err) {
        console.error("Dashboard error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }

        if (err.response?.status === 404) {
          window.location.href = "/complete-profile";
          return;
        }

        setError(
          err.response?.data?.detail ||
          "Failed to load dashboard data."
        );

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  // 🔄 LOADING
  if (loading) {
    return (
      <Box sx={loadingStyle}>
        <CircularProgress color="inherit" />
        <Typography mt={2}>
          Preparing your AI dashboard...
        </Typography>
      </Box>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // 📊 CHART
  const chartData = market
    ? {
        labels: market.top_skills?.map(s => s[0]) || [],
        datasets: [
          {
            label: "Market Demand",
            data: market.top_skills?.map(s => s[1]) || []
          }
        ]
      }
    : null;

  return (
    <Box sx={pageStyle}>
      <Container>

        {/* HEADER */}
        <Typography variant="h5" color="#fff" mb={1}>
          Welcome back, {profile?.name || "User"} 👋
        </Typography>

        <Typography variant="h3" fontWeight="bold" color="#fff" mb={4}>
          AI Career Dashboard
        </Typography>

        <Grid container spacing={3}>

          {/* PROFILE */}
          <Grid item xs={12} md={4}>
            <Card sx={glassCard}>
              <CardContent>

                <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                  {profile?.email?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>

                <Typography variant="h6" fontWeight="bold">
                  {profile?.name || profile?.email}
                </Typography>

                <Typography mt={1}>
                  📍 {profile?.location || "Unknown"}
                </Typography>

                <Typography>
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
                        size="small"
                        sx={{ mr: 1, mt: 1 }}
                      />
                    ))}
                </Box>

              </CardContent>
            </Card>
          </Grid>

          {/* JOBS */}
          <Grid item xs={12} md={4}>
            <Card sx={glassCard}>
              <CardContent>

                <Typography variant="h6">
                  💼 Recommended Jobs
                </Typography>

                <List>
                  {jobs.length > 0 ? jobs.slice(0, 5).map((job, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={job.title}
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
            <Card sx={glassCard}>
              <CardContent>

                <Typography variant="h6">
                  🧠 Skills to Learn
                </Typography>

                <List>
                  {skills.length > 0 ? skills.map((s, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={s} />
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
            <Card sx={glassCard}>
              <CardContent>

                <Typography variant="h6">
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

// 🎨 STYLES
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  py: 6
};

const loadingStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "#fff"
};

const glassCard = {
  backdropFilter: "blur(15px)",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "20px",
  color: "#fff"
};

export default Dashboard;