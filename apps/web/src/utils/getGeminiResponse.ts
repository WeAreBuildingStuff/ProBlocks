export default async function getGeminiResponse(message: string) : Promise<string> {
  try {

    console.log("start")
    const response = await fetch(`http://localhost:8080/api/gemini/test`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
};