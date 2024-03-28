## Deploying LatenSee on AWS ECS

This walks through an overview of hosting the LatenSee application on an ECS instance. This will allow you to access and configure your own version of the LatenSee app to keep your lambdas warm. 

**Note: The steps below do not follow best security practices, and instead are designed to simply get up and running right away. When deploying on your own, implement the privacy settings expected within your organization.**

At a high level the steps we will follow are:

1. Create a local docker image of the application
2. Upload the image to AWS ECR
3. Create a new AWS ECS Cluster
4. Create a new AWS ECS Task Definition
5. Run the new task definition in our ECS Cluster

Before running these steps you must build the application using `npm run build`.

---

## 1. Create a local docker image of the application

This repo already has a `Dockerfile` which contains the base instructions. Before starting, you should download the [Docker Desktop](https://www.docker.com/products/docker-desktop/) application. [This tutorial from Docker](https://www.docker.com/blog/getting-started-with-docker-using-node-jspart-i/) is helpful in explaining how the Dockerfile was created and outlining some of the initial steps below.

Note that the Dockerfile's first line explicitly indicates the platform in order to build correctly on Apple silicon.

At this stage you can build the dockerfile locally and test it using:

```
docker build -t latensee-docker .
```
You can then either run the container with the docker desktop application, or with the command line. Here we assume we're listening to port `3000` on the server and want to access our container from port `3333`. But we will be repeating this step after setting up ECS. Note that the `latest` tag should be added automatically because we didn't specify it in the step above.

```
docker run -p 3333:3000 latensee-docker:latest
```
If you are on apple silicon, you will need to add a platform flag.

```
docker run -p 3333:3000 --platform linux/amd64 latensee-docker:latest
```

You should now be able to access the application running locally at [localhost:3333](http://localhost:3333).

## 2. Upload the image to AWS ECR

Next we need to host our docker image somewhere, we'll chose to do this on AWS using the Elastic Container Registery.

Create a public repo and give it a descriptive name.

![Create Repository ECR](/public/createECRRepository.png)

Next, click on the new repo that you made, and click on 'View push commands' to see a set of terminal instructions to build and push your image. Follow each of the steps in turn to upload to ECR.

![Push to ECR](/public/pushtoECR.png)

When the image finishes uploading, the `Image URI` will be used in a later step, so either save it or be ready to go back and reference it later.

## 3. Create a new AWS ECS Cluster

Next we are going to set up a Cluster on the AWS Elastic Container Service. This is simply a grouping of services/tasks which consist of running containers. We'll still need to create a cluster even though we only need a single container.

Name the Cluster something memorable, and indicate that we are using AWS Fargate (serverless) infrastructure, then hit Create.

![Create Cluster](/public/createCluster.png)

## 4. Create a new AWS ECS Task Definition

Next we need to provide instructions for what kind of container should be spun up, and the resources we want to allocate to suppor that container. Here you will specify additional information about your container and how to access it, as well as optionally declare any environment variables that are needed. Out of the box, you shouldn't need to store any environment variables, but if you customize LatenSee you may need to include some of these.

**Name Task Definition & Set Infrastructure Requirements**

To begin with, pick a descriptive task definition family, and indicate that you'd like to use `AWS Fargate`. Pick the `Linux/X86_64` Operating System. LatenSee is designed to run with a small footprint, so you can pick the minimum CPU task size (0.25 vCPU / 0.5 GB memory). Set the Task role and Task execution role both to `ecsTaskExecutionRole` in the next dropdowns.

![Task Definition Infrastructure](/public/taskDefinitionInfra.png)

Next we will name the container, and indicate the Image URI (which we found from uploading our docker image to AWS ECR earlier). You can adjust the defaults for Resource Allocation limits if desired, and if any environment variables are necessary, can include those here as well.

![Container Configuration](/public/containerConfiguration.png)

## 5. Run the new task definition in our ECS Cluster

Finally, we will launch the task that we just created, and set up networking, allowing us to access the container to view the LatenSee web application.

For this simple application, we don't expect to have much traffic beyond our internal development team, so we don't need a capacity provider strategy. Under 'Environment', select compute configuration with a `Launch type` of `FARGATE`. Under `Deployment configuration` we're going to point to the task definition we made earlier. Select `Task` and pick out the TaskDefinition family we created in step #4. We only need one of this task running, so can leave the `Desired tasks field` at 1.

![Creating a new task to run](/public/newTaskEnvironment.png)

We need to set up the container to be accessible from our browser, so we'll need to adjust the Networking configurations. Open the Networking dropdown menu, and accept the defaults for `VPC` and `Subnets`, as well as ensuring that `Public IP` is turned ON.
We'll want to create a new Security group to help controll who has access to the container. Select `Create a new security group` and give it a name. Customize the actual inbound rules to match your organization's standards (we encourage you to explicitly allow only known IPs) but for the sake of demonstration we will allow a type of `All TCP` with a source from `Anywhere`.

![network settings](/public/networkSettings.png)

Hit 'Create' and wait for the trask to finish provisioning. When complete, you should be able to copy the Tasks' public IP address which can be found after clicking on the task, along with grabbing the port `3000`.