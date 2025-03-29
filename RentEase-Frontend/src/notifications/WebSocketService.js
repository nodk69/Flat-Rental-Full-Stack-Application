class WebSocketService {
    constructor() {
      this.socket = null;
      this.onNotification = null; // Callback function to dispatch actions
    }
  
    connect(username) {
      if (!this.socket) {
        this.socket = new WebSocket(`ws://localhost:8080/ws/notifications/${username}`);
  
        this.socket.onopen = () => {
          console.log("WebSocket Connected ✅");
        };
  
        this.socket.onmessage = (event) => {
          const notification = JSON.parse(event.data);
          console.log("🔔 New Notification:", notification);
  
          if (this.onNotification) {
            this.onNotification(notification);
          }
        };
  
        this.socket.onclose = () => {
          console.log("WebSocket Disconnected ❌");
        };
  
        this.socket.onerror = (error) => {
          console.error("WebSocket Error:", error);
        };
      }
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  }
  
  const webSocketService = new WebSocketService();
  export default webSocketService;
  