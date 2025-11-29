declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      PORT: string;
      JWT_SECRET: string;
    }
  }
}

export {};
