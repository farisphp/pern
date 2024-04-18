# PERN

🚀 Dockerized application <br />
✨ Frontend React + Vite <br />
🦁 Nest.js API + MikroOrm + PostgreSQL <br />
🔥 Firebase Authentication

## Installation
1. Copy `frontend/src/lib/firebase/config.ts.example` to `frontend/src/lib/firebase/config.ts` and replace the firebase config value with your config.
    ```console
    cp frontend/src/lib/firebase/config.ts.example frontend/src/lib/firebase/config.ts
    ```
    > You can find your firebase config in `Firebase Project Settings` page.
2. Copy `backend/config/firebaseServiceAccountKey.json.example` to `backend/config/firebaseServiceAccountKey.json` and replace the firebase service account key with your key.
    ```console
    cp backend/config/firebaseServiceAccountKey.json.example backend/config/firebaseServiceAccountKey.json
    ```
    > You can generate your key under `Service accounts` tab in `Firebase Project Settings` page and click `Generate new private key`.
3. Run docker compose up
   ```console
    docker compose up -d
    ```
4. Frontend will running on [http://localhost:8080](http://localhost:8080)
5. Backend API will running on [http://localhost:3000](http://localhost:3000)
