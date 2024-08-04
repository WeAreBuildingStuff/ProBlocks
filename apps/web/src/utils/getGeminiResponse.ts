export default async function getMoveCommands(message: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/gemini/move-commands`, {
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
    return data.message;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
}
