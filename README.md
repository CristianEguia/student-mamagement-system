# Student management System

**DONT FORK THIS REPOSITORY**

## .Net Core

- List the templates
    ```shell
    dotnet new list
    ```
- Generate a new WebAPI
    ```shell
    dotnet new webapi -n {NAME}
    ```
- Run the API
    ```shell
    // go to project folder
    dotnet run
    ```
- Install EF Core CLI
    ```shell
    dotnet tool install --global dotnet-ef
    ```

## JWT - Jason Web Token

- Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    - Payload
        ```json
        {
            "sub": "1234567890",
            "name": "John Doe",
            "iat": 1516239022
        }
        ```

### .Net Core Packages
- `dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer`
- `dotnet add package Microsoft.EntityFrameworkCore.Design`

## SSH

- Private Key (Neven, NEVER! Share)
- Public Key (You can Share)


### MVC - Model View Controller


## Database Migrations

```shell
dotnet ef migrations add InitialCreate
dotnet ef database update
```