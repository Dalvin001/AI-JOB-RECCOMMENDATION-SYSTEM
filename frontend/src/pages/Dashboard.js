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
          "http://127.0.0.1:8000/profile/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!profileRes.data || profileRes.data.detail) {
          window.location.href = "/complete-profile";
          return;
        }

        setProfile(profileRes.data);

        const userSkills =
          profileRes.data.skills || "software developer";

        const results = await Promise.allSettled([

          axios.get(
            `http://127.0.0.1:8000/jobs/recommend?skills=${encodeURIComponent(userSkills)}`
          ),

          axios.get(
            "http://127.0.0.1:8000/skills/recommend",
            { headers: { Authorization: `Bearer ${token}` } }
          ),

          axios.get(
            "http://127.0.0.1:8000/market/insights"
          )

        ]);

        if (results[0].status === "fulfilled") {
          setJobs(Array.isArray(results[0].value.data)
            ? results[0].value.data
            : []);
        }

        if (results[1].status === "fulfilled") {
          setSkills(results[1].value.data?.recommended_skills || []);
        }

        if (results[2].status === "fulfilled") {
          setMarket(results[2].value.data || null);
        }

      } catch (err) {

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

  // 🎨 LOADING UI
  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff"
        }}
      >
        <CircularProgress color="inherit" />
        <Typography mt={2}>Preparing your AI dashboard...</Typography>
      </Box>
    );
  }

  // 🚨 ERROR UI
  if (error) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="error">{error}</Alert>
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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        py: 6
      }}
    >
      <Container>

        {/* 🔥 HEADER */}
        <Typography variant="h5" color="#fff" mb={1}>
          Welcome back, {profile?.name || "User"} 👋
        </Typography>

        <Typography
          variant="h3"
          fontWeight="bold"
          color="#fff"
          mb={4}
        >
          AI Career Dashboard
        </Typography>

        <Grid container spacing={3}>

          {/* 👤 PROFILE CARD */}
          <Grid item xs={12} md={4}>
            <Card sx={glassCard}>
              <CardContent>

                <Avatar
                  src={
                    profile?.avatar
                      ? `http://127.0.0.1:8000/${profile.avatar}`
                      : ""
                  }
                  sx={{ width: 80, height: 80, mb: 2 }}
                >
                  {!profile?.avatar &&
                    (profile?.email?.charAt(0)?.toUpperCase() || "U")}
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
                    .slice(0, 5)
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

          {/* 💼 JOBS */}
          <Grid item xs={12} md={4}>
            <Card sx={glassCard}>
              <CardContent>

                <Typography variant="h6" gutterBottom>
                  💼 Recommended Jobs
                </Typography>

                <List>
                  {jobs.length > 0 ? jobs.slice(0, 5).map((job, index) => (
                    <ListItem key={index} sx={hoverItem}>
                      <ListItemText
                        primary={job.title}
                        secondary={`${job.company} • ${
                          job.match_score
                            ? Math.round(job.match_score) + "%"
                            : "AI Match"
                        }`}
                      />
                    </ListItem>
                  )) : (
                    <Typography>No jobs yet</Typography>
                  )}
                </List>

              </CardContent>
            </Card>
          </Grid>

          {/* 🧠 SKILLS */}
          <Grid item xs={12} md={4}>
            <Card sx={glassCard}>
              <CardContent>

                <Typography variant="h6" gutterBottom>
                  🧠 Skills to Learn
                </Typography>

                <List>
                  {skills.length > 0 ? skills.map((s, i) => (
                    <ListItem key={i} sx={hoverItem}>
                      <ListItemText primary={s} />
                    </ListItem>
                  )) : (
                    <Typography>No suggestions</Typography>
                  )}
                </List>

              </CardContent>
            </Card>
          </Grid>

          {/* 📊 MARKET */}
          <Grid item xs={12}>
            <Card sx={glassCard}>
              <CardContent>

                <Typography variant="h6" gutterBottom>
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

// ✨ GLASS CARD STYLE
const glassCard = {
  backdropFilter: "blur(15px)",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "20px",
  color: "#fff",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  }
};

// ✨ HOVER LIST ITEM
const hoverItem = {
  borderRadius: "10px",
  "&:hover": {
    background: "rgba(255,255,255,0.1)"
  }
};

export default Dashboard;