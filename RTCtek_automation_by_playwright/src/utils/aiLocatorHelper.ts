import axios from 'axios';

export async function getLocatorFromAI(failedLocator: string, domHtml: string): Promise<{ newLocator: string, reason: string }> {
  try {
    const res = await axios.post('http://localhost:5000/get-locator', {
      failedLocator,
      domHtml
    });
    return {
      newLocator: res.data?.newLocator || '',
      reason: res.data?.reason || ''
    };
  } catch (err) {
    console.error('AI Locator API error:', err);
    throw err;
  }
}
