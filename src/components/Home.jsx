import {
  Box,
  Button,
  Group,
  Image,
  Input,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { imageUpload } from "../utils/helpers";
import axios from "axios";

function Home() {
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    // Sync with API
    console.log(value, image);

    // Update values in API
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios.post(
        "/api/posts/new",
        JSON.stringify({ content: value, image }),
        config
      );
      console.log(res.data);

      notifications.show({
        color: "teal",
        title: "Post created",
        message: "Your post has been created successfully",
      });

      setValue("");
      setImage(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      notifications.show({
        title: "Invalid file type",
        message: "Please upload an image file",
      });
    }
    imageUpload(imageFile, async (url) => {
      setImage(url);
    });
  };

  return (
    <Box sx={{ padding: "1rem 2rem" }}>
      <Stack>
        <Title order={2}>Create new post</Title>
        <form noValidate onSubmit={handlePostSubmit}>
          <Group
            grow
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Stack>
              <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="What's on your mind?"
                minRows={6}
                autosize
              />
              <Button variant="light" type="submit" onSubmit={handlePostSubmit}>
                Post
              </Button>
            </Stack>
            <Image
              src={image}
              radius="md"
              withPlaceholder
              maw={400}
              caption={
                <Input.Wrapper id="update-pic" label="Add photo">
                  <Input
                    id="update-pic"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageUpload}
                    sx={{
                      display: "none",
                      "&:hover": {
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }}
                  />
                </Input.Wrapper>
              }
            />
          </Group>
        </form>
      </Stack>
    </Box>
  );
}

export default Home;
