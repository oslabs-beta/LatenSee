// Declare varible to flag when this is a cold start
let cold = true;

export const handler = async (event) => {
  // If the request is coming from LatenSee, then process it first
  if (event.body === 'LatenSee') {
    // Save status of cold when function runs
    const body = { cold };
    // Set cold to false since we have now run it
    cold = false;
    // return with the cold status
    return { statusCode: 200, body: JSON.stringify(body) };
  }
  // for all other functionality, set cold to false since we have warmed this function
  cold = false;

  /**
   * Retain all other Lambda Functionality here
   */
  return { statusCode: 200, body: JSON.stringify('Lambda complete') };
};


let cold=true;
export const handler = async (event) => {
  if(event.body==='LatenSee'){const body={cold};cold=false;return{statusCode:200,body:JSON.stringify(body)};}cold=false;

  /**
   * Retain all other Lambda Functionality here
   */
  return { statusCode: 200, body: JSON.stringify('Lambda complete') };
};