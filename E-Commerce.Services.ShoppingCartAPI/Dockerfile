FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
 
# Copying the proj file then adding packages
 
COPY "E-Commerce.Services.ShoppingCartAPI.csproj" .
RUN dotnet restore "E-Commerce.Services.ShoppingCartAPI.csproj"
 
# copy project files
COPY . .
RUN dotnet publish "E-Commerce.Services.ShoppingCartAPI.csproj"  -c Release -o /publish
 
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
		
COPY --from=build /publish .
 
#ENV ASPNETCORE_ENVIRONMENT=
 
ENTRYPOINT ["dotnet", "E-Commerce.Services.ShoppingCartAPI.dll"];