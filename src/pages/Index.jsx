import { useState } from "react";
import { Box, Heading, Text, Button, Input, FormControl, FormLabel, VStack, useToast, Image } from "@chakra-ui/react";
import { FaHeart, FaLock, FaEnvelope } from "react-icons/fa";

const API_BASE_URL = "https://backengine-gawg.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleSignup = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast({
          title: "Signup successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errData = await res.json();
        toast({
          title: "Signup failed",
          description: errData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn(true);
      } else {
        const errData = await res.json();
        toast({
          title: "Login failed",
          description: errData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <Box p={8} textAlign="center">
        <Heading mb={4}>
          Welcome! <FaHeart color="red" />
        </Heading>
        <Text fontSize="xl" mb={8}>
          You are now logged in to this super cute website!
        </Text>
        <Image src="https://images.unsplash.com/photo-1578956919791-af7615c94b90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYW5pbWFsc3xlbnwwfHx8fDE3MTA2MzQyMjZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Cute animals" maxW="400px" mx="auto" mb={8} />
        <Button colorScheme="pink" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="400px" mx="auto" mt={8} p={8} borderWidth={1} borderRadius={8}>
      <Heading mb={6} textAlign="center">
        <FaHeart color="red" /> My Cute Website <FaHeart color="red" />
      </Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a password" />
        </FormControl>
        <Button leftIcon={<FaEnvelope />} colorScheme="pink" onClick={handleSignup}>
          Sign Up
        </Button>
        <Button leftIcon={<FaLock />} colorScheme="purple" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
