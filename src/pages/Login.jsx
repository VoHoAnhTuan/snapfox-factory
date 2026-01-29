import { useState } from "react";
import { Box, Button, Input, Stack, Heading, Text, useToast } from "@chakra-ui/react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom"; // If using React Router

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Call the Snapfox Account API
      await login(username, password);
      
      // 2. If successful, redirect to the Orders dashboard
      navigate("/orders");
    } catch (err) {
      alert("Login failed! Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center height="100vh" bg="gray.50">
      <Box p="8" maxWidth="400px" borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
        <Stack spacing="4">
          <Heading size="lg">Snapfox Admin</Heading>
          <Text color="gray.600">Enter your credentials to manage orders</Text>
          
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
              <Button colorPalette="orange" width="full" type="submit" loading={loading}>
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Center>
  );
}