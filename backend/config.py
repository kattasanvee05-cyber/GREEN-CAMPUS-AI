import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "GREEN CAMPUS AI"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # IBM watsonx.ai Granite configuration
    IBM_WATSONX_API_KEY: str = os.getenv("IBM_WATSONX_API_KEY", "")
    IBM_PROJECT_ID: str = os.getenv("IBM_PROJECT_ID", "")
    IBM_URL: str = os.getenv("IBM_URL", "https://us-south.ml.cloud.ibm.com")
    IBM_GRANITE_MODEL: str = os.getenv("IBM_GRANITE_MODEL", "ibm/granite-3-8b-instruct")
    
    @property
    def is_ibm_configured(self) -> bool:
        return bool(self.IBM_WATSONX_API_KEY and self.IBM_PROJECT_ID)

settings = Settings()
