import {
  Box,
  Button,
  Group,
  Text,
  Stack,
  TextInput,
  Title,
  Image,
} from "@mantine/core";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user/search?search=");
        console.log(res.data);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async (e) => {
    // Search via API
    try {
      if (search) {
        const res = await axios.get(
          `/api/user/search?search=${encodeURIComponent(search)}`
        );
        console.log(res.data);
        setResults(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setSearch("");
    setResults([]);
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Title order={2}>Explore</Title>
      <Group grow mt="xl">
        <TextInput
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Group>
          <Button maw="10rem" variant="outline" onClick={handleSearch}>
            Search
          </Button>
          <Button
            maw="10rem"
            variant="outline"
            color="red"
            onClick={handleClear}
          >
            Clear
          </Button>
        </Group>
      </Group>
      {results.users && results.totalUsers && (
        <Box mt="xl">
          <Title order={4}>Total users: {results.totalUsers}</Title>
          <Stack>
            {results.users.map((user) => (
              <Link to={`/profile/${user._id}`} key={user._id}>
                <Box
                  mt="lg"
                  sx={{
                    width: "100%",
                    padding: "2rem",
                    borderRadius: "1rem",
                    background: "#dcdcdc",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Title order={4}>{user.name}</Title>
                    <Text fz="xs">
                      User since: {dayjs(user.createdAt).format("DD MMM YYYY")}
                    </Text>
                  </Box>
                  <Box>
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={100}
                      radius="lg"
                    />
                  </Box>
                </Box>
              </Link>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Explore;
