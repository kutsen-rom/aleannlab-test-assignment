import { Job } from "../App";

// Key for Google Static Map API
export const mapApiKey = process.env.REACT_APP_MAP_API_KEY;

/**
   * Fetch address with Google Geocode API, with latitude and longitude,
   * set address state to formatted_address
   * @param setAddress function to set address state
   * @param job object to get latitude and longitude
   * @returns json with address in different formats
   */
 export async function getAddress(setAddress: React.Dispatch<React.SetStateAction<string[]>>, job: Job) {
    try {
      // Fetch address with latitude, longtitude and API Key
      const result = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${job.location.lat},${job.location.long}&key=${mapApiKey}`
      );
      const json = await result.json();
      // Set address state to formatted_address
      setAddress(json.results[0].formatted_address.split(','));
      return json;
    } catch (e) {
      console.error(e);
    }
  }


/**
 * Calculate difference in years (since API returns only jobs posted years ago), between current year and a year when job was posted
 * @param created - year when job was created
 * @returns difference in number of years
 */
export function calculateDate (created: string) {
  // Year when job was created
  const dateCreatedAt = new Date(created).getFullYear();
  // Current year
  const dateNow = new Date().getFullYear();
  // Difference in years (number)
  return dateNow - dateCreatedAt;
};