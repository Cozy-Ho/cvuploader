declare interface Window {
  electron: {
    send: (channel: string, ...arg: any) => void;
    receive: (channel: string, func: (event: any, ...arg: any) => void) => void;
    env: {
      [key: string]: string;
    };
  };
}
