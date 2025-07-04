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

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

export const callGeminiApi = async (request: GeminiRequest): Promise<{ text: string }> => {
  const apiKey = "AIzaSyBPWD8VGE4EUqGzsdfP-nLfDV0JNOHdBoM"; // Default API key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      console.error('Gemini API Error:', response.status, await response.text());
      throw new Error('Invalid request to Gemini API. Please try again.');
    }

    const data: GeminiResponse = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    return { text: data.candidates[0].content.parts[0].text };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};
