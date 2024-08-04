export default async function getGeminiResponse(message: string): Promise<string> {
  try {
    console.log('start');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/gemini/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    console.log(data.message);
    return data.message;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
}
