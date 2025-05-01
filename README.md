## ⚠️ Important Note

To start a local PostgreSQL container for development, run the following Docker command:

```bash
docker run --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```
