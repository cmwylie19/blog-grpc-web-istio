docker build -t docker.io/cmwylie19/frontend-grpcweb .; docker push docker.io/cmwylie19/frontend-grpcweb

docker build -t docker.io/cmwylie19/frontend-grpcweb .; docker push docker.io/cmwylie19/frontend-grpcweb; say "done"; k rollout restart deploy/frontend-grpcweb