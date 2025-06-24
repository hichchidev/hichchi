// noinspection JSUnusedGlobalSymbols

/**
 * Application Gateways Enum
 *
 * This enum defines the different communication gateways used in the application
 * for real-time or streaming data exchange. Each value represents a specific
 * gateway technology or implementation that enables bidirectional communication
 * between clients and the server.
 *
 * Gateways provide alternatives to traditional HTTP request/response patterns,
 * allowing for push notifications, live updates, and interactive features.
 *
 * The values in this enum can be used to identify and configure the appropriate
 * gateway implementation for different parts of the application.
 */
export enum Gateway {
    /**
     * WebSocket gateway
     *
     * Represents the WebSocket-based communication gateway, which provides full-duplex
     * communication channels over a single, long-lived TCP connection.
     *
     * This gateway enables real-time data exchange between clients and the server
     * without the overhead of repeatedly establishing new connections. It's particularly
     * useful for applications requiring low-latency updates, notifications, or
     * interactive features.
     *
     * The implementation may use libraries like Socket.IO or native WebSockets.
     */
    SOCKET = "socket",
}

// TODO: Come back when doing socket
