export const getNavData = async () => {
  try {
    const response = await fetch('');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching navigation data:', error);
    throw error;
  }
}