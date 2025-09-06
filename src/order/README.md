API Gateway (gRPC Client) 
    => gRPC call tới 
OrderService (gRPC Server)
    => OrdersController (gRPC method)
        => commandBus.execute(CreateOrderCommand)
            => CreateOrderHandler
                => OrdersService.create()
                    => DB thao tác