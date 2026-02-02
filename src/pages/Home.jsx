import { Heading, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import Quote from 'inspirational-quotes';
export default function Home() {
  // inpirational quote
  const [quote, setQuote] = useState({text: ""});

  useEffect(() => {
    const q = Quote.getQuote({author: true});
    setQuote(q);
  }, []);

  return (
    <VStack color="fg" align="start" gap="2">
      <Heading size="2xl" >Dashboard Overview</Heading>
      <Text fontSize="sm" fontStyle="italic" color="fg.muted">{quote.text} _ {quote.author} _</Text>
    </VStack>
  );
}