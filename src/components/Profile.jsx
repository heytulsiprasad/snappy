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
} from "@mantine/core";
import profileImg from "./../assets/background.jpg";
import { useForm } from "@mantine/form";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";

const Profile = () => {
  const form = useForm({
    initialValues: {
      name: "",
      bio: "",
      company: "",
      location: "",
      twitterlink: "",
      githublink: "",
      facebooklink: "",
      linkedinlink: "",
      instagramlink: "",
    },
  });

  const formSubmitHandler = (values) => {
    // Sync with API
    console.log(values);
  };

  return (
    <Box sx={{ padding: "1rem 2rem" }}>
      <Flex direction="column" justify="center" align="center" p={4}>
        <Box maw={300} my={12}>
          <Image
            src={profileImg}
            radius="md"
            withPlaceholder
            caption={
              <Input.Wrapper id="update-pic" label="Edit Profile">
                <Input
                  id="update-pic"
                  type="file"
                  accept=".png, .jpg, .jpeg"
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
          <Title order={3}>Alex Young</Title>
          <Text size="sm" color="gray">
            Software Developer
          </Text>
        </Stack>
      </Flex>
      <form onSubmit={form.onSubmit((values) => formSubmitHandler(values))}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Your name"
            {...form.getInputProps("name")}
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
        </Stack>
        <Stack>
          <Title order={2} mt="2rem">
            Social media handles
          </Title>

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

        <Button mt="2rem" type="submit" disabled={!form.isDirty()}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
