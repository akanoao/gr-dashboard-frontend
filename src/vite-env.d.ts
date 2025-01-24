/// <reference types="vite/client" />
declare module "*.png" {
    const value: string;
    export default value;
}

interface ImportMetaEnv {
    readonly VITE_GOOGLE_CLIENT_ID: string
    readonly VITE_BACKEND_URL: string
    // more env variables...
  }
  
interface ImportMeta {
readonly env: ImportMetaEnv
}