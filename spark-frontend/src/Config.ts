interface ConfigType {
    LIMIT: string | undefined;
    API_URL: string | undefined;
    PERSIST_SECRET_KEY: string;
}

const Config: ConfigType = {
    PERSIST_SECRET_KEY: "!!SP@CRK_C0D3!!",
    LIMIT: process.env.NEXT_PUBLIC_LIMIT,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
};

export default Config;
