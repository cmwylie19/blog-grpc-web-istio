package main

import (
	"fmt"
	"log"
	"net"
	"time"

	"github.com/cmwylie19/blog-grpc-web-istio/api"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var i int64 = 0

type server struct {
	api.UnimplementedNumbersServer
}

func (*server) GetNumbers(req *api.NumberRequest, stream api.Numbers_GetNumbersServer) error {
	for ; ; i++ {
		time.Sleep(2000 * time.Millisecond)
		res := &api.NumberResponse{
			Value:     i%2 == 0,
			Ts:        time.Now().String(),
			UserAgent: req.GetUserAgent(),
			Count:     i,
		}
		err := stream.Send(res)
		if err != nil {
			log.Println("Error sending NumberStream: ", err)
			return err
		}

	}
}
func main() {
	fmt.Println("backend v1")

	lis, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalf("Error while listening : %v", err)
	}

	s := grpc.NewServer()
	api.RegisterNumbersServer(s, &server{})
	reflection.Register(s)

	fmt.Println("Listening on :8080")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Error while serving : %v", err)
	}
}
