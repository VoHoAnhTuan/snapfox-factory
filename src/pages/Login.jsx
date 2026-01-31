import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom"; 

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate("/home");
    } catch (err) {
      toaster.create({
        title: "Login Failed",
        description: { err },
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center height="100vh" width="100vw" bg="bg.panel" color="fg">
      <Box
        p="8"
        minWidth="sm"
        maxWidth="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="bg.panel"
        color="fg"
        shadow="md"
      >
        <Stack spacing="4">
          <Heading size="lg">Snapfox Admin</Heading>
          <Text color="gray.600">Enter your credentials to login</Text>

          <form onSubmit={handleLogin}>
            <Stack spacing="3">
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                colorPalette="orange"
                width="full"
                type="submit"
                loading={loading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Center>
  );
}
