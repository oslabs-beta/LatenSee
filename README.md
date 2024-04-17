# LatenSee

<p align="center">
  <img width="250px" src="./src/components/LatenSeeLogoHD.png" />
</p>

<p align="center">
  Improve first-run latency and visualize the latency of server-less function invocations.
</p>
![GitHub Repo stars](https://img.shields.io/github/stars/oslabs-beta/LatenSee?style=social&label=LatenSee%20Github%20Stars)
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/LatenSee?style=social&label=LatenSee%20Github%20Stars">


---
### Table of Contents


---
### Features


---
### How to use LatenSee

#### Update your Lambda functions to recognize LatenSee's pings:

In your Lambda functions, add these two lines surrounding function's declaration:

```diff
+ let cold=true;
export const handler = async (event) => {
+   if(event.body==='LatenSee'){const body={cold};cold=false;return{statusCode:200,body:JSON.stringify(body)};}cold=false;

  /**
   * Retain all other Lambda Functionality here
   */
  return { statusCode: 200, body: JSON.stringify('Lambda complete') };
};
```

See below for an explanation of the snippet:

```JavaScript
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
```
#### Build LatenSee locally and then create a docker image

```Bash
npm run build
docker build -t latensee-image .
```

#### Deploy your docker image alongside your production lambdas

For a sample guide, you can follow our high-level proof of concept walkthrough [here](/DeployOnECS.md).

---
### Contributors



If you found this interesting or helpful, feel free to drop a star on this project!

You can contribute by:
- Raising issues you find in [GitHub Issues](https://github.com/oslabs-beta/LatenSee/issues)
- Fixing issues by opening pull requests
- Improving documentation

In order to run the test suite, you can use the following:

```bash
npm install
npm run test
```
---
### License

LatenSee is distributed under the MIT License.