## Compile protos
_**This takes place from the backend directory `/blog-grpc-web-istio/backend`.**_
```
 # Backend
 protoc api/Number.proto --go_out=. --go-grpc_out=.

 # Frontend 
 protoc api/Number.proto --js_out=import_style=commonjs,binary:../frontend/src --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../frontend/src --go-grpc_out=. --go_out=.

```

## Usage grpcurl
```
# Running locally

# List protos
grpcurl -plaintext localhost:8080 list

# Describe proto
grpcurl -plaintext localhost:8080 describe numbers.Numbers

# Use endpoint
grpcurl -plaintext -d '{"userAgent":"chrome"}' localhost:8080 numbers.Numbers/GetNumbers

```