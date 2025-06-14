
interface GeminiMessage {
  role: string;
  parts: { text: string }[];
}

interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

export const callGeminiApi = async (prompt: string, apiKey: string = ""): Promise<string> => {
  // Use the provided API key as fallback when no user API key is provided
  const effectiveApiKey = apiKey.trim() || "AIzaSyBPWD8VGE4EUqGzsdfP-nLfDV0JNOHdBoM";
  
  // Use the correct Gemini API URL format with API key as parameter
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${effectiveApiKey}`;
  
  const requestBody: GeminiRequest = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 400) {
        throw new Error('Invalid API key or request. Please check your Google AI API key.');
      } else if (response.status === 403) {
        throw new Error('API key access denied. Please verify your Google AI API key permissions.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else {
        throw new Error(`API error: ${response.statusText} (Status: ${response.status})`);
      }
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response structure from API.');
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to connect to AI service. Please check your internet connection.');
    }
  }
};
