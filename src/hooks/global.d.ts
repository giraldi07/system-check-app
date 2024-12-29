// global.d.ts
interface NetworkInformation {
    effectiveType: string;
    downlink: number;
    rtt: number;
  }
  
  interface Navigator {
    connection: NetworkInformation;
  }
  