import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  Typography,
  Avatar
} from "@mui/material";

function Profile() {

  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {

    axios.get(
      "http://127.0.0.1:8000/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => setProfile(res.data))
    .catch(err => console.error(err));

  }, [token]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (

    <Card elevation={4}>

      <CardContent>

        <Avatar sx={{ width: 70, height: 70 }}>
          {profile.email.charAt(0).toUpperCase()}
        </Avatar>

        <Typography variant="h6">
          {profile.email}
        </Typography>

        <Typography>
          Skills: {profile.skills}
        </Typography>

        <Typography>
          Experience: {profile.experience}
        </Typography>

        <Typography>
          Location: {profile.location}
        </Typography>

      </CardContent>

    </Card>

  );

}

export default Profile;