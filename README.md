# Setup POC Environment
_This doc outlines how to setup the POC environment for consuming gRPC Server streaming through Istio via a React frontend using gRPC-Web._

**Prereqs**
_Create a cluster in Google Cloud Environment._
![GKE Cluster](/GKE.png)
Follow the order below to setup environment.
- [Install Istio](#install-istio) 
- [Deploy the backend](#deploy-the-backend)
- [Deploy the frontend](#deploy-the-frontend)
- [Create Istio Config](#create-istio-config)
- [Interact with the application](#interact-with-the-application)

## Install Istio
```
# Save current working directory to variable
CURRENT_DIRECTORY=$(pwd)

# Change to user base directory
cd ~

# Download and extract the release `1.10.2`
curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.10.2 sh -

# Change into istio dir
cd istio-1.10.2/

# Install the demo profile and addons
istioctl install --set profile=demo -y; 
kubectl apply -f samples/addons;
kubectl apply -f samples/addons;

# label namespace to automatically inject sidecar
kubectl label namespace default istio-injection=enabled

# Change back to repo directory
cd $CURRENT_DIRECTORY
```
Wait for the pod's **STATUS** condition to be **Running** 
```
for x in $(seq 99); do kubectl get pods -n istio-sytem; sleep 3s; done
```



## Deploy the backend
```
kubectl apply -f -<<EOF
apiVersion: v1
kind: Service
metadata:
  labels:
    app: backend
  name: backend
  namespace: default
spec:
  ports:
    - name: grpc-web
      port: 8080
      protocol: TCP
      targetPort: 8080
  selector:
    app: backend
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: backend
    version: v1
  name: backend
  namespace: default
spec:
  selector:
    matchLabels:
      app: backend
      version: v1
  replicas: 1
  template:
    metadata:
      labels:
        app: backend
        version: v1
    spec:
      serviceAccountName: backend
      containers:
        - image: docker.io/cmwylie19/backend-grpc:latest
          name: backend
          ports:
            - containerPort: 8080
              name: http
      restartPolicy: Always
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: backend
EOF
```

Wait for the pod's READY condition to be 2/2 
```
for x in $(seq 99); do kubectl get pods -l app=backend; sleep 3s; done
```

## Deploy the frontend
```
kubectl apply -f -<<EOF
apiVersion: v1
kind: Service
metadata:
  name: frontend
  labels:
    app: frontend
    service: frontend
spec:
  ports:
  - port: 3000
    targetPort: 3000
    name: http
  selector:
    app: frontend
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  labels:
    app: frontend
    version: v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
      version: v1
  template:
    metadata:
      labels:
        app: frontend
        version: v1
    spec:
      serviceAccountName: frontend
      containers:
      - name: frontend
        image: docker.io/cmwylie19/frontend-grpcweb:latest
        imagePullPolicy: Always
        env:
        - name: REACT_APP_GATEWAY_URL
          value: $(kubectl get svc istio-ingressgateway -n istio-system -ojsonpath="{.status.loadBalancer.ingress[0].ip}"):80
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: frontend
EOF
```

Wait for the pod's READY condition to be 2/2 
```
for x in $(seq 99); do kubectl get pods -l app=frontend; sleep 3s; done
```

## Create Istio Config
```
kubectl apply -f -<<EOF
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: backend
spec:
  host: backend
  subsets:
  - name: v1
    labels:
      version: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: frontend
spec:
  host: frontend
  subsets:
  - name: v1
    labels:
      version: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: vs
spec:
  hosts:
  - "*"
  gateways:
  - gateway
  http:
  - match:
    - uri:
        exact: /ui
    - uri:
        prefix: /static
    - uri:
        prefix: /sockjs-node
    route:
    - destination:
        host: frontend
        port:
          number: 3000
        subset: v1
  - route:
    - destination:
        host: backend
        port:
          number: 8080
        subset: v1
    corsPolicy:
      allowOrigin:
        - "*"
      allowMethods:
        - POST
        - GET
        - OPTIONS
        - PUT
        - DELETE
      allowHeaders:
        - grpc-timeout
        - content-type
        - keep-alive
        - user-agent
        - cache-control
        - content-type
        - content-transfer-encoding
        - custom-header-1
        - x-accept-content-transfer-encoding
        - x-accept-response-streaming
        - x-grpc-web
      maxAge: 1728s
      exposeHeaders:
        - custom-header-1
        - grpc-status
        - grpc-message
EOF
```
**Check Istio status**
```
istioctl analyze
```

## Interact with the application
**Interact with your app through the `browser`**
```
echo http://$(kubectl get svc istio-ingressgateway -n istio-system -ojsonpath="{.status.loadBalancer.ingress[0].ip}"):80/ui
```
Open the above link in a browser.

**Interact with your app through `grpcurl`**
```
# Curling against the istio-ingressgateway
grpcurl -plaintext $(k get svc -n istio-system istio-ingressgateway -ojsonpath="{.status.loadBalancer.ingress[0].ip}"):80 list

# Describe proto
grpcurl -plaintext $(k get svc -n istio-system istio-ingressgateway -ojsonpath="{.status.loadBalancer.ingress[0].ip}"):80 describe numbers.Numbers

# Use endpoint
grpcurl -plaintext -d '{"userAgent":"chrome"}'  $(k get svc -n istio-system istio-ingressgateway -ojsonpath="{.status.loadBalancer.ingress[0].ip}"):80 numbers.Numbers/GetNumbers
```