<div align="center">
  <h1 align="center">MCWOAT</h1>
  <h3>The Most Convoluded Website Of All Time</h3>

<br/>

MCWOAT is my initiation in learning Kubernetes and its intricacies. It's a simple Vite website that displays users with a color card. An express server communicates with a Go server that keeps a list of all the users and the color of their card. The real beauty comes from integrating the Go server and the express/vite front-end in different pods and make them communicate with services.


## Getting Started

### Prerequisites

Here's what you need to run MCWOAT:

- WSL 
- Go 1.20 or above
- Docker Desktop

### 0. This tutorial takes into account an already functioning WSL distro

### 1. Clone the repository

```shell
git clone https://github.com/Captain-Friendly/MCWOAT.git
cd webserver
```

### 2. Install npm dependencies

```shell
npm install
```

### 3. Build the Vite app

```shell
npm run build 
```

### 4. Create the Docker Image

```shell
docker build -t webserver_express
```


### 5. Build the Go server Image

```shell
cd .. 
cd server
docker build -t goserver
```
### 5.5 Open DockerDesktop and verify that the Images are there
<img src="/presentation/check_image.gif" alt="Cheking if the image is there" style="width: 500; length: 500;">
In the Images tab you can find the list of your images


### 6. Allow Docker Destop to share ressources with WSL
<img src="/presentation/check_wsl_integration.gif" alt="Cheking if the image is there" style="width: 500; length: 500;">
In settings, in ressource tab, you go into WSL integration and allow your WSL to share ressources


### 7. Open WSL and Install Kubectl
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl

sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```
### 8. Download and install Minikube
```bash
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64
```

### 8. Start your cluster with 
```shell
minikube start
```

### 9. Load the images into Kubernetes

```shell
eval $(minikube docker-env)
minikube image load goserver
minikube image load webserver_express
```

### 10. Create the config files for the pods & services
inside the wsl, create these .yml files, in each one, copy over the text from the .yml file in the wsl folder
```shell
nano go_server_pod_config.yaml
nano go_server_service.yml
nano webserver_pod_config.yml
nano webserver_service_config.yml
```

### 11. Create the pods and services with the config files
```shell
kubectl create -f go_server_pod_config.yaml
kubectl create -f go_server_service.yml
kubectl create -f webserver_pod_config.yml
kubectl create -f webserver_service_config.yml
```

### 12. Access the website in your browser
click the ip adress that appears after you run this command
```shell
minikube service multi-pod --url
```