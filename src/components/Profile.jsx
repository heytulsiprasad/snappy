import {
  Box,
  Title,
  Text,
  Stack,
  Image,
  Flex,
  TextInput,
  Button,
  Input,
  Radio,
  Group,
  Loader,
} from "@mantine/core";
import axios from "axios";
import { DateInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import fakeBg from "./../assets/background.jpg";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  setCurrentUser,
  setProfile,
  setProfileImage,
} from "../features/auth/authSlice";
import { getUserInfo, imageUpload } from "../utils/helpers";
import { notifications } from "@mantine/notifications";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Fetch latest profile
  useEffect(() => {
    getUserInfo(dispatch, setCurrentUser);
  }, [dispatch]);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const { name, email, profile } = currentUser;
  const {
    bio,
    company,
    location,
    twitterlink,
    githublink,
    facebooklink,
    linkedinlink,
    instagramlink,
    dateOfBirth,
    gender,
    image,
  } = profile;

  const form = useForm({
    initialValues: {
      name,
      bio,
      company,
      location,
      twitterlink,
      githublink,
      facebooklink,
      linkedinlink,
      instagramlink,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      image,
    },
  });

  const formSubmitHandler = async (values) => {
    // Sync with API
    console.log(values);

    setLoading(true);
    // Update values in API
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const body = JSON.stringify({ ...values });

      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.post("/api/profile/edit", body, config);
      console.log(res.data);

      setProfile(res.data.profile);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateImageHandler = async (event) => {
    const imageFile = event.target.files[0];

    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      notifications.show({
        title: "Invalid file type",
        message: "Please upload an image file",
      });
    }

    imageUpload(imageFile, async (url) => {
      dispatch(setProfileImage({ image: url }));
      form.setFieldValue("image", url);
    });
  };

  return (
    <Box sx={{ padding: "1rem 2rem" }}>
      <Flex direction="column" justify="center" align="center" p={4}>
        <Box maw={300} my={12}>
          <Image
            src={image ? image : fakeBg}
            radius="md"
            withPlaceholder
            caption={
              <Input.Wrapper id="update-pic" label="Edit Profile">
                <Input
                  id="update-pic"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={updateImageHandler}
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
        </Box>
        <Stack align="center" spacing="xs">
          <Title order={3}>{name}</Title>
          <Text size="sm" color="gray">
            {bio}
          </Text>
        </Stack>
      </Flex>
      <form onSubmit={form.onSubmit((values) => formSubmitHandler(values))}>
        <Group spacing="xl" grow align="start" mt="xl">
          <Stack>
            <Title order={2}>Personal Information</Title>

            <TextInput
              label="Name"
              placeholder="Your name"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Email address"
              value={email}
              disabled
            />
            <TextInput
              label="Bio"
              placeholder="Bio"
              {...form.getInputProps("bio")}
            />
            <TextInput
              label="Company"
              placeholder="Which company do you work for?"
              {...form.getInputProps("company")}
            />
            <TextInput
              label="Location"
              placeholder="Where are you based?"
              {...form.getInputProps("location")}
            />
            <Radio.Group
              label="Choose your gender"
              {...form.getInputProps("gender")}
            >
              <Group mt="xs">
                <Radio value="male" label="Male" />
                <Radio value="female" label="Female" />
                <Radio value="others" label="Others" />
              </Group>
            </Radio.Group>
            <DateInput
              valueFormat="DD MMM YYYY"
              label="Date of Birth"
              placeholder="Enter your Date of Birth"
              {...form.getInputProps("dateOfBirth")}
            />
          </Stack>
          <Stack>
            <Title order={2}>Social media handles</Title>

            <TextInput
              label="Github Username"
              placeholder="Github Username"
              icon={<AiFillGithub />}
              {...form.getInputProps("githublink")}
            />
            <TextInput
              label="Twitter Handle"
              placeholder="Twitter Username"
              icon={<AiFillTwitterCircle />}
              {...form.getInputProps("twitterlink")}
            />
            <TextInput
              label="Facebook Username"
              placeholder="Facebook Username"
              icon={<AiFillFacebook />}
              {...form.getInputProps("facebooklink")}
            />
            <TextInput
              label="LinkedIn Username"
              placeholder="LinkedIn Username"
              icon={<AiFillLinkedin />}
              {...form.getInputProps("linkedinlink")}
            />
            <TextInput
              label="Instagram handle"
              placeholder="Instagram handle"
              icon={<AiFillInstagram />}
              {...form.getInputProps("instagramlink")}
            />
          </Stack>
        </Group>
        <Button mt="2rem" type="submit" disabled={!form.isDirty()}>
          {loading ? <Loader color="#fff" size="sm" /> : "Save"}
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
